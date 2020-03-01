import AuthActionTypes from "./auth.types";

export const loadUserStart = (token) => ({
    type: AuthActionTypes.LOAD_USER_START,
    payload: token
})

export const loadUserSuccess = (user) => ({
    type: AuthActionTypes.LOAD_USER_SUCCESS,
    payload: user
})

export const loadUserFail = (err) => ({
    type: AuthActionTypes.LOAD_USER_FAIL,
    payload: err
})

export const loadUserGoogleEmpty = () => ({
    type: AuthActionTypes.LOAD_USER_GOOGLE_EMPTY
})

export const googleSignInStart = () => ({
    type: AuthActionTypes.GOOGLE_SIGN_IN_START
})

export const googleSignInSuccess = (user) => ({
    type: AuthActionTypes.GOOGLE_SIGN_IN_SUCCESS,
    payload: user
})

export const registerStart = (authParams) => ({
    type: AuthActionTypes.REGISTER_START,
    payload: authParams
})

export const registerSuccess = (user) => ({
    type: AuthActionTypes.REGISTER_SUCCESS,
    payload: user
})

export const registerFail = (err) => ({
    type: AuthActionTypes.REGISTER_FAIL,
    payload: err
})

export const loginStart = (authParams) => ({
    type: AuthActionTypes.LOGIN_START,
    payload: authParams
})

export const loginSuccess = (user) => ({
    type: AuthActionTypes.LOGIN_SUCCESS,
    payload: user
})

export const loginFail = (err) => ({
    type: AuthActionTypes.LOGIN_FAIL,
    payload: err
})

export const logoutStart = (token) => ({
    type: AuthActionTypes.LOGOUT_START,
    payload: token
})

export const logoutSuccess = () => ({
    type: AuthActionTypes.LOGOUT_SUCCESS,
})

export const logoutFail = (err) => ({
    type: AuthActionTypes.LOGOUT_FAIL,
    payload: err
})