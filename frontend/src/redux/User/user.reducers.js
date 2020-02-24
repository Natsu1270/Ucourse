import UserActionTypes from "./user.types";

const initState = {
    userToken: localStorage.getItem('token'),
    currentUser: null,
    errorMessage: null,
    isLoading: false,
}


const userReducer = (state=initState, action)=> {
    switch (action.type) {
        case UserActionTypes.LOAD_USER_SUCCESS:
        case UserActionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                currentUser: action.payload
            }
        case UserActionTypes.LOAD_USER_FAIL:
        case UserActionTypes.LOGIN_FAIL:
        case UserActionTypes.LOGOUT_FAIL:
            return {
                ...state,
                errorMessage: action.payload
            }
        case UserActionTypes.LOGOUT_SUCCESS:
            return {
                ...state,
                userToken: null,
                currentUser: null
            }

        default:
            return state
    }
}

export default userReducer