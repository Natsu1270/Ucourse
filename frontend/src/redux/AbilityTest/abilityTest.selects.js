import { createSelector } from 'reselect'

const abilityTestSelector = state => state.abilityTest;

export const generatedAbilityTestSelector = createSelector(
    [abilityTestSelector],
    abilityTest => abilityTest.generatedAbilityTest
);

export const isGeneratingAbilityTestSelector = createSelector(
    [abilityTestSelector],
    abilityTest => abilityTest.isGenerating
);

export const errorResponseSelector = createSelector(
    [abilityTestSelector],
    abilityTest => abilityTest.errResponse
);

export const userAbilityTestSelector = createSelector(
    [generatedAbilityTestSelector],
    generatedAbilityTest => generatedAbilityTest ? generatedAbilityTest.user_ability_test : {}
)


export const atQuestionsSelector = createSelector(
    [userAbilityTestSelector],
    user_ability_test => user_ability_test ? user_ability_test.questions : []
)

export const atDurationSelector = createSelector(
    [userAbilityTestSelector],
    user_ability_test => user_ability_test ? user_ability_test.duration : 0
)

export const uatIdSelector = createSelector(
    [userAbilityTestSelector],
    user_ability_test => user_ability_test ? user_ability_test.id : -1
)