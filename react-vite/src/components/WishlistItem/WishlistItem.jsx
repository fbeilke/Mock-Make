import { FaTrashAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { removeItemFromWishlist } from '../../redux/session';
import { addCartItemThunk } from '../../redux/session';
import './WishlistItem.css';

function WishlistItem({ product, quantity }){
    const dispatch = useDispatch();
    if(!product) return null;

    const { id, name, price, product_images: productImages } = product;


    const image = Object.values(productImages).filter(image => image.preview === true)[0];

    const addToCart = (product) => {
        const cartProduct = {
            productId: product.id,
            quantity: 1
        }
        dispatch(addCartItemThunk(cartProduct));
    }

    const handleRemoveFromWishlist = () => {
        dispatch(removeItemFromWishlist(id));
    }

    return (
        <div className="wishlist-product">
            <img className="wishlist-product-image" src={image.url} alt={name} />
            <div className="wishlist-product-info">
                <p className="wishlist-product-name">{name}</p>
                <p className='wishlist-product-quantity'>Quantity: {quantity}</p>
                <p className="wishlist-product-price">{price}</p>
            </div>
            <div className="wishlist-product-actions">
                <button className="wishlist-add-to-cart" onClick={() => addToCart(product)}>
                    Add to Cart
                </button>
                <FaTrashAlt className="wishlist-remove-item" onClick={handleRemoveFromWishlist} />
            </div>
        </div>
    );
}

export default WishlistItem;
