import { takeLatest, takeEvery, put, call, all } from 'redux-saga/effects';

import SearchActionTypes from "./search.types"
import * as SearchActions from './search.actions'
import * as SearchService from '../../api/search.services'

export function* simpleSearch({payload}) {
    try {
        let {data} = yield call(SearchService.simpleSearch, payload)
        yield put(SearchActions.simpleSearchSuccess(data))
    } catch (err) {
        yield put(SearchActions.simpleSearchFail(err.response))
    }
}

export function* onSimpleSearch() {
    yield takeLatest(SearchActionTypes.SIMPLE_SEARCH_START, simpleSearch)
}

export function* searchSaga() {
    yield all([
        call(onSimpleSearch),
    ])
}