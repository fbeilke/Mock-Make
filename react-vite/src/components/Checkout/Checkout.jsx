import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import OrderItem from "../OrderItem";
import { addOrderThunk } from "../../redux/orders";
import { emptyCartThunk } from '../../redux/session';
import { useEffect } from 'react';
import { useCart } from '../../context/CartProvider';

function Checkout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { setIsOpen } = useCart();
    const cart = useSelector(state => state.session.cart);
    const products = useSelector(state => state.products.products);

    useEffect(() => {
        setIsOpen(false);
    }, [setIsOpen])

    if(!cart || !products ) return null;

    const placeOrder = async (e) => {
        e.preventDefault();

        const order = {
            productOrders: Object.values(cart)
        }

        const created = await dispatch(addOrderThunk(order));

        if(created.byId) {
            dispatch(emptyCartThunk());
            navigate('/orders');
        }
    }

    return (
        <div id='checkout'>
            <h3>Your Cart</h3>
            <div className="checkout-products">
                {Object.entries(cart).map(([id, product]) => (
                    <OrderItem key={id} quantity={product.quantity} product={products[id]} />
                ))}
            </div>
            <button onClick={placeOrder}>Place Order</button>
        </div>
    )
}

export default Checkout;