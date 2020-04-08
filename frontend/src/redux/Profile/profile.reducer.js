import ProfileActionTypes from "./profile.types";

const initState = {
    userProfile: {},
    isLoading: false,
    errorResponse: null,
    teacherList: null
}

const profileReducer = (state = initState, action) => {
    switch (action.type) {
        case ProfileActionTypes.GET_PROFILE_START:
        case ProfileActionTypes.UPDATE_PROFILE_START:
        case ProfileActionTypes.GET_LIST_TEACHER_START:
            return {
                ...state,
                isLoading: true,
            }
        case ProfileActionTypes.GET_PROFILE_SUCCESS:
        case ProfileActionTypes.UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                userProfile: action.payload,
                errorResponse: null
            }

        case ProfileActionTypes.GET_LIST_TEACHER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                teacherList: action.payload
            }
        case ProfileActionTypes.GET_PROFILE_FAIL:
        case ProfileActionTypes.UPDATE_PROFILE_FAIL:
        case ProfileActionTypes.GET_LIST_TEACHER_FAIL:
            return {
                ...state,
                isLoading: false,
                errorResponse: action.payload
            }
        case ProfileActionTypes.CLEAR_CURRENT_PROFILE:
            return {
                ...state,
                userProfile: {}
            }
        default:
            return state
    }
}

export default profileReducer