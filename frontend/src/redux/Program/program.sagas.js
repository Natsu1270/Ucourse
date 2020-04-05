import { takeLatest, all, call, put } from 'redux-saga/effects'

import ProgramActionTypes from "./program.types"
import * as ProgramActions from './program.actions'
import * as ProgramServices from '../../api/program.services'

export function* getProgramDetail({payload}) {
    try {
        let {data} = yield call(ProgramServices.getProgramDetailAPI, payload)
        yield put(ProgramActions.fetchProgramDetailSuccess(data.data))
    } catch (err) {
        yield put(ProgramActions.fetchProgramDetailFail(err.response))
    }
}

export function* onGetProgramDetail() {
    yield takeLatest(ProgramActionTypes.FETCH_PROGRAM_DETAIL_START, getProgramDetail)
}

export function* programSaga() {
    yield all([
        call(onGetProgramDetail)
    ])
}