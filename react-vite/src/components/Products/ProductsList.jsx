import { NavLink } from "react-router-dom"
import { useDispatch } from "react-redux";
import { addCartItemThunk } from "../../redux/session"
import "./ProductsList.css"


export default function ProductsList({ products, users }) {
    const dispatch = useDispatch()

    if (!users || !products) return null;

    const addToCart = (product) => {
        const cartProduct = {
            productId: product.id,
            quantity: 1
        }
        dispatch(addCartItemThunk(cartProduct));
    }

    return (
        <div className="products-list">
            {!products ? null : Object.values(products).map(product => (
                <div key={product.id} className="each-product">
                    <NavLink to={`/products/${product.id}`} className="each-product-link">
                        <img className="each-product-image" src={`${Object.values(product.product_images).filter(productImage => productImage.preview)[0].url}`} alt={`${product.name}`} />
                        <div className="each-product-info">
                            <p>{product.name}</p>
                            <span>TODO: add reviews stars</span>
                            <span> · </span>
                            {users[product.vendor_id].vendor_name ? <span>{users[product.vendor_id].vendor_name}</span> :
                            <span>{users[product.vendor_id].username}</span>
                            }
                            <h3>${product.price}</h3>
                        </div>
                    </NavLink>
                    <button onClick={() => addToCart(product)}>Add to cart</button>
                </div>
            ))}
        </div>
    )
}
