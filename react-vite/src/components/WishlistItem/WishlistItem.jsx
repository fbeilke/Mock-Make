import { FaTrashAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { addItemToWishlist, removeItemFromWishlist } from '../../redux/session';

// import './WishlistItem.css';

function WishlistItem({ product }){
    const dispatch = useDispatch();
    if(!product) return null;

    const { id, name, product_images: productImages } = product;


    const image = Object.values(productImages)[0];

    const handleAddToCart = () => {

        dispatch(addItemToWishlist({
            productId: id,
            quantity: 1
        }))
    }

    const handleRemoveFromWishlist = () => {
        dispatch(removeItemFromWishlist(id));
    }

    return (
        <div className="wishlist-product">
            <div className="wishlist-product-info">
                <img className="wishlist-product-image" src={image.url} alt={name} />
                <p className="wishlist-product-name">{name}</p>
            </div>
            <div className="wishlist-product-actions">
                <button className="wishlist-add-to-cart" onClick={handleAddToCart}>
                    Add to Cart
                </button>
                <FaTrashAlt className="wishlist-remove-item" onClick={handleRemoveFromWishlist} />
            </div>
        </div>
    );
}

export default WishlistItem;
