import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getProductsByCategory } from '../../redux/products';
import { getAllUsersThunk } from '../../redux/users';
import { getAllReviews } from '../../redux/reviews';
import { useDispatch, useSelector } from 'react-redux';
import ProductsList from './ProductsList'

export default function ProductsByCategory() {
    const { category } = useParams()
    const dispatch = useDispatch();
    const { products, categoryResults } = useSelector(state => state.products)
    const { users } = useSelector(state => state.users)
    const { reviews } = useSelector(state => state.reviews)
    const { user } = useSelector(state => state.session)

    function categoryTitle() {
        switch(category) {
            case "HomeGoods":
                return "Home Goods"
            case "ToysGames":
                return "Toys & Games"
            case "ArtCollectibles":
                return "Art & Collectibles"
            case "CraftSuppliesTools":
                return "Craft Supplies & Tools"
            case "Gifts":
                return "Gifts"
            default:
                return null
        }
    }

    const categoryName = categoryTitle()

    useEffect(() => {
        dispatch(getProductsByCategory(categoryName))
        dispatch(getAllUsersThunk())
        dispatch(getAllReviews())
    }, [dispatch, categoryName])

    if(!categoryResults) return null;

    const categoryProducts = categoryResults.map(productId => products[productId]);

    return (
        <div className="products-page">
            <h2>{categoryName} Products</h2>
            <ProductsList products={categoryProducts} users={users} reviews={reviews} currentUser={user}/>
        </div>
    )
}
