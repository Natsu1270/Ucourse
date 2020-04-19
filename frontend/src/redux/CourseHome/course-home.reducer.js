import CourseHomeTypes from "./course-home.types";

const initState = {
    isLoading: false,
    errorResponse: null,
    myCourseHomes: null
};

const courseHomeReducer = (state=initState, action) => {
    switch (action.type) {
        case CourseHomeTypes.REGISTER_COURSE_START:
        case CourseHomeTypes.FETCH_MY_COURSES_START:
            return {...state, isLoading: true};

        case CourseHomeTypes.REGISTER_COURSE_SUCCESS:
            return {...state, isLoading: false};

        case CourseHomeTypes.FETCH_MY_COURSES_SUCCESS:
            return {...state, isLoading: false, myCourseHomes: action.payload};

        case CourseHomeTypes.REGISTER_COURSE_FAIL:
        case CourseHomeTypes.FETCH_MY_COURSES_FAIL:
            return {...state, isLoading: false, errorResponse: action.payload};

        default:
            return state
    }
};

export default courseHomeReducer