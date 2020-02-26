import { takeLatest, takeEvery, put, call, all } from 'redux-saga/effects';
import UserActionTypes from './user.types';
import * as UserAction from './user.actions'
import * as UserService from '../../api/user.services'


// load user saga
export function* loadUser({payload}) {
    try {
        let { data } = yield call(UserService.loadUserAPI, payload)
        yield put(UserAction.loadUserSuccess(data))
    } catch (err) {
        yield put(UserAction.loadUserFail(err.message))
    }
}

export function* onLoadUser() {
    yield takeEvery(UserActionTypes.LOAD_USER_START, loadUser)
}


// login saga
export function* login({ payload: { username, password } }) {
    try {
        let { data } = yield call(UserService.loginAPI, { username, password })
        localStorage.setItem('token', data.token)
        yield put(UserAction.loginSuccess(data))
    } catch (err) {
        yield put(UserAction.loginFail(err.message))
    }
}

export function* onLogin() {
    yield takeLatest(UserActionTypes.LOGIN_START, login);
}

export function* logout({payload}) {
    try {
        yield call(UserService.logoutAPI, payload)
        localStorage.removeItem('token')
        yield put(UserAction.logoutSuccess())
    } catch (err) {
        yield put(UserAction.logoutFail(err))
    }
}

export function* onLogout() {
    yield takeLatest(UserActionTypes.LOGOUT_START, logout)
}


export function* userSaga() {
    yield all([
        call(onLogin),
        call(onLoadUser),
        call(onLogout),
    ])
}
