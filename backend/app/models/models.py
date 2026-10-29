from datetime import datetime, timezone
import json
from werkzeug.security import generate_password_hash, check_password_hash
from backend.app.models import db

def utc_now():
    return datetime.now(timezone.utc)

class User(db.Model):
    __tablename__ = "users"
    
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), unique=True, nullable=False, index=True)
    password_hash = db.Column(db.String(255), nullable=False)
    full_name = db.Column(db.String(120), nullable=True)
    role = db.Column(db.String(20), default="customer") # 'customer' or 'admin'
    created_at = db.Column(db.DateTime, default=utc_now)
    updated_at = db.Column(db.DateTime, default=utc_now, onupdate=utc_now)
    
    orders = db.relationship("Order", backref="user", lazy=True)
    
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
        
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
        
    def to_dict(self):
        return {
            "id": self.id,
            "email": self.email,
            "full_name": self.full_name,
            "role": self.role,
            "created_at": self.created_at.isoformat() if self.created_at else None
        }

class Category(db.Model):
    __tablename__ = "categories"
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    slug = db.Column(db.String(100), unique=True, nullable=False, index=True)
    tagline = db.Column(db.String(200), nullable=True)
    image_url = db.Column(db.String(500), nullable=True)
    display_order = db.Column(db.Integer, default=0)
    
    products = db.relationship("Product", backref="category", lazy=True)
    
    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "slug": self.slug,
            "tagline": self.tagline,
            "image_url": self.image_url,
            "display_order": self.display_order,
            "product_count": len(self.products)
        }

class Product(db.Model):
    __tablename__ = "products"
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    slug = db.Column(db.String(220), unique=True, nullable=False, index=True)
    description = db.Column(db.Text, nullable=True)
    care_instructions = db.Column(db.Text, nullable=True)
    fabric_composition = db.Column(db.String(200), nullable=True)
    price = db.Column(db.Float, nullable=False)
    compare_at_price = db.Column(db.Float, nullable=True)
    category_id = db.Column(db.Integer, db.ForeignKey("categories.id"), nullable=False, index=True)
    is_featured = db.Column(db.Boolean, default=False)
    is_archival = db.Column(db.Boolean, default=False)
    is_new_arrival = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=utc_now)
    
    variants = db.relationship("ProductVariant", backref="product", lazy=True, cascade="all, delete-orphan")
    images = db.relationship("ProductImage", backref="product", lazy=True, cascade="all, delete-orphan", order_by="ProductImage.display_order")
    
    def to_dict(self, full=False):
        primary_img = next((img.image_url for img in self.images if img.is_primary), None)
        if not primary_img and self.images:
            primary_img = self.images[0].image_url
            
        secondary_img = self.images[1].image_url if len(self.images) > 1 else primary_img

        data = {
            "id": self.id,
            "title": self.title,
            "slug": self.slug,
            "price": self.price,
            "compare_at_price": self.compare_at_price,
            "category": self.category.name if self.category else None,
            "category_slug": self.category.slug if self.category else None,
            "is_featured": self.is_featured,
            "is_archival": self.is_archival,
            "is_new_arrival": self.is_new_arrival,
            "primary_image": primary_img,
            "secondary_image": secondary_img,
            "sizes": list({v.size for v in self.variants if v.stock_quantity > 0}),
            "colors": [{"name": v.color_name, "hex": v.color_hex} for v in self.variants],
        }
        
        if full:
            data.update({
                "description": self.description,
                "care_instructions": self.care_instructions,
                "fabric_composition": self.fabric_composition,
                "created_at": self.created_at.isoformat() if self.created_at else None,
                "images": [img.to_dict() for img in self.images],
                "variants": [var.to_dict() for var in self.variants]
            })
            
        return data

class ProductVariant(db.Model):
    __tablename__ = "product_variants"
    
    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey("products.id"), nullable=False, index=True)
    size = db.Column(db.String(20), nullable=False)
    color_name = db.Column(db.String(50), nullable=False)
    color_hex = db.Column(db.String(20), nullable=True)
    sku = db.Column(db.String(60), unique=True, nullable=False, index=True)
    stock_quantity = db.Column(db.Integer, default=10)
    price_override = db.Column(db.Float, nullable=True)
    
    def to_dict(self):
        return {
            "id": self.id,
            "product_id": self.product_id,
            "size": self.size,
            "color_name": self.color_name,
            "color_hex": self.color_hex,
            "sku": self.sku,
            "stock_quantity": self.stock_quantity,
            "price_override": self.price_override
        }

