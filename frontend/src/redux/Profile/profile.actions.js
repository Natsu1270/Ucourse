import ProfileActionTypes from "./profile.types";

export const getProfileStart = (token) => ({
    type: ProfileActionTypes.GET_PROFILE_START,
    payload: token
})

export const getProfileSuccess = (profile) => ({
    type: ProfileActionTypes.GET_PROFILE_SUCCESS,
    payload: profile
})

export const getProfileFail = (err) => ({
    type: ProfileActionTypes.GET_PROFILE_FAIL,
    payload: err
})

export const updateProfileStart = (params) => ({
    type: ProfileActionTypes.UPDATE_PROFILE_START,
    payload: params
})

export const updateProfileSuccess = (profile) => ({
    type: ProfileActionTypes.UPDATE_PROFILE_SUCCESS,
    payload: profile
})

export const updateProfileFail = (err) => ({
    type: ProfileActionTypes.UPDATE_PROFILE_FAIL,
    payload: err
})