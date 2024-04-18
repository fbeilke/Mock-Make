import { useEffect } from "react"
import { getAllProducts } from "../../redux/products"
import { getAllUsersThunk } from "../../redux/users"
import { useDispatch, useSelector } from "react-redux"
import { getAllReviews } from "../../redux/reviews";
import ProductsList from '../Products/ProductsList';

export default function OwnedListings() {
    const dispatch = useDispatch();
    const { products } = useSelector(state => state.products)
    const { users } = useSelector(state => state.users)
    const { reviews } = useSelector(state => state.reviews)
    const { user } = useSelector(state => state.session)

    useEffect(() => {
        dispatch(getAllProducts())
        dispatch(getAllUsersThunk())
        dispatch(getAllReviews())
    }, [dispatch])

    if (!products) return null;

    function ownedProducts(products) {
        const ownedArr = Object.values(products).filter(product => product.vendor_id === user.id)
        const ownedObj = {}
        for (let product of ownedArr) {
            ownedObj[product.id] = product
        }

        return ownedObj
    }

    return (
        <div className="products-page">
            <h2>Manage your listings</h2>
            <ProductsList products={ownedProducts(products)} users={users} reviews={reviews} currentUser={user}/>
        </div>
    )
}
