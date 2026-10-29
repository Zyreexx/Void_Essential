from flask import Blueprint, request, jsonify
from backend.app.models.models import Product, Category

products_bp = Blueprint("products", __name__, url_prefix="/api/v1/products")

@products_bp.route("", methods=["GET"])
def list_products():
    category_slug = request.args.get("category")
    search_query = request.args.get("search")
    featured = request.args.get("featured")
    archival = request.args.get("archival")
    sort = request.args.get("sort", "featured")
    
    query = Product.query
    
    if category_slug and category_slug.lower() != "all":
        category = Category.query.filter_by(slug=category_slug.lower()).first()
        if category:
            query = query.filter_by(category_id=category.id)
            
    if search_query:
        term = f"%{search_query.strip()}%"
        query = query.filter(Product.title.ilike(term) | Product.description.ilike(term))
        
    if featured is not None:
        is_feat = featured.lower() in ["true", "1", "yes"]
        query = query.filter_by(is_featured=is_feat)
        
    if archival is not None:
        is_arch = archival.lower() in ["true", "1", "yes"]
        query = query.filter_by(is_archival=is_arch)
        
    # Sorting
    if sort == "price_asc":
        query = query.order_by(Product.price.asc())
    elif sort == "price_desc":
        query = query.order_by(Product.price.desc())
    elif sort == "newest":
        query = query.order_by(Product.created_at.desc())
    else: # default: featured or display order
        query = query.order_by(Product.is_featured.desc(), Product.id.asc())
        
    products = query.all()
    
    return jsonify({
        "success": True,
        "count": len(products),
        "data": [p.to_dict(full=False) for p in products]
    }), 200

@products_bp.route("/<slug>", methods=["GET"])
def get_product(slug):
    product = Product.query.filter_by(slug=slug).first()
    if not product:
        return jsonify({"success": False, "message": f"Product with slug '{slug}' not found."}), 404
        
    return jsonify({
        "success": True,
        "data": product.to_dict(full=True)
    }), 200

@products_bp.route("/featured", methods=["GET"])
def get_featured():
    products = Product.query.filter_by(is_featured=True).limit(8).all()
    return jsonify({
        "success": True,
        "data": [p.to_dict(full=False) for p in products]
    }), 200
