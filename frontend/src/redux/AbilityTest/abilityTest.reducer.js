import AbilityTestTypes from "./abilityTest.types";

const initState = {
    generatedAbilityTest: null,
    isGenerating: false,
    errorResponse: null
};

const abilityTestReducer = (state = initState, action) => {
    switch (action.type) {
        case AbilityTestTypes.GENERATE_ABILITY_TEST_START:
            return {...state, isGenerating: true};

        case AbilityTestTypes.GENERATE_ABILITY_TEST_SUCCESS:
            return {...state, isGenerating: false, generatedAbilityTest: action.payload};

        case AbilityTestTypes.GENERATE_ABILITY_TEST_FAIL:
            return {...state, isGenerating: false, errorResponse: action.payload};

        default:
            return state
    }
};

export default abilityTestReducer