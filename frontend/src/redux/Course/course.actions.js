import CourseActionTypes from './course.types'

export const fetchCourseStart = () => ({
    type: CourseActionTypes.FETCH_COURSES_START
});

export const fetchCourseSuccess = (courses) => ({
    type: CourseActionTypes.FETCH_COURSES_SUCCESS,
    payload: courses
});

export const fetchCourseFail = (err) => ({
    type: CourseActionTypes.FETCH_COURSES_FAIL,
    payload: err.response
});

export const searchCourseStart = (keyword) => ({
    type: CourseActionTypes.SEARCH_COURSE_START,
    payload: keyword
});

export const searchCourseSuccess = (courses) => ({
    type: CourseActionTypes.SEARCH_COURSE_SUCCESS,
    payload: courses
});

export const searchCourseFail = (err) => ({
    type: CourseActionTypes.SEARCH_COURSE_FAIL,
    payload: err.response
});

export const fetchCourseDetailStart = (slug) => ({
    type: CourseActionTypes.FETCH_COURSE_DETAIL_START,
    payload: slug
});

export const fetchCourseDetailSuccess = (course) => ({
    type: CourseActionTypes.FETCH_COURSE_DETAIL_SUCCESS,
    payload: course
});

export const fetchCourseDetailFail = (err) => ({
    type: CourseActionTypes.FETCH_COURSE_DETAIL_FAIL,
    payload: err
});

export const buyCourseStart = (params) => ({
    type: CourseActionTypes.BUY_COURSE_START,
    payload: params
})

export const buyCourseSuccess = () => ({
    type: CourseActionTypes.BUY_COURSE_SUCCESS
})

export const buyCourseFail = (err) => ({
    type: CourseActionTypes.BUY_COURSE_FAIL,
    payload: err
})