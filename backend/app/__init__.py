import os
from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from backend.config import config_by_name
from backend.app.models import db
from backend.app.routes import register_blueprints
from backend.app.services.seeder import seed_database

jwt = JWTManager()

def create_app(config_name=None):
    if not config_name:
        config_name = os.getenv("FLASK_ENV", "development")
        
    app = Flask(__name__)
    app.config.from_object(config_by_name.get(config_name, config_by_name["default"]))
    
    # Initialize Extensions
    db.init_app(app)
    jwt.init_app(app)
    
    # Configure CORS for decoupled Next.js frontend
    CORS(app, resources={r"/api/*": {"origins": "*"}}, supports_credentials=True)
    
    # Register API Blueprints
    register_blueprints(app)
    
    # Create database tables & seed initial catalog
    with app.app_context():
        # Ensure instance directory exists for SQLite
        os.makedirs(os.path.join(app.root_path, "..", "instance"), exist_ok=True)
        db.create_all()
        seed_database()
        
    return app
