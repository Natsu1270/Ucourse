import HomeActionTypes from "./home.types";

const initState = {
    coursesAndPrograms: null,
    isGetting: false,
    errorResponse: null,
    myCoursesAndPrograms: null
};

const homeReducer = (state = initState, action) => {
    switch (action.type) {
        case HomeActionTypes.GET_ALL_START:
        case HomeActionTypes.GET_ALL_MY_START:
            return { ...state, isGetting: true }

        case HomeActionTypes.GET_ALL_SUCCESS:
            return { ...state, isGetting: false, coursesAndPrograms: action.payload }

        case HomeActionTypes.GET_ALL_MY_SUCCESS:
            return { ...state, isGetting: false, myCoursesAndPrograms: action.payload }

        case HomeActionTypes.GET_ALL_FAIL:
        case HomeActionTypes.GET_ALL_MY_FAIL:
            return { ...state, isGetting: false, errorResponse: action.payload }

        default:
            return state
    }
};

export default homeReducer;