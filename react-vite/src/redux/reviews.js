const ALL_REVIEWS = 'ALL_REVIEWS';
const GET_ALL_REVIEWS_PRODUCT = 'GET_ALL_REVIEWS_PRODUCT';
const CREATE_NEW_REVIEW = 'CREATE_NEW_REVIEW';
const UPDATE_REVIEW = 'UPDATE_REVIEW';
const DELETE_REVIEW = 'DELETE_REVIEW';
const GET_USER_REVIEWS = 'GET_USER_REVIEWS';

// ACTION TYPES
const allReviews = (reviews) => {
    return{
        type: ALL_REVIEWS,
        reviews
    }
}

const getAllReviewsProduct = (reviews) => {
    return{
        type: GET_ALL_REVIEWS_PRODUCT,
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
export const getAllReviews = () => async (dispatch) => {
    const response = await fetch('/api/reviews')
    if (!response.ok) {
        throw new Error("Failed to get reviews")
    }
    const data = await response.json()
    dispatch(allReviews(data))
}


export const reviewsByProduct = (productId) => async (dispatch) => {
    const response = await fetch(`/api/products/${productId}/reviews`)
    if(!response.ok){
        throw new Error ('Failed to get reviews')
    }
    const data = await response.json()
    dispatch(getAllReviewsProduct(data))
}

// create new review
export const createReviewThunk = (productId, reviewFormData) => async (dispatch) => {
    const response = await fetch(`/api/products/${productId}/reviews`, {
        method: 'POST',
        body: reviewFormData,
    });

    if(!response.ok){
        const data = await response.json();
        throw new Error ('Failed to create new review. Server responded with:' + data);
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
        method: 'DELETE'
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
        case GET_ALL_REVIEWS_PRODUCT:{
            return{...state, reviews: action.reviews}
        }
        case CREATE_NEW_REVIEW: {
            const newState = {...state}
            newState.reviews[action.newReview.id] = action.newReview
            return newState
        }
        case UPDATE_REVIEW: {
            const newState = {...state}
            newState.reviews[action.review.id] = action.review
            return newState
        }
        case DELETE_REVIEW: {
            const newState = {...state}
            delete newState.reviews[action.reviewId]
            return newState
        }
        case GET_USER_REVIEWS: {
            return{...state, ...action.reviews}
        }
        case ALL_REVIEWS: {
            return {...state, reviews: action.reviews}
        }
        default:
            return state
    }
}

export default reviewReducer
