import { takeLatest, takeEvery, put, call, all } from 'redux-saga/effects';
import ProfileActionTypes from './profile.types';
import * as ProfileActions from './profile.actions'
import * as ProfileServices from '../../api/profile.services'



export function* getProfile({ payload }) {
    try {
        let { data } = yield call(ProfileServices.getProfileAPI, payload)
        yield put(ProfileActions.getProfileSuccess(data.data))
    } catch (err) {
        yield put(ProfileActions.getProfileFail(err.response))
    }
}

export function* onGetProfile() {
    yield takeLatest(ProfileActionTypes.GET_PROFILE_START, getProfile)
}

export function* updateProfile({ payload }) {
    try {
        let {data} = yield call(ProfileServices.updateProfileAPI, payload)
        yield put(ProfileActions.updateProfileSuccess(data.data))
    } catch(err) {
        yield put(ProfileActions.updateProfileFail(err.response))
    }
}

export function* onUpdateProfile() {
    yield takeLatest(ProfileActionTypes.UPDATE_PROFILE_START, updateProfile)
}

export function* getListTeacher() {
    try {
        let {data} = yield call(ProfileServices.getListTeacherAPI)
        yield put(ProfileActions.getListTeacherSuccess(data.data))
    } catch (err) {
        yield put(ProfileActions.getListTeacherFail(err.response))
    }
}

export function* onGetListTeacher() {
    yield takeLatest(ProfileActionTypes.GET_LIST_TEACHER_START, getListTeacher)
}

export function* profileSaga() {
    yield all([
        call(onGetProfile),
        call(onUpdateProfile),
        call(onGetListTeacher),
    ])
}