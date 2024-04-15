from app.models import db, UserWish, environment, SCHEMA

def seed_user_wishes():

    user_wish_data = [
        {"user_id": 1, "product_id": 1, "quantity": 2},
        {"user_id": 1, "product_id": 3, "quantity": 1},
        {"user_id": 2, "product_id": 2, "quantity": 3},
        {"user_id": 2, "product_id": 4, "quantity": 1},
        {"user_id": 3, "product_id": 1, "quantity": 1},
        {"user_id": 3, "product_id": 3, "quantity": 2},
    ]

    # Create UserWish instances and add them to the database session
    for data in user_wish_data:
        user_wish = UserWish(**data)
        db.session.add(user_wish)

    # Commit the changes to the database
    db.session.commit()


def undo_user_wishes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.user_wishes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM user_wishes")
    db.session.commit()
