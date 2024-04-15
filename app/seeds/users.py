from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', first_name="Demo", last_name="User", password='password')
    marnie = User(
        username='marnie', email='marnie@aa.io', first_name="Marnie", last_name="User", password='password')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', first_name="Bobbie", last_name="User", password='password')
    kyle = User(
        username='kyle', email='kyle@aa.io', first_name='Kyle', last_name='Enos', password='password')
    harry = User(
        username='harry', email='harry@aa.io', first_name='Harry', last_name='Jones', password='password')
    jack = User(
        username='jack', email='jack@aa.io', first_name='Jack', last_name='Wilson', password='password')



    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(kyle)
    db.session.add(harry)
    db.session.add(jack)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
