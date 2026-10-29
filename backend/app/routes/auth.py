from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt_identity
from backend.app.models import db
from backend.app.models.models import User
from backend.app.tasks.celery_tasks import send_welcome_email, dispatch_task_safely

auth_bp = Blueprint("auth", __name__, url_prefix="/api/v1/auth")

@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json() or {}
    email = data.get("email", "").strip().lower()
    password = data.get("password", "")
    full_name = data.get("full_name", "").strip()
    
    if not email or "@" not in email:
        return jsonify({"success": False, "message": "A valid email is required.", "errors": {"email": "Invalid format"}}), 400
        
    if not password or len(password) < 6:
        return jsonify({"success": False, "message": "Password must be at least 6 characters.", "errors": {"password": "Too short"}}), 400
        
    if User.query.filter_by(email=email).first():
        return jsonify({"success": False, "message": "An account with this email already exists.", "errors": {"email": "Already exists"}}), 409
        
    user = User(email=email, full_name=full_name)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()
    
    # Safe background welcome email dispatch
    dispatch_task_safely(send_welcome_email, email, full_name)
    
    access_token = create_access_token(identity=str(user.id))
    refresh_token = create_refresh_token(identity=str(user.id))
    
    return jsonify({
        "success": True,
        "message": "Account created successfully.",
        "data": {
            "user": user.to_dict(),
            "access_token": access_token,
            "refresh_token": refresh_token
        }
    }), 201

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json() or {}
    email = data.get("email", "").strip().lower()
    password = data.get("password", "")
    
    if not email or not password:
        return jsonify({"success": False, "message": "Email and password are required."}), 400
        
    user = User.query.filter_by(email=email).first()
    if not user or not user.check_password(password):
        return jsonify({"success": False, "message": "Invalid email or password."}), 401
        
    access_token = create_access_token(identity=str(user.id))
    refresh_token = create_refresh_token(identity=str(user.id))
    
    return jsonify({
        "success": True,
        "message": "Authenticated successfully.",
        "data": {
            "user": user.to_dict(),
            "access_token": access_token,
            "refresh_token": refresh_token
        }
    }), 200

@auth_bp.route("/me", methods=["GET"])
@jwt_required()
def get_current_user():
    user_id = get_jwt_identity()
    user = User.query.get(int(user_id))
    if not user:
        return jsonify({"success": False, "message": "User not found."}), 404
        
    return jsonify({
        "success": True,
        "data": {
            "user": user.to_dict()
        }
    }), 200

@auth_bp.route("/refresh", methods=["POST"])
@jwt_required(refresh=True)
def refresh_token():
    user_id = get_jwt_identity()
    new_access_token = create_access_token(identity=str(user_id))
    return jsonify({
        "success": True,
        "data": {
            "access_token": new_access_token
        }
    }), 200
