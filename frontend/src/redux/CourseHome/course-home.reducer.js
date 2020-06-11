import CourseHomeTypes from "./course-home.types";

const initState = {
    isLoading: false,
    errorResponse: null,
    myCourseHomes: null,
    courseHomeDetail: null,
    courseHomeShows: null,
};

const courseHomeReducer = (state=initState, action) => {
    switch (action.type) {
        case CourseHomeTypes.REGISTER_COURSE_START:
        case CourseHomeTypes.FETCH_MY_COURSES_START:
        case CourseHomeTypes.GET_COURSE_HOME_DETAIL_START:
        case CourseHomeTypes.UNREGISTER_COURSE_START:
        case CourseHomeTypes.GET_COURSE_HOME_SHOW_START:
            return {...state, isLoading: true};

        case CourseHomeTypes.REGISTER_COURSE_SUCCESS:
        case CourseHomeTypes.UNREGISTER_COURSE_SUCCESS:
            return {...state, isLoading: false};

        case CourseHomeTypes.FETCH_MY_COURSES_SUCCESS:
            return {...state, isLoading: false, myCourseHomes: action.payload};

        case CourseHomeTypes.GET_COURSE_HOME_DETAIL_SUCCESS:
            return {...state, isLoading: false, courseHomeDetail: action.payload}

        case CourseHomeTypes.GET_COURSE_HOME_SHOW_SUCCESS:
            return {...state, isLoading: false, courseHomeShows: action.payload}

        case CourseHomeTypes.REGISTER_COURSE_FAIL:
        case CourseHomeTypes.FETCH_MY_COURSES_FAIL:
        case CourseHomeTypes.GET_COURSE_HOME_DETAIL_FAIL:
        case CourseHomeTypes.UNREGISTER_COURSE_FAIL:
        case CourseHomeTypes.GET_COURSE_HOME_SHOW_FAIL:
            return {...state, isLoading: false, errorResponse: action.payload};

        default:
            return state
    }
};

export default courseHomeReducer