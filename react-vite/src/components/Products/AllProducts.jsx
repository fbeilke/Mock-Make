import { useEffect } from "react"
import { getAllProducts, getSearchProducts } from "../../redux/products"
import { getAllUsersThunk } from "../../redux/users"
import { useDispatch, useSelector } from "react-redux"
import { getAllReviews } from "../../redux/reviews";
import ProductsList from './ProductsList';
import { useSearchParams } from "react-router-dom";

export default function AllProducts() {
    const dispatch = useDispatch();
    const [query] = useSearchParams();
    const search = query.get('name')?.split(' ').join('+');
    const { products } = useSelector(state => state.products)
    const { users } = useSelector(state => state.users)
    const { reviews } = useSelector(state => state.reviews)
    const { user } = useSelector(state => state.session)

    useEffect(() => {
        if(search) {
            console.log(search)
            dispatch(getSearchProducts(search))
        } else {
            dispatch(getAllProducts())
        }
        dispatch(getAllUsersThunk())
        dispatch(getAllReviews())
    }, [dispatch, search])


    return (
        <div className="products-page">
            <h2>All products</h2>
            <ProductsList products={products} users={users} reviews={reviews} currentUser={user}/>
        </div>
    )
}
