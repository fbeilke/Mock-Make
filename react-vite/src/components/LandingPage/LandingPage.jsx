import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { NavLink, useNavigate } from "react-router-dom";
import { getAllProducts } from "../../redux/products"
import { getAllUsersThunk } from "../../redux/users";
import { getAllReviews } from "../../redux/reviews";
import SingleProductCard from "../Products/SingleProductCard";
import "./LandingPage.css"

export default function LandingPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { products, allProductsIds } = useSelector(state => state.products)
    const { user } = useSelector(state => state.session);
    const { users } = useSelector(state => state.users);
    const { reviews } = useSelector(state => state.reviews);
    const [randomNumbers, setRandomNumbers] = useState([]);


    const categories = [
        "Home Goods",
        "Toys & Games",
        "Art & Collectibles",
        "Craft Supplies & Tools",
        "Gifts"
    ]

    const categoryUrl = {
        "Home Goods": "HomeGoods",
        "Toys & Games": "ToysGames",
        "Art & Collectibles": "ArtCollectibles",
        "Craft Supplies & Tools": "CraftSuppliesTools",
        "Gifts": "Gifts"
    }

    useEffect(() => {
        setRandomNumbers([
            Math.random(),
            Math.random(),
            Math.random(),
            Math.random(),
        ])
    }, [])

    useEffect(() => {
        dispatch(getAllProducts())
        dispatch(getAllUsersThunk())
        dispatch(getAllReviews())
    }, [dispatch])

    if (!products) return <p>Loading...</p>

    const productsArray = Object.values(products)
    let categoriesSum = 0;
    for (let category of categories) {
        for (let product of productsArray) {
            if (product.category === category) {
                categoriesSum ++
                break
            }
        }
    }

    if (categoriesSum < 5) return <p>Loading...</p>



    const randomProducts = [];
    randomProducts.push(products[Math.floor(randomNumbers[0] * allProductsIds.length)])
    randomProducts.push(products[Math.floor(randomNumbers[1] * allProductsIds.length)])
    randomProducts.push(products[Math.floor(randomNumbers[2] * allProductsIds.length)])

    function productsByCategory(category){
        const productsByCategoryArray = productsArray.filter(product => product.category === category)

        return productsByCategoryArray
    }

    if (randomNumbers.length === 0) return <p>Loading...</p>

    function randomCategoryProductId(category) {
        const randomId = Math.floor(randomNumbers[3] * productsByCategory(category).length)

        return randomId
    }


    return (
        <div>
            <h2 className="landing-page-title">Shop Handmade Products</h2>
            <div className="landing-categories-container">
                {!products ? null : categories.map(category => {

                        return (
                        <div className="landing-categories-card" key={category}>
                            <NavLink to={`/products/categories/${categoryUrl[category]}`} className='landing-categories-link'>
                                <img className="landing-categories-image" src={Object.values(productsByCategory(category)[randomCategoryProductId(category)].product_images)[0].url} />
                                <p className="landing-categories-title">{category}</p>
                            </NavLink>
                        </div>
                    )
                })}
            </div>
            <div>
                {!user ? null :
                <div className='landing-if-logged-in'>
                    <button onClick={() => navigate('/orders')}>View your orders</button>
                    <button onClick={() => navigate('/wishlist')}>View your wish list</button>
                </div>
                }
            </div>
            <div className='landing-random-products-links'>
                <h3 className='landing-random-products-title'>Products we think you&apos;ll love:</h3>
                <div className="random-product-card">
                    {!users || !randomProducts ? null : randomProducts.map(product => (
                        <SingleProductCard product={product} users={users} reviews={reviews} key={!product ? null : product.id}/>
                    ))}
                </div>

            </div>
            <div className='landing-all-products-button-container'>
                <button onClick={() => navigate('/products')} className='all-products-button'>View all products</button>
            </div>

        </div>

    )
}
