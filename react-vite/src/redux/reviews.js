const GET_ALL_REVIEWS = 'GET_ALL_REVIEWS';
const CREATE_NEW_REVIEW = 'CREATE_NEW_REVIEW';
const UPDATE_REVIEW = 'UPDATE_REVIEW';
const DELETE_REVIEW = 'DELETE_REVIEW';
const GET_USER_REVIEWS = 'GET_USER_REVIEWS';

// ACTION TYPES
const getAllReviews = (reviews) => {
    return{
        type: GET_ALL_REVIEWS,
        reviews
    }
}
const createReview = (newReview) => {
    return{
        type: CREATE_NEW_REVIEW,
        newReview
    }
}

const updateReview = (review) => {
    return {
        type: UPDATE_REVIEW,
        review
    }
}

const deleteReview = (reviewId) => {
    return {
        type: DELETE_REVIEW,
        reviewId
    }
}
const getUserReviews = (reviews) => {
    return{
        type: GET_USER_REVIEWS,
        reviews
    }
}

// THUNKS
// get all reviews by product Id
export const reviewsByProduct = (productId) => async (dispatch) => {
    const response = await fetch(`/api/products/${productId}/reviews`)
    if(!response.ok){
        throw new Error ('Failed to get reviews')
    }
    const data = await response.json()
    dispatch(getAllReviews(data))
}

// create new review
export const createReviewThunk = (productId, newReview) => async (dispatch) => {
    const response = await fetch(`/api/products/${productId}/reviews`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newReview),
    });
    if(!response.ok){
        throw new Error ('Failed to create new review')
    }
    const data = await response.json()
    dispatch(createReview(data))
    return data
}

// update review by review id
export const updateReviewThunk = (reviewId, updatedReview) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${reviewId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedReview),
    })
    if(!response.ok){
        throw new Error('Failed to update review')
    }
    const data = await response.json()
    dispatch(updateReview(data))
    return data
}

// delete review by review id
export const deleteReviewThunk = (reviewId) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if(!response.ok){
        throw new Error ('Failed to delete review')
    }
    // const data = await response.json()
    dispatch(deleteReview(reviewId))
}

export const getUserReviewsThunk = () => async (dispatch) => {
    const response = await fetch (`/api/reviews/current`)
    if(!response.ok){
        throw new Error('Failed to get current user reviews.')
    }
    const data = await response.json()
    dispatch(getUserReviews(data))
    return data
}


// REDUCER
function reviewReducer(state = {}, action){
    switch(action.type){
        case GET_ALL_REVIEWS:{
            return{...state, reviews: action.reviews}
        }
        case CREATE_NEW_REVIEW: {
            return{...state, reviews: [...state.reviews, action.newReview]}
        }
        case UPDATE_REVIEW: {
            return {...state,
            reviews: state.reviews.map(review =>
                review.id === action.payload.id ? action.reviews : review
            )
        }}
        case DELETE_REVIEW: {
            return {
                ...state,
                reviews: state.reviews.filter(review => review.id !== action.reviewId)
            }
        }
        case GET_USER_REVIEWS: {
            return{...state, ...action.reviews}
        }
        default:
            return state
    }
}

export default reviewReducer
