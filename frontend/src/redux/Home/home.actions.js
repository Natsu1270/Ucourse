import HomeActionType from "./home.types";

export const getAllStart = (payload) => ({
    type: HomeActionType.GET_ALL_START,
    payload: payload
});

export const getAllSuccess = (results) => ({
    type: HomeActionType.GET_ALL_SUCCESS,
    payload: results
});

export const getAllFail = (err) => ({
    type: HomeActionType.GET_ALL_FAIL,
    payload: err
});

export const getAllMyStart = (token) => ({
    type: HomeActionType.GET_ALL_MY_START,
    payload: token
});

export const getAllMySuccess = (results) => ({
    type: HomeActionType.GET_ALL_MY_SUCCESS,
    payload: results
});

export const getAllMyFail = (err) => ({
    type: HomeActionType.GET_ALL_MY_FAIL,
    payload: err
});