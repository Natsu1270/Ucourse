import { createSelector } from 'reselect'

const uiSelector = state => state.ui;

export const isRLModalActiveSelector = createSelector(
    [uiSelector],
    ui => ui.isRLModalActive
);

export const isSignupPanelActiveSelector = createSelector(
    [uiSelector],
    ui => ui.isSignupPanelActive
);

export const isAbilityTestModalActiveSelector = createSelector(
    [uiSelector],
    ui => ui.isAbilityTestModalActive
);

export const registerCourseModalSelector = createSelector(
    [uiSelector],
    ui => ui.registerResultModal
);

export const createThreadModalSelector = createSelector(
    [uiSelector],
    ui => ui.createThreadModal
);

export const replyThreadModalSelector = createSelector(
    [uiSelector],
    ui => ui.replyThreadModal
);