import { takeLatest, takeEvery, put, call, all } from 'redux-saga/effects';
import AuthActionTypes from './auth.types';
import ProfileActionTypes from "../Profile/profile.types";
import { getProfileSuccess, clearCurrentProfile } from '../Profile/profile.actions'
import * as AuthAction from './auth.actions'
import * as AuthService from '../../api/auth.services'
import {
    auth,
    googleProvider,
    getCurrentUser
} from '../../firebase/firebase.utils';

// load user saga
export function* loadUser({ payload }) {
    try {
        if (payload) {
            let { data } = yield call(AuthService.loadUserAPI, payload)
            yield put(AuthAction.loadUserSuccess(data.data))
        } else {
            const userAuth = yield getCurrentUser()
            userAuth ?
                yield put(AuthAction.loadUserSuccess(userAuth)) :
                yield put(AuthAction.loadUserGoogleEmpty())
        }
    } catch (err) {
        yield put(AuthAction.loadUserFail(err.message))
    }
}

export function* onLoadUser() {
    yield takeEvery(AuthActionTypes.LOAD_USER_START, loadUser)
}


export function* register({ payload: { username, email, password } }) {
    try {
        let { data } = yield call(AuthService.registerAPI, { username, email, password })
        localStorage.setItem('token', data.data.token)
        yield put(AuthAction.registerSuccess(data))
    } catch (err) {
        yield put(AuthAction.registerFail(err.response))
    }
}

export function* onRegister() {
    yield takeLatest(AuthActionTypes.REGISTER_START, register)
}


// login saga
export function* login({ payload: { username, password } }) {
    try {
        let { data } = yield call(AuthService.loginAPI, { username, password })
        localStorage.setItem('token', data.data.token)
        yield put(AuthAction.loginSuccess(data))
    } catch (err) {
        yield put(AuthAction.loginFail(err.response))
    }
}

export function* onLogin() {
    yield takeLatest(AuthActionTypes.LOGIN_START, login);
}


// logout
export function* logout({ payload }) {
    try {
        if (payload) {
            yield call(AuthService.logoutAPI, payload)
            localStorage.clear()
        } else {
            yield auth.signOut()
        }
        yield put(AuthAction.logoutSuccess())
    } catch (err) {
        yield put(AuthAction.logoutFail(err.response))
    }
}

export function* onLogout() {
    yield takeLatest(AuthActionTypes.LOGOUT_START, logout)
}

export function* signInWithGoogle() {
    try {
        const { user } = yield auth.signInWithPopup(googleProvider)
        const { uid, displayName, photoURL, email, phoneNumber } = user
        const username = displayName
        const { data } = yield call(AuthService.handleSocialLoginAPI, {
            uid,
            username,
            email
        })

        yield put(AuthAction.loginSuccess(data))
    } catch (err) {
        yield put(AuthAction.loginFail(err.response))
    }
}

export function* onSignInWithGoogle() {
    yield takeLatest(AuthActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

// Update account

export function* updateAccount({ payload: { token, username, email, old_password, password } }) {
    try {
        let { data } = yield call(AuthService.updateAccountAPI, { token, username, email, old_password, password })
        yield put(AuthAction.updateAccountSuccess(data))
    } catch (err) {
        yield put(AuthAction.updateAccountFail(err.response))
    }
}

export function* onUpdateAccount() {
    yield takeLatest(AuthActionTypes.UPDATE_ACCOUNT_START, updateAccount)
}

export function* authSaga() {
    yield all([
        call(onLogin),
        call(onLoadUser),
        call(onLogout),
        call(onRegister),
        call(onSignInWithGoogle),
        call(onUpdateAccount),
    ])
}
