import AbilityTestTypes from "./abilityTest.types";

export const genAbilityTestStart = (params) => ({
    type: AbilityTestTypes.GENERATE_ABILITY_TEST_START,
    payload: params
});

export const genAbilityTestSuccess = (test) => ({
    type: AbilityTestTypes.GENERATE_ABILITY_TEST_SUCCESS,
    payload: test
});

export const genAbilityTestFail = (err) => ({
    type: AbilityTestTypes.GENERATE_ABILITY_TEST_FAIL,
    payload: err
});

export const submitAbilityTestStart = (params) => ({
    type: AbilityTestTypes.SUBMIT_ABILITY_TEST_START,
    payload: params
});

export const submitAbilityTestSuccess = () => ({
    type: AbilityTestTypes.SUBMIT_ABILITY_TEST_SUCCESS,
});

export const submitAbilityTestFail = (err) => ({
    type: AbilityTestTypes.SUBMIT_ABILITY_TEST_FAIL,
    payload: err
});