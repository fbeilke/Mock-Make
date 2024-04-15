from .db import db, environment, SCHEMA, add_prefix_for_prod

class UserWish(db.Model):
    __tablename__ = "user_wishes"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('products.id')), primary_key=True)
    quantity = db.Column(db.Integer)

    def to_dict(self):
        return {
            "userId": self.user_id,
            "productId": self.product_id,
            "quantity": self.quantity
        }
    
    def __repr__(self):
        return f"<UserWish Product {self.product_id} for User {self.user_id}, Quantity: {self.quantity}>"