import json
import uuid
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request
from backend.app.models import db
from backend.app.models.models import Order, OrderItem, Product, ProductVariant
from backend.app.tasks.celery_tasks import send_order_confirmation, export_orders_csv, dispatch_task_safely

orders_bp = Blueprint("orders", __name__, url_prefix="/api/v1/orders")

@orders_bp.route("", methods=["POST"])
def create_order():
    data = request.get_json() or {}
    items_data = data.get("items", [])
    shipping_address = data.get("shipping_address", {})
    customer_email = data.get("customer_email", "").strip().lower()
    
    if not items_data:
        return jsonify({"success": False, "message": "Cart is empty. Cannot process order."}), 400
        
    if not customer_email or "@" not in customer_email:
        return jsonify({"success": False, "message": "A valid customer email is required."}), 400

    # Optional JWT user context
    user_id = None
    try:
        verify_jwt_in_request(optional=True)
        jwt_user = get_jwt_identity()
        if jwt_user:
            user_id = int(jwt_user)
    except Exception:
        pass

    order_number = f"VOID-{uuid.uuid4().hex[:8].upper()}"
    
    subtotal = 0.0
    order_items_to_add = []
    
    for item in items_data:
        p_id = item.get("product_id")
        v_id = item.get("variant_id")
        qty = int(item.get("quantity", 1))
        
        product = Product.query.get(p_id) if p_id else None
        if not product:
            continue
            
        unit_price = product.price
        variant = ProductVariant.query.get(v_id) if v_id else None
        if variant and variant.price_override:
            unit_price = variant.price_override
            
        # Deduct stock if variant exists
        if variant and variant.stock_quantity >= qty:
            variant.stock_quantity -= qty
            
        subtotal += unit_price * qty
        
        order_items_to_add.append(OrderItem(
            product_id=product.id,
            variant_id=variant.id if variant else None,
            product_title=product.title,
            size=item.get("size") or (variant.size if variant else None),
            color=item.get("color") or (variant.color_name if variant else None),
            quantity=qty,
            unit_price=unit_price
        ))
        
    # Free shipping above $150 / ₹999 threshold
    shipping_fee = 0.0 if subtotal >= 150.0 else 15.0
    tax = round(subtotal * 0.08, 2)
    total_amount = round(subtotal + shipping_fee + tax, 2)
    
    order = Order(
        order_number=order_number,
        user_id=user_id,
        guest_email=customer_email,
        total_amount=total_amount,
        shipping_amount=shipping_fee,
        tax_amount=tax,
        status="confirmed",
        payment_status="paid",
        shipping_address_json=json.dumps(shipping_address)
    )
    
    db.session.add(order)
    db.session.flush() # obtain order.id
    
    for oi in order_items_to_add:
        oi.order_id = order.id
        db.session.add(oi)
        
    db.session.commit()
    
    # Asynchronously dispatch order confirmation
    dispatch_task_safely(
        send_order_confirmation,
        order.id,
        customer_email,
        order.order_number,
        total_amount
    )
    
    return jsonify({
        "success": True,
        "message": "Order placed successfully.",
        "data": {
            "order": order.to_dict()
        }
    }), 201

@orders_bp.route("/<order_number>", methods=["GET"])
def get_order(order_number):
    order = Order.query.filter_by(order_number=order_number.strip().upper()).first()
    if not order:
        return jsonify({"success": False, "message": "Order not found."}), 404
        
    return jsonify({
        "success": True,
        "data": order.to_dict()
    }), 200

@orders_bp.route("/user", methods=["GET"])
@jwt_required()
def get_user_orders():
    user_id = int(get_jwt_identity())
    orders = Order.query.filter_by(user_id=user_id).order_by(Order.created_at.desc()).all()
    return jsonify({
        "success": True,
        "data": [o.to_dict() for o in orders]
    }), 200

@orders_bp.route("/export-csv", methods=["POST"])
def trigger_orders_export():
    """
    Administrative trigger for Celery CSV order report generation.
    """
    orders = Order.query.limit(100).all()
    orders_data = [o.to_dict() for o in orders]
    
    task_res = dispatch_task_safely(export_orders_csv, orders_data)
    return jsonify({
        "success": True,
        "message": "Order export pipeline initiated.",
        "task_dispatched": bool(task_res)
    }), 200
