// // Action Types
// const SET_WISHLIST_ITEMS = 'wishlist/SET_WISHLIST_ITEMS';
// const ADD_TO_WISHLIST = 'wishlist/ADD_TO_WISHLIST';
// const REMOVE_FROM_WISHLIST = 'wishlist/REMOVE_FROM_WISHLIST';
// const WISHLIST_ERROR = 'wishlist/WISHLIST_ERROR';

// // Action Creators
// const setWishlistItems = (wishlists) => ({
//     type: SET_WISHLIST_ITEMS,
//     payload: wishlists
// });

// const addToWishlist = (wishlistItem) => ({
//     type: ADD_TO_WISHLIST,
//     payload: wishlistItem
// });

// const removeFromWishlist = (productId) => ({
//     type: REMOVE_FROM_WISHLIST,
//     payload: productId
// });

// const wishlistError = (error) => ({
//     type: WISHLIST_ERROR,
//     payload: error
// });

// // Thunk Actions
// export const getUserWishlistsThunk = (userId) => async dispatch => {
//     try {
//         const response = await fetch(`/api/users/${userId}/wishlist`);
//         console.log(response)

//         if(response.ok) {
//             const data = await response.json();
//             dispatch(setWishlistItems(data));
//         } else {
//             throw new Error('Failed to fetch wishlist');
//         }
//     } catch (error) {
//         dispatch(wishlistError(error.toString()));
//     }
// };

// export const addWishlistItemThunk = (userId, productId) => async dispatch => {
//     try {
//         const response = await fetch(`/api/users/${userId}/wishlist/${productId}`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },

//         });

//         if(response.ok) {
//             const data = await response.json();
//             dispatch(addToWishlist(data));
//         } else {
//             throw new Error('Failed to add item to wishlist');
//         }
//     } catch (error) {
//         dispatch(wishlistError(error.toString()));
//     }
// };

// export const removeWishlistItemThunk = (userId, productId) => async dispatch => {
//     try {
//         const response = await fetch(`/api/users/${userId}/wishlist/${productId}`, {
//             method: 'DELETE',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             // Include credentials if necessary
//         });

//         if(response.ok) {
//             dispatch(removeFromWishlist(productId));
//         } else {
//             throw new Error('Failed to remove item from wishlist');
//         }
//     } catch (error) {
//         dispatch(wishlistError(error.toString()));
//     }
// };

// // Wishlist Reducer
// const initialState = {
//     items: {},
//     error: null
// };

// const wishlistReducer = (state = initialState, action) => {
//     switch(action.type) {
//         case SET_WISHLIST_ITEMS:
//             return {
//                 ...state, ...action.payload
//             };
//         case ADD_TO_WISHLIST:
//             return {
//                 ...state,
//             };
//         case REMOVE_FROM_WISHLIST:
//             return {
//                 ...state,
//                 items: state.items.filter(id => id !== action.payload)
//             };
//         case WISHLIST_ERROR:
//             return {
//                 ...state,
//                 error: action.payload
//             };
//         default:
//             return state;
//     }
// };

// export default wishlistReducer;
