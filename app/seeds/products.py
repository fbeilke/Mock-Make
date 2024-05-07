from app.models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime, timezone

def seed_products():
    product1 = Product(

        vendor_id=1,
        name="Decorative Ceramic Vase",
        description="Elegant ceramic vase perfect for centerpieces or corner decor.",
        price=24.99,
        category="Home Goods",
        created_at=datetime.now(timezone.utc),
        updated_at=datetime.now(timezone.utc)
    )

    product2 = Product(

        vendor_id=1,
        name="Luxury Throw Pillow",
        description="Plush and stylish throw pillow to enhance your home comfort.",
        price=19.99,
        category="Home Goods",
        created_at=datetime.now(timezone.utc),
        updated_at=datetime.now(timezone.utc)
    )

    product3 = Product(

        vendor_id=1,
        name="Handwoven Area Rug",
        description="Add a touch of tradition with our handwoven area rugs.",
        price=89.99,
        category="Home Goods",
        created_at=datetime.now(timezone.utc),
        updated_at=datetime.now(timezone.utc)
    )

    product4 = Product(

        vendor_id=1,
        name="Wall Mounted Art Decor",
        description="Transform any room with our modern art decor pieces.",
        price=45.50,
        category="Home Goods",
        created_at=datetime.now(timezone.utc),
        updated_at=datetime.now(timezone.utc)
    )

    product5 = Product(

        vendor_id=1,
        name="Minimalist Wooden Clock",
        description="Stay timely with this sleek minimalist wooden clock.",
        price=30.00,
        category="Home Goods",
        created_at=datetime.now(timezone.utc),
        updated_at=datetime.now(timezone.utc)
    )

    product6 = Product(

        vendor_id=1,
        name="Antique Brass Lamp",
        description="Brighten up your space with our antique brass lamp.",
        price=120.99,
        category="Home Goods",
        created_at=datetime.now(timezone.utc),
        updated_at=datetime.now(timezone.utc)
    )

    product7 = Product(

        vendor_id=1,
        name="Ornate Mirror Frame",
        description="Ornate mirror frame for a touch of elegance in your dressing room.",
        price=55.99,
        category="Home Goods",
        created_at=datetime.now(timezone.utc),
        updated_at=datetime.now(timezone.utc)
    )

    product8 = Product(

        vendor_id=1,
        name="Modern Bookshelf",
        description="Organize your books in style with our modern bookshelf.",
        price=200.00,
        category="Home Goods",
        created_at=datetime.now(timezone.utc),
        updated_at=datetime.now(timezone.utc)
    )

    product9 = Product(

        vendor_id=2,
        name="Strategy Board Game",
        description="Challenge the mind with our engaging strategy board game.",
        price=35.00,
        category="Toys & Games",
        created_at=datetime.now(timezone.utc),
        updated_at=datetime.now(timezone.utc)
    )

    product10 = Product(

        vendor_id=2,
        name="RC Car",
        description="High-speed remote control car for outdoor excitement.",
        price=45.00,
        category="Toys & Games",
        created_at=datetime.now(timezone.utc),
        updated_at=datetime.now(timezone.utc)
    )

    product11 = Product(

        vendor_id=2,
        name="Puzzle Set",
        description="High-quality, challenging puzzle set for hours of fun.",
        price=25.99,
        category="Toys & Games",
        created_at=datetime.now(timezone.utc),
        updated_at=datetime.now(timezone.utc)
    )

    product12 = Product(

        vendor_id=2,
        name="Educational Game",
        description="Creative and educational game for learning and fun.",
        price=40.00,
        category="Toys & Games",
        created_at=datetime.now(timezone.utc),
        updated_at=datetime.now(timezone.utc)
    )

    product13 = Product(

        vendor_id=2,
        name="Dollhouse",
        description="Detailed and vibrant dollhouse to spark children's imaginations.",
        price=70.00,
        category="Toys & Games",
        created_at=datetime.now(timezone.utc),
        updated_at=datetime.now(timezone.utc)
    )

    product14 = Product(

        vendor_id=2,
        name="Action Figure Set",
        description="Dynamic action figure set for adventurous playtime.",
        price=29.99,
        category="Toys & Games",
        created_at=datetime.now(timezone.utc),
        updated_at=datetime.now(timezone.utc)
    )

    product15 = Product(

        vendor_id=2,
        name="Building Blocks",
        description="Colorful building blocks to enhance creativity and motor skills.",
        price=34.99,
        category="Toys & Games",
        created_at=datetime.now(timezone.utc),
        updated_at=datetime.now(timezone.utc)
    )

    product16 = Product(

        vendor_id=2,
        name="Chess Set",
        description="Classic wooden chess set for both beginners and experts.",
        price=60.00,
        category="Toys & Games",
        created_at=datetime.now(timezone.utc),
        updated_at=datetime.now(timezone.utc)
    )

    product17 = Product(

        vendor_id=3,
        name="Abstract Canvas Art",
        description="Expressive abstract canvas to add a modern touch to any space.",
        price=150.00,
        category="Art & Collectibles",
        created_at=datetime.now(timezone.utc),
        updated_at=datetime.now(timezone.utc)
    )

    product18 = Product(

        vendor_id=3,
        name="Vintage Sculpture",
        description="Intricately designed vintage sculpture, a timeless piece.",
        price=250.00,
        category="Art & Collectibles",
        created_at=datetime.now(timezone.utc),
        updated_at=datetime.now(timezone.utc)
    )

    product19 = Product(

        vendor_id=3,
        name="Renaissance Art Print",
        description="High-quality print of a renowned Renaissance painting.",
        price=85.00,
        category="Art & Collectibles",
        created_at=datetime.now(timezone.utc),
        updated_at=datetime.now(timezone.utc)
    )

    product20 = Product(

        vendor_id=3,
        name="Antique Vase",
        description="Genuine antique vase from the early 20th century.",
        price=300.00,
        category="Art & Collectibles",
        created_at=datetime.now(timezone.utc),
        updated_at=datetime.now(timezone.utc)
    )

    product21 = Product(

        vendor_id=3,
        name="Handcrafted Metal Bookmark",
        description="Elegant handcrafted bookmark, perfect for book lovers.",
        price=22.50,
        category="Art & Collectibles",
        created_at=datetime.now(timezone.utc),
        updated_at=datetime.now(timezone.utc)
    )

    product22 = Product(

        vendor_id=3,
        name="Collector's Edition Comic Book",
        description="Rare collector's edition comic book, mint condition.",
        price=190.00,
        category="Art & Collectibles",
        created_at=datetime.now(timezone.utc),
        updated_at=datetime.now(timezone.utc)
    )

    product23 = Product(

        vendor_id=3,
        name="Custom Engraved Chess Set",
        description="Beautifully engraved chess set, customizable per order.",
        price=120.00,
        category="Art & Collectibles",
        created_at=datetime.now(timezone.utc),
        updated_at=datetime.now(timezone.utc)
    )

    product24 = Product(

        vendor_id=3,
        name="Decorative Stained Glass",
        description="Colorful stained glass for adding vibrancy to your windows.",
        price=160.00,
        category="Art & Collectibles",
        created_at=datetime.now(timezone.utc),
        updated_at=datetime.now(timezone.utc)
    )

    product25 = Product(

        vendor_id=4,
        name="Calligraphy Starter Kit",
        description="Complete kit for beginners to learn the art of calligraphy.",
        price=29.99,
        category="Craft Supplies & Tools",
        created_at=datetime.now(timezone.utc),
        updated_at=datetime.now(timezone.utc)
    )

    product26 = Product(

        vendor_id=4,
        name="Watercolor Paint Set",
        description="Vibrant set of watercolor paints for artists of all levels.",
        price=19.99,
        category="Craft Supplies & Tools",
        created_at=datetime.now(timezone.utc),
        updated_at=datetime.now(timezone.utc)
    )

    product27 = Product(

        vendor_id=4,
        name="Knitting Kit",
        description="Everything you need to start knitting beautiful scarves and hats.",
        price=39.99,
        category="Craft Supplies & Tools",
        created_at=datetime.now(timezone.utc),
        updated_at=datetime.now(timezone.utc)
    )

    product28 = Product(

        vendor_id=4,
        name="Embroidery Hoop Set",
        description="Assortment of embroidery hoops in various sizes for your stitching projects.",
        price=14.99,
        category="Craft Supplies & Tools",
        created_at=datetime.now(timezone.utc),
        updated_at=datetime.now(timezone.utc)
    )

    product29 = Product(

        vendor_id=4,
        name="DIY Candle Making Kit",
        description="Create your own scented candles with this easy-to-use kit.",
        price=24.99,
        category="Craft Supplies & Tools",
        created_at=datetime.now(timezone.utc),
        updated_at=datetime.now(timezone.utc)
    )

    product30 = Product(

        vendor_id=4,
        name="Wood Burning Kit",
        description="Explore pyrography with this wood burning toolset for creating intricate designs.",
        price=34.99,
        category="Craft Supplies & Tools",
        created_at=datetime.now(timezone.utc),
        updated_at=datetime.now(timezone.utc)
    )

    product31 = Product(

        vendor_id=4,
        name="Pottery Wheel",
        description="High-quality pottery wheel for throwing and sculpting clay.",
        price=299.99,
        category="Craft Supplies & Tools",
        created_at=datetime.now(timezone.utc),
        updated_at=datetime.now(timezone.utc)
    )

    product32 = Product(

        vendor_id=4,
        name="Artists' Canvas Set",
        description="Assortment of canvases for acrylic and oil painting projects.",
        price=39.99,
        category="Craft Supplies & Tools",
        created_at=datetime.now(timezone.utc),
        updated_at=datetime.now(timezone.utc)
    )

    product33 = Product(

        vendor_id=5,
        name="Plush Throw Blanket",
        description="Soft and cozy throw blanket for chilly nights.",
        price=49.99,
        category="Gifts",
        created_at=datetime.now(timezone.utc),
        updated_at=datetime.now(timezone.utc)
    )

    product34 = Product(

        vendor_id=5,
        name="Indoor Plant Set",
        description="Assortment of indoor plants to add greenery to your living space.",
        price=59.99,
        category="Gifts",
        created_at=datetime.now(timezone.utc),
        updated_at=datetime.now(timezone.utc)
    )

    product35 = Product(

        vendor_id=5,
        name="Cozy Knit Throw Pillow",
        description="Knit throw pillow for adding warmth and texture to your decor.",
        price=19.99,
        category="Gifts",
        created_at=datetime.now(timezone.utc),
        updated_at=datetime.now(timezone.utc)
    )

    product36 = Product(

        vendor_id=5,
        name="Crystal Wine Glasses",
        description="Elegant crystal wine glasses for special occasions.",
        price=39.99,
        category="Gifts",
        created_at=datetime.now(timezone.utc),
        updated_at=datetime.now(timezone.utc)
    )

    product37 = Product(

        vendor_id=5,
        name="Marble Cheese Board",
        description="Stylish marble cheese board for serving appetizers with sophistication.",
        price=29.99,
        category="Gifts",
        created_at=datetime.now(timezone.utc),
        updated_at=datetime.now(timezone.utc)
    )

    product38 = Product(

        vendor_id=5,
        name="Stainless Steel Cookware Set",
        description="Durable stainless steel cookware set for versatile cooking.",
        price=149.99,
        category="Gifts",
        created_at=datetime.now(timezone.utc),
        updated_at=datetime.now(timezone.utc)
    )

    product39 = Product(

        vendor_id=5,
        name="Electric Kettle",
        description="Quick and efficient electric kettle for boiling water.",
        price=34.99,
        category="Gifts",
        created_at=datetime.now(timezone.utc),
        updated_at=datetime.now(timezone.utc)
    )

    product40 = Product(

        vendor_id=5,
        name="Nonstick Bake-ware Set",
        description="Complete nonstick bakeware set for effortless baking.",
        price=59.99,
        category="Gifts",
        created_at=datetime.now(timezone.utc),
        updated_at=datetime.now(timezone.utc)
    )

    all_products = [product1, product2, product3, product4, product5, product6, product7, product8, product9,
                    product10, product11, product12, product13, product14, product15, product16, product17,
                    product18, product19, product20, product21, product22, product23, product24, product25,
                    product26, product27, product28, product29, product30, product31, product32, product33,
                    product34, product35, product36, product37, product38, product39, product40]

    _ = [db.session.add(product) for product in all_products]
    db.session.commit()

def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products"))

    db.session.commit()
