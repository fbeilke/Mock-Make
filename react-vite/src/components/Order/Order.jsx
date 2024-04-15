import { useSelector } from 'react-redux';
import OrderItem from '../OrderItem';
import './Order.css';

function Order({ order }){
    const products = useSelector(state => state.products.products)

    if(!order || !products) return null;

    return (
        <div className='order'>
            <h5>Order No. {order.id}</h5>
            <p>{order.status}</p>
            {Object.entries(order.products).map(([id, product]) => (
                <OrderItem key={id} product={products[id]} quantity={product.quantity} />
            ))}
        </div>
    )
}

export default Order;