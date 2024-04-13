from random import randint
from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text



def seed_reviews():
    additional_reviews = [
        # Good reviews
        ("I've been using this product for months now, and it's still as good as new. Highly recommended!", randint(4, 5)),
        ("The versatility of this product is impressive. It's suitable for both beginners and advanced users.", randint(4, 5)),
        ("I initially had doubts about this product, but it has proven to be worth every penny. I'm a happy customer!", randint(4, 5)),
        ("This product arrived on time and in perfect condition. The shipping was prompt.",randint(4, 5)),
        ("The price of this product is incredibly reasonable for the value it provides.",randint(4, 5)),
        # Bad reviews
        ("This product didn't meet my expectations. It feels cheaply made and broke after a few uses.", randint(1, 2)),
        ("I'm disappointed with this product. It stopped working shortly after I bought it.", randint(1, 2)),
        ("The quality of this product is poor. I expected better for the price I paid.", randint(1, 2)),
    ]


    for review_text, stars in additional_reviews:
        review = Review(
            product_id=randint(1, 40),
            user_id=randint(1, 5),
            content=review_text,
            rating=stars
        )
        db.session.add(review)


    db.session.commit()

def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))
    db.session.commit()
