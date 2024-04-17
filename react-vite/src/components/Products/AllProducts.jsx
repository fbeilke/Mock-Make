import { useEffect } from "react"
import { getAllProducts } from "../../redux/products"
import { getAllUsersThunk } from "../../redux/users"
import { useDispatch, useSelector } from "react-redux"
import { getAllReviews } from "../../redux/reviews";
import ProductsList from './ProductsList';

export default function AllProducts() {
    const dispatch = useDispatch();
    const { products } = useSelector(state => state.products)
    const { users } = useSelector(state => state.users)
    const { reviews } = useSelector(state => state.reviews)

    useEffect(() => {
        dispatch(getAllProducts())
        dispatch(getAllUsersThunk())
        dispatch(getAllReviews())
    }, [dispatch])


    return (
        <div className="products-page">
            <h2>All products</h2>
            <ProductsList products={products} users={users} reviews={reviews}/>
        </div>
    )
}
