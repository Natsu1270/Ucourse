import { takeLatest, put, call ,all } from 'redux-saga/effects';
import axios from 'axios'

import UserActionTypes from './user.types';
import * as UserAction from './user.actions'
import {API_URL} from '../../configs'

const USER_API_URL = `${API_URL}auth/`
const LOGIN_API_URL = `${USER_API_URL}login`

function loginAPI(authParams) {
    return axios.request({
        headers: {'Content-Type': 'application/json'},
        method: 'POST',
        url: LOGIN_API_URL,
        data: authParams
    })
}

export function* login({payload: {email, password}}) {
    try {
        let {data} = yield call(loginAPI,{email, password})
        yield put(UserAction.loginSuccess(data))
    } catch (err) {
        yield put(UserAction.loginFail(err.message))
    }
}

export function* onLogin() {
    yield takeLatest(UserActionTypes.LOGIN_START, login);
}


export function* userSaga() {
    yield all([
        call(onLogin)
    ])
}
