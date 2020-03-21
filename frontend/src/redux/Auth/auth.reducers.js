import AuthActionTypes from "./auth.types";

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

        case AuthActionTypes.LOAD_USER_START:
            return {
                ...state,
                isLoadUserLoading: true
            }
        case AuthActionTypes.LOAD_USER_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                isLoadUserLoading: false,
                loadUserErrMessage: null
            }

        case AuthActionTypes.LOGIN_START:
        case AuthActionTypes.REGISTER_START:
        case AuthActionTypes.UPDATE_ACCOUNT_START:
            return {
                ...state,
                isLoading: true
            }

        case AuthActionTypes.REGISTER_SUCCESS:
        case AuthActionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                currentUser: action.payload.data.user,
                userToken: action.payload.data.token,
                isLoading: false,
                errMessage: null
            }
        case AuthActionTypes.UPDATE_ACCOUNT_SUCCESS:
            return {
                ...state,
                currentUser: action.payload.data,
                isLoading: false,
                errMessage: null
            }

        case AuthActionTypes.LOAD_USER_FAIL:
            return {
                ...state,
                loadUserErrMessage: action.payload,
                isLoadUserLoading: false
            }
        case AuthActionTypes.REGISTER_FAIL:
        case AuthActionTypes.LOGIN_FAIL:
        case AuthActionTypes.LOGOUT_FAIL:
        case AuthActionTypes.UPDATE_ACCOUNT_FAIL:
            return {
                ...state,
                errMessage: action.payload,
                isLoading: false
            }
        case AuthActionTypes.LOGOUT_SUCCESS:
            return {
                ...state,
                userToken: null,
                currentUser: null,
            }

        case AuthActionTypes.GOOGLE_SIGN_IN_SUCCESS:
            return {
                ...state,
                currentUser: action.payload
            }

        case AuthActionTypes.LOAD_USER_GOOGLE_EMPTY:
            return {
                ...state,
                isLoadUserLoading: false
            }



        default:
            return state
    }
}

export default authReducer