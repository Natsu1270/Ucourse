import { takeLatest, takeEvery, put, call, all } from 'redux-saga/effects';

import HomeActionTypes from "./home.types"
import * as HomeActions from './home.actions'
import * as HomeService from '../../api/home.services'

export function* getAllCoursesAndPrograms(){
    try {
        let {data} = yield call(HomeService.getAllAPI)
        yield put(HomeActions.getAllSuccess(data.data))
    } catch (e) {
        yield put(HomeActions.getAllFail(e.response))
    }
}

export function* onGetAllCoursesAndPrograms(){
    yield takeLatest(HomeActionTypes.GET_ALL_START, getAllCoursesAndPrograms)
}

export default function* homeSaga() {
    yield all([
        call(onGetAllCoursesAndPrograms),
    ])
}