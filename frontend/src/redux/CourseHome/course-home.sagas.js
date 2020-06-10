import {takeLatest, put, call, all} from 'redux-saga/effects'

import CourseHomeTypes from "./course-home.types"
import * as CourseHomeActions from "./course-home.actions"
import * as CourseHomeServices from "../../api/courseHome.services"

export function* registerCourse({payload : {course_id, token, class_id}}) {
    try {
        let {data} = yield call(CourseHomeServices.registerCourseAPI, {course_id, token, class_id});
        yield put(CourseHomeActions.registerCourseSuccess())
    } catch (err) {
        yield put(CourseHomeActions.registerCourseFail(err.response))
    }
}

export function* onRegisterCourse() {
    yield takeLatest(CourseHomeTypes.REGISTER_COURSE_START, registerCourse)
}

export function* unRegisterCourse({payload : { token, class_id }}) {
    try {
        let {data} = yield call(CourseHomeServices.unRegisterCourseAPI, { token, class_id});
        yield put(CourseHomeActions.unRegisterCourseSuccess())
    } catch (err) {
        yield put(CourseHomeActions.unRegisterCourseFail(err.response))
    }
}

export function* onUnRegisterCourse() {
    yield takeLatest(CourseHomeTypes.UNREGISTER_COURSE_START, unRegisterCourse)
}

export function* fetchMyCourses({payload}) {
    try {
        let {data} = yield call(CourseHomeServices.fetchMyCourseHomesAPI, {token: payload});
        yield put(CourseHomeActions.fetchMyCoursesSuccess(data.data))
    } catch (err) {
        yield put(CourseHomeActions.fetchMyCoursesFail(err.response))
    }
}

export function* onFetchMyCourses() {
    yield takeLatest(CourseHomeTypes.FETCH_MY_COURSES_START, fetchMyCourses)
}


export function* getCourseHomeDetail({payload}) {
    try {
        let {data} = yield call(CourseHomeServices.getCourseHomeDetailAPI, payload);
        yield put(CourseHomeActions.getCourseHomeDetailSuccess(data.data))
    } catch (err) {
        yield put(CourseHomeActions.getCourseHomeDetailFail(err.response))
    }
}

export function* onGetCourseHomeDetail() {
    yield takeLatest(CourseHomeTypes.GET_COURSE_HOME_DETAIL_START, getCourseHomeDetail)
}


export default function* courseHomeSaga() {
    yield all([
        call(onRegisterCourse),
        call(onFetchMyCourses),
        call(onGetCourseHomeDetail),
        call(onUnRegisterCourse)
    ])
}

