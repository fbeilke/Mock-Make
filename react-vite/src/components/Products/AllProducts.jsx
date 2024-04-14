import { useEffect } from "react"
import { getAllProducts } from "../../redux/products"
import { addCartItemThunk } from "../../redux/session"
import { useDispatch, useSelector } from "react-redux"
import "./AllProducts.css"

export default function AllProducts() {
    const dispatch = useDispatch();
    const { products } = useSelector(state => state.products)

    useEffect(() => {
        dispatch(getAllProducts())
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
            <div className="products-list">
                {!products ? null : Object.values(products).map(product => (
                    <div key={product.id}>
                        <img className="each-product-image" src={`${Object.values(product.product_images)[1].url}`} alt={`${product.name}`} />
                        <div className="each-product-info">
                            <p>{product.name}</p>
                            <span>TODO: add reviews</span>
                            <span>·</span>
                            <span>TODO: add vendor name</span>
                            <h3>${product.price}</h3>
                            <button onClick={() => addToCart(product)}>Add to cart</button>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
