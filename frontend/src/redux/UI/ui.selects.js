import { createSelector } from 'reselect'

const uiSelector = state => state.ui

export const isRLModalActiveSelector = createSelector(
    [uiSelector],
    ui => ui.isRLModalActive
)

export const isSignupPanelActiveSelector = createSelector(
    [uiSelector],
    ui => ui.isSignupPanelActive
)