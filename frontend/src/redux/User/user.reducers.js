import UserActionTypes from "./user.types";

const initState = {
    token: localStorage.getItem('token'),
    currentUser: null,
    errorMessage: null,
    isLoading: false,
}


const userReducer = (state=initState, action)=> {
    switch (action.type) {
        case UserActionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                currentUser: action.payload
            }
        case UserActionTypes.LOGIN_FAIL:
            return {
                ...state,
                errorMessage: action.payload
            }
        default:
            return state
    }
}

export default userReducer