class ProductImage(db.Model):
    __tablename__ = "product_images"
    
    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey("products.id"), nullable=False, index=True)
    image_url = db.Column(db.String(500), nullable=False)
    alt_text = db.Column(db.String(200), nullable=True)
    is_primary = db.Column(db.Boolean, default=False)
    display_order = db.Column(db.Integer, default=0)
    
    def to_dict(self):
        return {
            "id": self.id,
            "image_url": self.image_url,
            "alt_text": self.alt_text,
            "is_primary": self.is_primary,
            "display_order": self.display_order
        }

class Order(db.Model):
    __tablename__ = "orders"
    
    id = db.Column(db.Integer, primary_key=True)
    order_number = db.Column(db.String(32), unique=True, nullable=False, index=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=True)
    guest_email = db.Column(db.String(255), nullable=True)
    total_amount = db.Column(db.Float, nullable=False)
    shipping_amount = db.Column(db.Float, default=0.0)
    tax_amount = db.Column(db.Float, default=0.0)
    status = db.Column(db.String(30), default="confirmed")
    payment_status = db.Column(db.String(30), default="paid")
    shipping_address_json = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, default=utc_now)
    
    items = db.relationship("OrderItem", backref="order", lazy=True, cascade="all, delete-orphan")
    
    def to_dict(self):
        shipping_addr = {}
        if self.shipping_address_json:
            try:
                shipping_addr = json.loads(self.shipping_address_json)
            except Exception:
                pass
                
        return {
            "id": self.id,
            "order_number": self.order_number,
            "user_id": self.user_id,
            "customer_email": self.guest_email or (self.user.email if self.user else None),
            "total_amount": self.total_amount,
            "shipping_amount": self.shipping_amount,
            "tax_amount": self.tax_amount,
            "status": self.status,
            "payment_status": self.payment_status,
            "shipping_address": shipping_addr,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "items": [item.to_dict() for item in self.items]
        }

class OrderItem(db.Model):
    __tablename__ = "order_items"
    
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey("orders.id"), nullable=False, index=True)
    product_id = db.Column(db.Integer, db.ForeignKey("products.id"), nullable=True)
    variant_id = db.Column(db.Integer, db.ForeignKey("product_variants.id"), nullable=True)
    product_title = db.Column(db.String(200), nullable=False)
    size = db.Column(db.String(20), nullable=True)
    color = db.Column(db.String(50), nullable=True)
    quantity = db.Column(db.Integer, nullable=False, default=1)
    unit_price = db.Column(db.Float, nullable=False)
    
    def to_dict(self):
        return {
            "id": self.id,
            "product_id": self.product_id,
            "variant_id": self.variant_id,
            "product_title": self.product_title,
            "size": self.size,
            "color": self.color,
            "quantity": self.quantity,
            "unit_price": self.unit_price,
            "total_price": self.quantity * self.unit_price
        }

class ContactInquiry(db.Model):
    __tablename__ = "contact_inquiries"
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(255), nullable=False)
    subject = db.Column(db.String(200), nullable=True)
    message = db.Column(db.Text, nullable=False)
    status = db.Column(db.String(30), default="unread")
    created_at = db.Column(db.DateTime, default=utc_now)
    
    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "subject": self.subject,
            "message": self.message,
            "status": self.status,
            "created_at": self.created_at.isoformat() if self.created_at else None
        }

class NewsletterSubscriber(db.Model):
    __tablename__ = "newsletter_subscribers"
    
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), unique=True, nullable=False, index=True)
    source = db.Column(db.String(50), default="footer")
    created_at = db.Column(db.DateTime, default=utc_now)
    
    def to_dict(self):
        return {
            "id": self.id,
            "email": self.email,
            "source": self.source,
            "created_at": self.created_at.isoformat() if self.created_at else None
        }
