import { FaXmark } from 'react-icons/fa6';
import { useDispatch } from 'react-redux';
import { putCartItemThunk, deleteCartItemThunk } from '../../redux/session';
import './CartItem.css';

function CartItem({ product, quantity }){
    const dispatch = useDispatch();
    if(!product) return null;

    const { id, name, product_images: productImages } = product;

    const image = Object.values(productImages).find(image => image.preview)

    const decrementItem = () => {
        dispatch(putCartItemThunk({
            productId: id,
            quantity: quantity - 1
        }))
    }

    const incrementItem = () => {
        dispatch(putCartItemThunk({
            productId: id,
            quantity: quantity + 1
        }))
    }

    const deleteItem = () => {
        dispatch(deleteCartItemThunk(id));
    }

    return (
        <div className="cart-product">
            <div className="cart-product-name">
                <p>{name}</p>
                <FaXmark onClick={deleteItem}/>
            </div>
            <img className="cart-product-image" src={image.url} alt="" />
            <div className="quantity-controls">
                <button onClick={decrementItem}>-</button>
                <p>{quantity}</p>
                <button onClick={incrementItem}>+</button>
            </div>
        </div>
    );
}

export default CartItem;