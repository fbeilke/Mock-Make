from .db import db, environment, SCHEMA, add_prefix_for_prod

class ProductImage(db.Model):
    __tablename__ = "product_images"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('products.id')), nullable=False)
    url = db.Column(db.String(255), nullable=False)
    preview = db.Column(db.Boolean, nullable=False, default=False)

    product = db.relationship("Product", back_populates="images")

    def to_dict(self):
        return {
            "id": self.id,
            "productId": self.product_id,
            "url": self.url,
            "preview": self.preview
        }

    def __repr__(self):
        return f"<ProductImage {self.id} -- product={self.product_id}>"
