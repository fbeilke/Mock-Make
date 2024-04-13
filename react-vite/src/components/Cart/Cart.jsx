import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts } from '../../redux/products'
import './Cart.css';

function Cart(){
    const dispatch = useDispatch();

    const sessionUser = useSelector(state => state.session.user);
    const cart = useSelector(state => state.session.cart);
    const products = useSelector(state => state.products)
    const [isOpen, setIsOpen] = useState(true);
    
    const closeCart = () => {
        setIsOpen(false);
    }

    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch]);

    if(!sessionUser) return null; // Don't display the cart when no user is logged in
    
    return (
        <div id="cart" className={isOpen ? 'visible' : 'hidden'}>
            <h3>Cart</h3>
            <button onClick={closeCart}>Close</button>
            <div className="cart-contents">
                {cart?.map(product => (
                    <div key={product.productId}>
                        <p>Product {products[product.productId]?.name}</p>
                        <button>-</button>
                        <p>Quantity {product.quantity}</p>
                        <button>+</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Cart;