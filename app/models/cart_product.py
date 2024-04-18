from .db import db, environment, SCHEMA, add_prefix_for_prod

class CartProduct(db.Model):
    __tablename__ = 'user_cart_products'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'), ondelete='CASCADE'), primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('products.id'), ondelete='CASCADE'), primary_key=True)
    quantity = db.Column(db.Integer, nullable=False)

    def to_dict(self):
        return {
            "userId": self.user_id,
            "productId": self.product_id,
            "quantity": self.quantity
        }
    
    def __repr__(self):
        return f"<CartProduct {self.product_id} for User {self.user_id}, Quantity: {self.quantity}>"