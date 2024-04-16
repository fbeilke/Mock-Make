const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';
const SET_CART = 'session/setCart';
const SET_CART_PRODUCT = 'session/setCartProduct';
const DELETE_CART_PRODUCT = 'session/deleteCartProduct';
const REMOVE_CART = 'session/removeCart';

const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

const removeUser = () => ({
  type: REMOVE_USER
});

const setCart = (cart) => ({
  type: SET_CART,
  payload: cart
});

const setCartProduct = (product) => ({
  type: SET_CART_PRODUCT,
  payload: product
});

const deleteCartProduct = (productId) => ({
  type: DELETE_CART_PRODUCT,
  payload: productId
})

const removeCart = () => ({
  type: REMOVE_CART
})

export const thunkAuthenticate = () => async (dispatch) => {
	const response = await fetch("/api/auth/");
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}

		dispatch(setUser(data));
    await dispatch(getCartThunk());
	}
};

export const thunkLogin = (credentials) => async dispatch => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials)
  });

  if(response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
    dispatch(getCartThunk());
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages
  } else {
    return { server: "Something went wrong. Please try again" }
  }
};

export const thunkSignup = (user) => async (dispatch) => {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  });

  if(response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
    dispatch(getCartThunk());
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages
  } else {
    return { server: "Something went wrong. Please try again" }
  }
};

export const thunkLogout = () => async (dispatch) => {
  await fetch("/api/auth/logout");
  dispatch(removeUser());
  dispatch(removeCart());
};

export const getCartThunk = () => async (dispatch) => {
  const response = await fetch("/api/cart/");

  if(response.ok) {
    const data = await response.json();
    dispatch(setCart(data));
  } else {
    return { server: "Something went wrong. Please try again" }
  }
}

export const emptyCartThunk = () => async (dispatch) => {
  const response = await fetch('/api/cart/', {
    method: 'DELETE'
  });

  if(response.ok) {
    dispatch(setCart([]));
  } else {
    return { server: "Something went wrong. Please try again" }
  }
}

export const addCartItemThunk = (product) => async dispatch => {
  const response = await fetch('/api/cart/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(product)
  });

  if(response.ok) {
    const data = await response.json();
    dispatch(setCartProduct(data));
  } else {
    return { server: "Something went wrong. Please try again" }
  }
}

export const putCartItemThunk = (product) => async dispatch => {
  const response = await fetch("/api/cart/", {
    method: 'PUT',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product)
  });

  if(response.ok) {
    const data = await response.json();
    dispatch(setCartProduct(data));
  } else {
    return { server: "Something went wrong. Please try again" }
  }
}

export const deleteCartItemThunk = (productId) => async dispatch => {
  const response = await fetch(`/api/cart/${productId}`, { method: 'DELETE' });

  if(response.ok) {
    const data = await response.json();
    dispatch(deleteCartProduct(data.productId));
  } else {
    return { server: "Something went wrong. Please try again" }
  }
}

const initialState = { user: null, cart: null };

function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case REMOVE_USER:
      return { ...state, user: null };
    case SET_CART: {
      const normalCart = {}
      action.payload.forEach(product => normalCart[product.productId] = product)
      return { ...state, cart: normalCart };
    }
    case SET_CART_PRODUCT: {
      const newState = {user: {...state.user}, cart: {...state.cart}};
      newState.cart[action.payload.productId] = action.payload;
      return newState;
    }
    case DELETE_CART_PRODUCT: {
      const newState = {user: {...state.user}, cart: {...state.cart}};
      if (newState.cart[action.payload]) delete newState.cart[action.payload];
      return newState;
    }
    case REMOVE_CART:
      return { ...state, cart: null };
    default:
      return state;
  }
}

export default sessionReducer;
