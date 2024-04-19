const ADD_ORDERS = 'orders/addOrders';
const REMOVE_ORDER = 'orders/removeOrder';

const addOrders = (orders) => ({
    type: ADD_ORDERS,
    payload: orders
});

const removeOrder = (orderId) => ({
    type: REMOVE_ORDER,
    payload: orderId
})

export const getUserOrdersThunk = () => async dispatch => {
    const response = await fetch('/api/orders/');

    if(response.ok) {
        const data = await response.json();
        dispatch(addOrders(data));
    } else {
        return { server: "Something went wrong. Please try again" }
    }
}

export const addOrderThunk = (order) => async dispatch => {
    const response = await fetch('/api/orders/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(order)
    });

    if(response.ok) {
        const data = await response.json();
        dispatch(addOrders(data));
        return data;
    } else {
        return { server: "Something went wrong. Please try again" };
    }
}

export const deleteOrderThunk = (orderId) => async dispatch => {
    const response = await fetch(`/api/orders/${orderId}`, {method: 'DELETE'});

    if(response.ok) {
        const data = await response.json();
        dispatch(removeOrder(orderId));
        return data;
    } else {
        return { server: "Something went wrong. Please try again" }
    }
}

const initialState = {allIds: [], byId: {}};

function ordersReducer(state = initialState, action) {
    switch(action.type) {
        case ADD_ORDERS:
            return { ...state, allIds: [...action.payload.allIds], byId: {...action.payload.byId} };
        case REMOVE_ORDER: {
            const newState = { ...state };
            delete newState.byId[action.payload];
            newState.allIds = state.allIds.filter(id => +id !== +action.payload);
            return newState;
        }
        default:
            return state;
    }
}

export default ordersReducer;