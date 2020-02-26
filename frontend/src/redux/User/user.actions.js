import UserActionTypes from "./user.types";

export const loadUserStart = (token) => {
    return {
        type: UserActionTypes.LOAD_USER_START,
        payload: token
    }
}

export const loadUserSuccess = (user) => {
    return {
        type: UserActionTypes.LOAD_USER_SUCCESS,
        payload: user
    }
}

export const loadUserFail = (err) => {
    return {
        type: UserActionTypes.LOAD_USER_FAIL,
        payload: err
    }
}

export const loginStart = (authParams) => {
    return {
        type: UserActionTypes.LOGIN_START,
        payload: authParams
    }
}

export const loginSuccess = (user) => {
    return {
        type: UserActionTypes.LOGIN_SUCCESS,
        payload: user
    }
}

export const loginFail = (err) => {
    return {
        type: UserActionTypes.LOGIN_FAIL,
        payload: err
    }
}

export const logoutStart = (token) => {
    return {
        type: UserActionTypes.LOGOUT_START,
        payload: token
    }
}

export const logoutSuccess = () => {
    return {
        type: UserActionTypes.LOGOUT_SUCCESS,
    }
}

export const logoutFail = (err) => {
    return {
        type: UserActionTypes.LOGOUT_FAIL,
        payload: err
    }
}