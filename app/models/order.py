from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Order(db.Model):
    __tablename__ = "orders"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'), ondelete='CASCADE'), nullable=False)
    status = db.Column(db.String)
    created_at = db.Column(db.DateTime, default=datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.now(), onupdate=datetime.now())

    product_orders = db.relationship('ProductOrder', back_populates='order', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.user_id,
            "status": self.status,
            "products": {product.product_id: product.from_order() for product in self.product_orders},
            "createdAt": self.created_at,
            "updatedAt": self.updated_at
        }
    
    def __repr__(self):
        return f"<Order {self.id} -- user={self.user_id}>"