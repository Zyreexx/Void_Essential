from flask import Blueprint, request, jsonify
from backend.app.models import db
from backend.app.models.models import ContactInquiry, NewsletterSubscriber

contact_bp = Blueprint("contact", __name__, url_prefix="/api/v1")

@contact_bp.route("/contact", methods=["POST"])
def submit_contact():
    data = request.get_json() or {}
    name = data.get("name", "").strip()
    email = data.get("email", "").strip().lower()
    subject = data.get("subject", "").strip()
    message = data.get("message", "").strip()
    
    if not name or not email or "@" not in email or not message:
        return jsonify({
            "success": False, 
            "message": "Please provide your name, a valid email address, and an inquiry message."
        }), 400
        
    inquiry = ContactInquiry(
        name=name,
        email=email,
        subject=subject or "General Inquiry",
        message=message
    )
    db.session.add(inquiry)
    db.session.commit()
    
    return jsonify({
        "success": True,
        "message": "Your message has been received by the Void Atelier. We will respond shortly.",
        "data": inquiry.to_dict()
    }), 201

@contact_bp.route("/newsletter", methods=["POST"])
def subscribe_newsletter():
    data = request.get_json() or {}
    email = data.get("email", "").strip().lower()
    source = data.get("source", "storefront_footer")
    
    if not email or "@" not in email:
        return jsonify({
            "success": False,
            "message": "Please provide a valid email address."
        }), 400
        
    existing = NewsletterSubscriber.query.filter_by(email=email).first()
    if existing:
        return jsonify({
            "success": True,
            "message": "You are already subscribed to Void archival updates."
        }), 200
        
    sub = NewsletterSubscriber(email=email, source=source)
    db.session.add(sub)
    db.session.commit()
    
    return jsonify({
        "success": True,
        "message": "You have been added to the private archival drop list."
    }), 201
