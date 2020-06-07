import { takeLatest, all, call, put } from 'redux-saga/effects'

import CourseActionTypes from "./course.types"
import * as CourseActions from './course.actions'
import * as CourseServices from '../../api/course.services'

export function* getCourseDetail({payload}) {
    try {
        let {data} = yield call(CourseServices.getCourseDetailAPI, payload)
        yield put(CourseActions.fetchCourseDetailSuccess(data.data))
    } catch (err) {
        yield put(CourseActions.fetchCourseDetailFail(err.response))
    }
}

export function* onGetCourseDetail() {
    yield takeLatest(CourseActionTypes.FETCH_COURSE_DETAIL_START, getCourseDetail)
}

export function* buyCourse({payload}) {
    try {
        let {data} = yield call(CourseServices.buyCourseAPI, payload)
        yield put(CourseActions.buyCourseSuccess())
    } catch (e) {
        yield put(CourseActions.buyCourseFail(e.response))
    }
}

export function* onBuyCourse() {
    yield takeLatest(CourseActionTypes.BUY_COURSE_START, buyCourse)
}

export function* courseSaga() {
    yield all([
        call(onGetCourseDetail),
        call(onBuyCourse)
    ])
}