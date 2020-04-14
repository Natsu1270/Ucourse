import AbilityTestTypes from "./abilityTest.types";

const initState = {
    generatedAbilityTest: null,
    isGenerating: false,
    errorResponse: null,
    isSubmitting: false
};

const abilityTestReducer = (state = initState, action) => {
    switch (action.type) {
        case AbilityTestTypes.GENERATE_ABILITY_TEST_START:
            return {...state, isGenerating: true};

        case AbilityTestTypes.SUBMIT_ABILITY_TEST_START:
            return {...state, isSubmitting: true}

        case AbilityTestTypes.SUBMIT_ABILITY_TEST_SUCCESS:
            return {...state, isSubmitting: false}

        case AbilityTestTypes.SUBMIT_ABILITY_TEST_FAIL:
            return {...state, isSubmitting: false, errorResponse: action.payload}

        case AbilityTestTypes.GENERATE_ABILITY_TEST_SUCCESS:
            return {...state, isGenerating: false, generatedAbilityTest: action.payload};

        case AbilityTestTypes.GENERATE_ABILITY_TEST_FAIL:
            return {...state, isGenerating: false, errorResponse: action.payload};

        default:
            return state
    }
};

export default abilityTestReducer