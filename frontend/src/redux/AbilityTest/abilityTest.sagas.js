import { takeLatest, call, put, all } from 'redux-saga/effects'

import AbilityTestTypes from "./abilityTest.types";
import * as AbilityTestActions from './abilityTest.actions'
import * as AbilityTestServices from '../../api/abilityTest.services'

export function* genAbilityTest({ payload }) {
    try {
        let { data } = yield call(AbilityTestServices.generateAbilityTestAPI, payload);
        yield put(AbilityTestActions.genAbilityTestSuccess(data.data))
    } catch (err) {
        yield put(AbilityTestActions.genAbilityTestFail(err.response))
    }
}

export function* onGenAbilityTest() {
    yield takeLatest(AbilityTestTypes.GENERATE_ABILITY_TEST_START, genAbilityTest)
}

export function* submitAbilityTest({ payload }) {
    try {
        let { data } = yield call(AbilityTestServices.submitAbilityTestAPI, payload);
        yield put(AbilityTestActions.submitAbilityTestSuccess())
    } catch (err) {
        yield put(AbilityTestActions.submitAbilityTestFail(err.response))
    }
}

export function* onSubmitAbilityTest() {
    yield takeLatest(AbilityTestTypes.SUBMIT_ABILITY_TEST_START, submitAbilityTest)
}

export function* getAbilityTests({ payload }) {
    try {
        let { data } = yield call(AbilityTestServices.getListAbilityTestAPI, payload)
        yield put(AbilityTestActions.getAbilityTestSuccess(data.data))
    } catch (err) {
        yield put(AbilityTestActions.getAbilityTestFail(err.response))
    }
}

export function* onGetAbilityTests() {
    yield takeLatest(AbilityTestTypes.GET_ABILITY_TEST_START, getAbilityTests)
}

export function* abilityTestSaga() {
    yield all([
        call(onGenAbilityTest),
        call(onSubmitAbilityTest),
        call(onGetAbilityTests)
    ])
}