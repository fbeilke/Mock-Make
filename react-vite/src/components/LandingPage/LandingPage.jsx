import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { NavLink } from "react-router-dom";
import { getAllProducts } from "../../redux/products"
import { getAllUsersThunk } from "../../redux/users";
import "./LandingPage.css"
import SingleProductCard from "../Products/SingleProductCard";

export default function LandingPage() {
    const dispatch = useDispatch();
    const { products, allProductsIds } = useSelector(state => state.products)
    const { user } = useSelector(state => state.session);
    const { users } = useSelector(state => state.users);



    const categories = [
        "Home Goods",
        "Toys & Games",
        "Art & Collectibles",
        "Craft Supplies & Tools",
        "Gifts"
    ]



    useEffect(() => {
        dispatch(getAllProducts())
        dispatch(getAllUsersThunk())
    }, [dispatch])

    if (!products) return <p>Loading...</p>


    const randomProducts = [];
    randomProducts.push(products[Math.floor(Math.random() * allProductsIds.length)])
    randomProducts.push(products[Math.floor(Math.random() * allProductsIds.length)])
    randomProducts.push(products[Math.floor(Math.random() * allProductsIds.length)])


    return (
        <div>
            <h2 className="landing-page-title">Shop Handmade Products</h2>
            <div className="landing-categories-container">
                {categories.map(category => {
                    const productsByCategory = Object.values(products).filter(product => product.category === category)
                    const randomCategoryProductId = Math.floor(Math.random() * productsByCategory.length)
                    return (
                        <div className="landing-categories-card" key={category}>
                            <img className="landing-categories-image" src={Object.values(productsByCategory[randomCategoryProductId].product_images)[0].url} />
                            <p className="landing-categories-title">{category}</p>
                        </div>
                    )
                })}
            </div>
            <div>
                {!user ? null :
                <div className='landing-if-logged-in'>
                    <button>View your orders</button>
                    <button>View your wish list</button>
                </div>
                }
            </div>
            <div className='landing-random-products-links'>
                <h3 className='landing-random-products-title'>Products we think you'll love:</h3>
                <div className="random-product-card">
                    {randomProducts.map(product => (
                        <SingleProductCard product={product} users={users}/>
                    ))}
                </div>

            </div>

        </div>

    )
}
