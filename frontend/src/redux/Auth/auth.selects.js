import { createSelector } from 'reselect'

const authSelector = (state) => state.auth

export const currentUserSelector = createSelector(
    [authSelector],
    auth => auth.currentUser
)

export const tokenSelector = createSelector(
    [authSelector],
    auth => auth.userToken
)

export const loginErrMessageSelector = createSelector(
    [authSelector],
    auth => auth.loginErrMessage
)

export const isLoadUserLoadingSelector = createSelector(
    [authSelector],
    auth => auth.isLoadUserLoading
)
export const isRegisterLoadingSelector = createSelector(
    [authSelector],
    auth => auth.isRegisterLoading
)
export const isLoginLoadingSelector = createSelector(
    [authSelector],
    auth => auth.isLoginLoading
)

export const registerErrMessageSelector = createSelector(
    [authSelector],
    auth => auth.registerErrMessage
)