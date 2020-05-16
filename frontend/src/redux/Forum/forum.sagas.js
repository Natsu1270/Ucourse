import {takeLatest, takeEvery, call, put, all} from 'redux-saga/effects'

import ForumTypes from './forum.types'
import * as ForumActions from './forum.actions'
import * as ForumServices from '../../api/forum.services'


export function* getForums({payload: {token, course_home_id}}) {
    try {
        let { data } = yield call(ForumServices.getForumsAPI, {token, course_home_id})
        yield put(ForumActions.getForumsSuccess(data.data))
    } catch (err) {
        yield put(ForumActions.getForumsFail(err.response))
    }
}

export function* onGetForums() {
    yield takeLatest(ForumTypes.GET_FORUMS_START, getForums)
}

export function* getForumDetail({ payload: { token, forum_id } }) {
    try {
        let { data } = yield call(ForumServices.getForumDetailAPI, { token, forum_id })
        yield put(ForumActions.getForumDetailSuccess(data.data))
    } catch (err) {
        yield put(ForumActions.getForumDetailFail(err.response))
    }
}

export function* onGetForumDetail() {
    yield takeLatest(ForumTypes.GET_FORUM_DETAIL_START, getForumDetail)
}

export function* getThreads({payload: {token, forum_id}}) {
    try {
        let {data} = yield call(ForumServices.getThreadsAPI, {token, forum_id})
        yield put(ForumActions.getThreadsSuccess(data.data))
    } catch (e) {
        yield put(ForumActions.getThreadsFail(e.response))
    }
}

export function* onGetThreads() {
    yield takeLatest(ForumTypes.GET_THREADS_START, getThreads)
}

export function* getThreadDetail({ payload: { token, thread_id } }) {
    try {
        let { data } = yield call(ForumServices.getThreadDetailAPI, { token, thread_id })
        yield put(ForumActions.getThreadDetailSuccess(data.data))
    } catch (err) {
        yield put(ForumActions.getThreadDetailFail(err.response))
    }
}

export function* onGetThreadDetail() {
    yield takeLatest(ForumTypes.GET_THREAD_DETAIL_START, getThreadDetail)
}

export function* createThread({payload}) {
     try {
        let { data } = yield call(ForumServices.createThreadAPI, payload)
        yield put(ForumActions.createThreadsSuccess())
    } catch (err) {
        yield put(ForumActions.createThreadsFail(err.response))
    }
}

export function* onCreateThread() {
    yield takeLatest(ForumTypes.CREATE_THREADS_START, createThread)
}

export default function* forumSaga() {
    yield all([
        call(onGetForums),
        call(onGetForumDetail),
        call(onGetThreads),
        call(onGetThreadDetail),
        call(onCreateThread)
    ])
}