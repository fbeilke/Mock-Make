const ADD_ORDERS = 'orders/addOrders';

const addOrders = (orders) => ({
    type: ADD_ORDERS,
    payload: orders
});

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

const initialState = {allIds: [], byId: {}};

function ordersReducer(state = initialState, action) {
    switch(action.type) {
        case ADD_ORDERS:
            return { ...state, allIds: {...action.payload.allIds}, byId: {...action.payload.byId} };
        default:
            return state;
    }
}

export default ordersReducer;