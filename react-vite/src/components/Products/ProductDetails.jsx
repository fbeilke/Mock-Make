import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleProduct } from '../../redux/products'
import { addCartItemThunk } from '../../redux/session';
import "./ProductDetails.css"

export default function ProductDetails() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { productId } = useParams();
    const { products } = useSelector(state => state.products)
    const { user } = useSelector(state => state.session)
    const [displayImageURL, setDisplayImageURL] = useState(null)


    useEffect(() => {
        dispatch(getSingleProduct(productId))
    }, [dispatch, productId])

    if (!products) return null;

    const singleProduct = products[productId];

    const allProductImages = Object.values(singleProduct.product_images)

    const addToCart = (product) => {
        const cartProduct = {
            productId: product.id,
            quantity: 1
        }
        dispatch(addCartItemThunk(cartProduct));
    }




    return (
        <div className="product-detail-columns">
            <div className="product-detail-left-side">
                <div className="product-detail-images">
                    <div className='detail-all-images'>
                        {allProductImages.map(image => (
                            <img src={image.url} alt={`image ${image.id}`} key={image.id} onClick={() => setDisplayImageURL(image.url)}/>
                        ))}
                    </div>
                    <div>
                        {!displayImageURL ? <img src={allProductImages.filter(image => image.preview)[0].url} alt={`${singleProduct.name}`} className="detail-display-image" /> :
                        <img src={displayImageURL} alt={`${singleProduct.name}`} className="detail-display-image" />
                        }
                    </div>
                </div>
                <div className="product-reviews">
                    <h2>Reviews</h2>
                </div>
            </div>
            <div className="product-details-right-side">
                {!user || singleProduct.vendor_id !== user.id ? null :
                    <div className="vendor-control-buttons">
                            <button onClick={() => navigate(`/products/${singleProduct.id}/edit`)}>Update Listing</button>
                            <button onClick={() => alert("Coming Soon")}>Delete Listing</button>
                    </div>
                }
                <h2>${singleProduct.price}</h2>
                <p>{singleProduct.name}</p>
                <span>TODO: add product vendor name</span>
                <span>·</span>
                <span>TODO: add reviews stars</span>
                {user && singleProduct.vendor_id === user.id ? null :
                <p>
                    <button onClick={() => addToCart(singleProduct)}>Add to cart</button>
                    <button>Add to wishlist</button>
                </p>
                }
                <p>{singleProduct.description}</p>
            </div>
        </div>
    )
}
