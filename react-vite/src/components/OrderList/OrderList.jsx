import { useDispatch, useSelector } from 'react-redux'
import { getUserOrdersThunk } from '../../redux/orders';
import Order from "../Order/Order";
import { useEffect } from 'react';
import './OrderList.css';

function OrderList() {
    const dispatch = useDispatch();
    const { byId: orders, allIds } = useSelector(state => state.orders);

    useEffect(() => {
        dispatch(getUserOrdersThunk());
    }, [dispatch])

    return (
        <div id="order-list">
            <h3>Your Orders</h3>
            { allIds.length ? 
                Object.entries(orders).map(([id, order]) => (
                    <Order key={id} order={order} />
                )) :
                <p>No past orders to display</p>
            }
        </div>
    );
}

export default OrderList;