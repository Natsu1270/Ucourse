import CourseActionTypes from './course.types'

const initState = {
    courses: {},
    isFetching: false,
    errResponse: null,
    courseDetail: null,
};

const courseReducer = (state = initState, action) => {
    switch (action.type) {
        case CourseActionTypes.FETCH_COURSES_START:
        case CourseActionTypes.FETCH_COURSE_DETAIL_START:
            return {
                ...state,
                isFetching: true
            };
        case CourseActionTypes.FETCH_COURSES_SUCCESS:
            return {
                ...state,
                isFetching: false,
                courses: action.payload
            };
        case CourseActionTypes.FETCH_COURSE_DETAIL_SUCCESS:
            return {
                ...state,
                isFetching: false,
                courseDetail: action.payload
            };
        case CourseActionTypes.FETCH_COURSES_FAIL:
        case CourseActionTypes.FETCH_COURSE_DETAIL_FAIL:
            return {
                ...state,
                isFetching: false,
                errResponse: action.payload
            };

        default:
            return state
    }
};

export default courseReducer