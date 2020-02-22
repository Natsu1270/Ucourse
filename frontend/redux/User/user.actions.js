import UserActionTypes from "./user.types";

export const loginStart = () => {
    return {
        type: UserActionTypes.LOGIN_START
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

export const logoutStart = () => {
    return {
        type: UserActionTypes.LOGOUT_START
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