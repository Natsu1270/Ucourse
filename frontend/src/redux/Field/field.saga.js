import {takeLatest, takeEvery, call, put, all} from 'redux-saga/effects'

import FieldActionTypes from './field.types'
import * as FieldActions from './field.actions'
import {getFieldsAPI, getFieldDetailAPI} from '../../api/field.services'
import {onGetPopularSearchKeywords, onSimpleSearch} from "../Search/search.sagas";

export function* getFields() {
    try {
        let {data} = yield call(getFieldsAPI);
        yield put(FieldActions.getFieldSuccess(data.data))
    } catch (err) {
        yield put(FieldActions.getFieldFail(err.response))
    }
}

export function* onGetFields() {
    yield takeEvery(FieldActionTypes.GET_FIELD_START, getFields)
}

export function* getFieldDetail({payload}) {
    try {
        let {data} = yield call(getFieldDetailAPI, payload);
        yield put(FieldActions.getFieldDetailSuccess(data.data))
    } catch (err) {
        yield put(FieldActions.getFieldDetailFail(err.response))
    }
}

export function* onGetFieldDetail() {
    yield takeLatest(FieldActionTypes.GET_FIELD_DETAIL_START, getFieldDetail)
}

export function* fieldSaga() {
    yield all([
        call(onGetFields),
        call(onGetFieldDetail),
    ])
}