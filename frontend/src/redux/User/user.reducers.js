import UserActionTypes from "./user.types";

const initState = {
    userToken: localStorage.getItem('token'),
    currentUser: null,
    errorMessage: null,
    isLoading: false,
}


const userReducer = (state = initState, action) => {
    switch (action.type) {
        case UserActionTypes.LOAD_USER_START:
        case UserActionTypes.LOGIN_START:
            return {
                ...state,
                isLoading: true
            }
        case UserActionTypes.LOAD_USER_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                isLoading: false
            }
        case UserActionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                currentUser: action.payload.user,
                userToken: action.payload.token,
                isLoading: false
            }
        case UserActionTypes.LOAD_USER_FAIL:
        case UserActionTypes.LOGIN_FAIL:
        case UserActionTypes.LOGOUT_FAIL:
            return {
                ...state,
                errorMessage: action.payload,
                isLoading: false
            }
        case UserActionTypes.LOGOUT_SUCCESS:
            return {
                ...state,
                userToken: null,
                currentUser: null,
                isLoading: false
            }

        default:
            return state
    }
}

export default userReducer