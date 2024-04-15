import { useEffect } from "react"
import { getAllProducts } from "../../redux/products"
import { addCartItemThunk } from "../../redux/session"
import { getAllUsersThunk } from "../../redux/users"
import { useDispatch, useSelector } from "react-redux"
import ProductsList from './ProductsList';
import "./AllProducts.css"

export default function AllProducts() {
    const dispatch = useDispatch();
    const { products } = useSelector(state => state.products)
    const { users } = useSelector(state => state.users)

    useEffect(() => {
        dispatch(getAllProducts())
        dispatch(getAllUsersThunk())
    }, [dispatch])

    const addToCart = (product) => {
        const cartProduct = {
            productId: product.id,
            quantity: 1
        }
        dispatch(addCartItemThunk(cartProduct));
    }

    return (
        <div className="products-page">
            <h2>All products</h2>
            <ProductsList products={products} users={users}/>
        </div>
    )
}
