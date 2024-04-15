import { useDispatch, useSelector } from 'react-redux'
import { getUserOrdersThunk } from '../../redux/orders';
import Order from "../Order/Order";
import { useEffect } from 'react';

function OrderList() {
    const dispatch = useDispatch();
    const orders = useSelector(state => state.orders.byId);

    useEffect(() => {
        dispatch(getUserOrdersThunk());
    }, [dispatch])

    return (
        <div id="order-list">
            {Object.values(orders).map(order => (
                <Order key={order.id} order={order} />
            ))}
        </div>
    );
}

export default OrderList;