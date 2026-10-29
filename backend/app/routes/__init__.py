from backend.app.routes.auth import auth_bp
from backend.app.routes.products import products_bp
from backend.app.routes.categories import categories_bp
from backend.app.routes.orders import orders_bp
from backend.app.routes.contact import contact_bp
from backend.app.routes.health import health_bp

def register_blueprints(app):
    app.register_blueprint(auth_bp)
    app.register_blueprint(products_bp)
    app.register_blueprint(categories_bp)
    app.register_blueprint(orders_bp)
    app.register_blueprint(contact_bp)
    app.register_blueprint(health_bp)
