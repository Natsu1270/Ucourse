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

export function* buyCourseSuccess({payload}) {
    try {
        if (payload.course) {
            const status = yield call(CourseServices.buyCourseSuccessAPI, payload)
            // yield put(CourseActions.buyCourseSuccess())
            window.open(status.data.data.redirect, "_self");
        }
    } catch (e) {
        yield put(CourseActions.buyCourseFail(e.response))
    }
}

export function* buyCourse({payload}) {
    try {
        let {data} = yield call(CourseServices.buyCourseAPI, payload)
        if (data.data.payUrl) {
            window.open(data.data.payUrl, "_self")
        }
        else {
            yield put(CourseActions.buyCourseSuccess())
        }
    } catch (e) {
        yield put(CourseActions.buyCourseFail(e.response))
    }
}

export function* onBuyCourse() {
    yield takeLatest(CourseActionTypes.BUY_COURSE_START, buyCourse)
}

export function* onBuyCourseFinish() {
    yield takeLatest(CourseActionTypes.BUY_COURSE_FINISH, buyCourseSuccess)
}

export function* courseSaga() {
    yield all([
        call(onGetCourseDetail),
        call(onBuyCourse),
        call(onBuyCourseFinish)
    ])
}