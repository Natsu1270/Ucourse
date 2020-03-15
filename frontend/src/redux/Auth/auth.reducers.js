import UserActionTypes from "./auth.types";

const initState = {
    userToken: localStorage.getItem('token'),
    currentUser: null,
    loadUserErrMessage: null,
    isLoadUserLoading: false,
    errMessage: null,
    isLoading: false,
}


const authReducer = (state = initState, action) => {
    switch (action.type) {

        case UserActionTypes.LOAD_USER_START:
            return {
                ...state,
                isLoadUserLoading: true
            }
        case UserActionTypes.LOAD_USER_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                isLoadUserLoading: false,
                loadUserErrMessage: null
            }

        case UserActionTypes.LOGIN_START:
        case UserActionTypes.REGISTER_START:
            return {
                ...state,
                isLoading: true
            }

        case UserActionTypes.REGISTER_SUCCESS:
        case UserActionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                currentUser: action.payload.data.user,
                userToken: action.payload.data.token,
                isLoading: false,
                errMessage: null
            }

        case UserActionTypes.LOAD_USER_FAIL:
            return {
                ...state,
                loadUserErrMessage: action.payload,
                isLoadUserLoading: false
            }
        case UserActionTypes.REGISTER_FAIL:
        case UserActionTypes.LOGIN_FAIL:
        case UserActionTypes.LOGOUT_FAIL:
            return {
                ...state,
                errMessage: action.payload,
                isLoading: false
            }
        case UserActionTypes.LOGOUT_SUCCESS:
            return {
                ...state,
                userToken: null,
                currentUser: null,
            }

        case UserActionTypes.GOOGLE_SIGN_IN_SUCCESS:
            return {
                ...state,
                currentUser: action.payload
            }

        case UserActionTypes.LOAD_USER_GOOGLE_EMPTY:
            return {
                ...state,
                isLoadUserLoading: false
            }
        default:
            return state
    }
}

export default authReducer