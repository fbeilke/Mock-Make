import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts } from '../../redux/products';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import { useCart } from '../../context/CartProvider';
import { Link } from 'react-router-dom';
import CartItem from "../CartItem";
import './Cart.css';

function Cart(){
    const dispatch = useDispatch();

    const sessionUser = useSelector(state => state.session.user);
    const products = useSelector(state => state.products.products)
    const cart = useSelector(state => state.session.cart);
    const { isOpen, setIsOpen } = useCart();

    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch]);

    useEffect(() => {
        if(!cart) return;
        if(Object.keys(cart).length) setIsOpen(true);
        else setIsOpen(false);
    }, [cart, setIsOpen]);

    if(!sessionUser) return null; // Don't display the cart when no user is logged in

    return (
        <div id="cart-container">
            { isOpen ? <FaAngleRight size={20} onClick={() => setIsOpen(false)} />
                    : <FaAngleLeft size={20} onClick={() => setIsOpen(true)} />
            }
            <div id="cart" className={isOpen ? 'visible' : 'hidden'}>
                {isOpen ?
                    <>
                        <h3>Cart</h3>
                        <div className="cart-contents">
                            {Object.entries(cart).map(([id, product]) => (
                                <CartItem key={id} quantity={product.quantity} product={products?.[id]} />
                            ))}
                        </div>
                        { Object.keys(cart).length
                            ? <Link to="/checkout">Checkout</Link>
                            : <p>No Items Yet...</p>
                        }
                    </>
                :   null
                }
            </div>
        </div>
    );
}

export default Cart;
