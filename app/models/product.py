from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Product(db.Model):
    __tablename__ = "products"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    vendor_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")),  nullable=False)
    name = db.Column(db.String(200), nullable=False)
    description = db.Column(db.String, nullable=False)
    category = db.Column(db.String(50), nullable=False)
    price = db.Column(db.Numeric(6,2), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.now(), onupdate=datetime.now())

    images = db.relationship("ProductImage", back_populates="product", cascade='all, delete-orphan')
    vendor = db.relationship("User", back_populates="products")

    def to_dict(self):
        product_images = {}
        for image in self.images:
            product_images[image.id] = {
                "id": image.id,
                "url": image.url,
                "preview": image.preview
            }
        return {
            "id": self.id,
            "vendor_id": self.vendor_id,
            "name": self.name,
            "description": self.description,
            "category": self.category,
            "price": self.price,
            "product_images": product_images
        }
