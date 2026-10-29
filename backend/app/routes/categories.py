from flask import Blueprint, jsonify
from backend.app.models.models import Category

categories_bp = Blueprint("categories", __name__, url_prefix="/api/v1/categories")

@categories_bp.route("", methods=["GET"])
def list_categories():
    categories = Category.query.order_by(Category.display_order.asc(), Category.id.asc()).all()
    return jsonify({
        "success": True,
        "count": len(categories),
        "data": [c.to_dict() for c in categories]
    }), 200

@categories_bp.route("/<slug>", methods=["GET"])
def get_category(slug):
    category = Category.query.filter_by(slug=slug.lower()).first()
    if not category:
        return jsonify({"success": False, "message": "Category not found."}), 404
        
    return jsonify({
        "success": True,
        "data": category.to_dict()
    }), 200
