import {takeLatest, call, put, all} from 'redux-saga/effects'

import AbilityTestTypes from "./abilityTest.types";
import * as AbilityTestActions from './abilityTest.actions'
import * as AbilityTestServices from '../../api/abilityTest.services'

export function* genAbilityTest({payload}) {
    try {
        let { data } = yield call(AbilityTestServices.generateAbilityTest, payload);
        yield put(AbilityTestActions.genAbilityTestSuccess(data.data))
    } catch (err) {
        yield put(AbilityTestActions.genAbilityTestFail(err.response))
    }
}

export function* onGenAbilityTest() {
    yield takeLatest(AbilityTestTypes.GENERATE_ABILITY_TEST_START, genAbilityTest)
}

export function* abilityTestSaga() {
    yield all([
        call(onGenAbilityTest)
    ])
}