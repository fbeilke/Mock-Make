import { NavLink } from "react-router-dom"
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { addCartItemThunk } from "../../redux/session"
import "./ProductsList.css"
import ReviewStars from "../ReviewStars/ReviewStars";


export default function ProductsList({ products, users, reviews, currentUser }) {
    const dispatch = useDispatch()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    if (!users || !products ) return null;

    const addToCart = (product) => {
        const cartProduct = {
            productId: product.id,
            quantity: 1
        }
        dispatch(addCartItemThunk(cartProduct));
    }

    function reviewsByProduct(productID) {

        if (reviews) {
            const reviewsArr = Object.values(reviews);
            return reviewsArr.filter(review => review.productId === productID)
        } else {
            return null;
        }
    }

    return (
        <div className="products-list">
            {!products ? null : Object.values(products).map(product => (
                <div key={product.id} className="each-product">
                    <NavLink to={`/products/${product.id}`} className="each-product-link">
                        <img className="each-product-image" src={`${Object.values(product.product_images).filter(productImage => productImage.preview)[0].url}`} alt={`${product.name}`} />
                        <div className="each-product-info">
                            <p>{product.name}</p>
                            <div className='product-vendor-review-stars'>
                                <ReviewStars reviewsByProductId={reviewsByProduct(product.id)}/>
                                <span> · </span>
                                {users[product.vendor_id].vendor_name ? <span>{users[product.vendor_id].vendor_name}</span> :
                                <span>{users[product.vendor_id].username}</span>
                                }
                            </div>
                            <h3>${product.price}</h3>
                        </div>
                    </NavLink>
                    {currentUser && currentUser.id === product.vendor_id ? null :
                    <button onClick={() => addToCart(product)}>Add to cart</button>
                    }
                </div>
            ))}
        </div>
    )
}
