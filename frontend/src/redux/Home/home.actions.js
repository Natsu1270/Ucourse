import HomeActionType from "./home.types";

export const getAllStart = () => ({
    type: HomeActionType.GET_ALL_START,
});

export const getAllSuccess = (results) => ({
    type: HomeActionType.GET_ALL_SUCCESS,
    payload: results
});

export const getAllFail = (err) => ({
    type: HomeActionType.GET_ALL_FAIL,
    payload: err
});