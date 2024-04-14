const GET_ALL_REVIEWS = '/reviews'
const CREATE_NEW_REVIEW = '/reviews/new'
const UPDATE_REVIEW = '/reviews/update'
const DELETE_REVIEW = '/reviews/delete'
const GET_USER_REVIEWS = '/userReviews'

// ACTION TYPES
const getAllReviews = (reviews) => {
    return{
        type:GET_ALL_REVIEWS,
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

const deleteReview = (review) => {
    return {
        type: DELETE_REVIEW,
        review
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
    return data
}

// create new review
export const createReviewThunk = (productId, newReview) => async (dispatch) => {
    const response = await fetch(`/api/products/${parseInt(productId)}/reviews/new`, {
        method: 'POST',
        body: newReview
    })
    if(!response.ok){
        throw new Error ('Failed to create new review')
    }
    const data = await response.json()
    dispatch(createReview(data))
    return data
}

// update review by review id
export const updateReviewThunk = (reviewId, updatedReview) => async (dispatch) => {
    const response = await fetch (`/api/reviews/${parseInt(reviewId)}/edit`, {
        method: 'PUT',
        body: updatedReview
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
    const response = await fetch(`/api/reviews/${parseInt(reviewId)}/delete`, {
        method: 'DELETE'
    })
    if(!response.ok){
        throw new Error ('Failed to delete review')
    }
    const data = await response.json()
    dispatch(deleteReview(data))
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
            return{...state, ...action.reviews}
        }
        case CREATE_NEW_REVIEW: {
            return{...state, ...action.newReview}
        }
        case UPDATE_REVIEW: {
            return{...state, ...action.review}
        }
        case DELETE_REVIEW: {
            const deleteState = {...state}
            delete deleteState[action.review]
            return deleteState
        }
        case GET_USER_REVIEWS: {
            return{...state, ...action.reviews}
        }
        default:
            return state
    }
}

export default reviewReducer
