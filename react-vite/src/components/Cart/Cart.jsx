import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts } from '../../redux/products';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import CartItem from "../CartItem";
import './Cart.css';

function Cart(){
    const dispatch = useDispatch();

    const sessionUser = useSelector(state => state.session.user);
    const cart = useSelector(state => state.session.cart);
    const [cartArr, setCartArr] = useState([]);
    const products = useSelector(state => state.products.products)
    const [isOpen, setIsOpen] = useState(true);

    const closeCart = () => {
        setIsOpen(false);
    }

    const openCart = () => {
        setIsOpen(true);
    }

    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch]);

    useEffect(() => {
        setCartArr(cart ? Object.values(cart) : []);
    }, [cart])

    if(!sessionUser) return null; // Don't display the cart when no user is logged in

    return (
        <div id="cart-container">
            { isOpen ? <FaAngleRight size={20} onClick={closeCart} />
                    : <FaAngleLeft size={20} onClick={openCart} />
            }
            <div id="cart" className={isOpen ? 'visible' : 'hidden'}>
                {isOpen ?
                    <>
                        <h3>Cart</h3>
                        <div className="cart-contents">
                            {cartArr?.map(product => (
                                <CartItem key={product.productId} quantity={product.quantity} product={products?.[product.productId]} />
                            ))}
                        </div>
                    </>
                :   null
                }
            </div>
        </div>
    );
}

export default Cart;
