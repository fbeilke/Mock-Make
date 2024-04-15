const GET_ALL_USERS = '/getUsers'

// ACTION TYPE
const getAllUsers = (users) => {
    return {
        type: GET_ALL_USERS,
        users
    }
}

// THUNKS

// get all users thunk
export const getAllUsersThunk = () => async (dispatch) => {
    const response = await fetch(`/api/users/`)
    if(!response.ok){
        throw new Error ('Failed to get all users.')
    }
    const data = await response.json()
    dispatch(getAllUsers(data))
}

// REDUCER
function userReducer(state={}, action){
    switch(action.type){
        case GET_ALL_USERS: {
            return {...state, users: action.users}
        }
        default:
            return state
    }
}

export default userReducer
