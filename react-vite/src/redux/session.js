import { getAllUsersThunk } from "./users";

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';
const SET_CART = 'session/setCart';
const SET_CART_PRODUCT = 'session/setCartProduct';
const DELETE_CART_PRODUCT = 'session/deleteCartProduct';
const REMOVE_CART = 'session/removeCart';
const SET_WISHLIST = 'session/SET_WISHLIST';
const ADD_TO_WISHLIST = 'session/ADD_TO_WISHLIST';
const REMOVE_FROM_WISHLIST = 'session/REMOVE_FROM_WISHLIST';

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

const setWishlist = (items) => ({
  type: SET_WISHLIST,
  payload: items,
});

const addToWishlist = (item) => ({
  type: ADD_TO_WISHLIST,
  payload: item,
});

const removeFromWishlist = (itemId) => ({
  type: REMOVE_FROM_WISHLIST,
  payload: itemId,
});





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
    dispatch(getAllUsersThunk());
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

// Fetch the user's wishlist
export const fetchWishlist = (userId) => async (dispatch) => {
      const response = await fetch(`/api/users/${userId}/wishlist`);
      if (response.ok) {
          const data = await response.json();
          dispatch(setWishlist(data));
      } else {
          throw new Error('Unable to fetch wishlist');
      }
};

// Add an item to the wishlist
export const addItemToWishlist = (productId) => async (dispatch) => {

  try {
  const response = await fetch(`/api/users/wishlist/`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ productId }),
      });
      if (response.ok) {
          const newItem = await response.json();
          dispatch(addToWishlist(newItem));
      } else if (response.status === 409) {
        // Handle the conflict, perhaps by setting an error state or alerting the user
        alert('This item is already in your wishlist.');
      } else {
        // Handle other potential errors
        throw new Error('Unable to add item to wishlist');
      }
    } catch (error) {
      console.error('Wishlist error:', error);
    }
  };



// Remove an item from the wishlist
export const removeItemFromWishlist = (productId) => async (dispatch) => {
      const response = await fetch(`/api/users/wishlist/${productId}`, {
          method: 'DELETE',
      });

      if (response.ok) {
          dispatch(removeFromWishlist(productId));
      } else {
          throw new Error('Unable to remove item from wishlist');
      }

};


const initialState = { user: null, cart: {}, wishlist: {}};

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
      const newState = { ...state, cart: {...state.cart} };
      newState.cart[action.payload.productId] = action.payload;
      return newState;
    }
    case DELETE_CART_PRODUCT: {
      const newCart = { ...state.cart };
      if (newCart[action.payload]) delete newCart[action.payload];
      return { ...state, cart: newCart };
    }
    case REMOVE_CART:
      return { ...state, cart: null };

    case SET_WISHLIST:
      return {...state, wishlist: action.payload}
    case ADD_TO_WISHLIST: {
      const newState = {...state}
      newState.wishlist[action.payload.productId] = action.payload
      return newState
    }
    case REMOVE_FROM_WISHLIST: {
      const newState = {...state}
      delete newState.wishlist[action.payload]
      return newState
    }
    default:
      return state;

  }

}

export default sessionReducer;
