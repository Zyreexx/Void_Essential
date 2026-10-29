import os
import redis
from flask import Blueprint, jsonify
from backend.app.models import db

health_bp = Blueprint("health", __name__, url_prefix="/api/v1")

@health_bp.route("/health", methods=["GET"])
def health_check():
    # Database check
    db_status = "healthy"
    try:
        db.session.execute(db.text("SELECT 1"))
    except Exception as e:
        db_status = f"unhealthy: {str(e)}"
        
    # Redis check
    redis_status = "connected"
    try:
        r = redis.from_url(os.getenv("REDIS_URL", "redis://localhost:6379/0"), socket_timeout=1)
        r.ping()
    except Exception:
        redis_status = "disconnected (fallback mode active)"
        
    return jsonify({
        "status": "operational",
        "brand": "VOID ESSENTIALS",
        "tagline": "Essentials, without excess",
        "support_email": "support@voidessentials.store",
        "phone": "+91 95104 90976",
        "address": "Thatharo Shop, Nagar Naka, Jamnagar, Gujarat - 361305",
        "database": db_status,
        "redis_celery": redis_status,
        "api_version": "v1.0.0"
    }), 200
