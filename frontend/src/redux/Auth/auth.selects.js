import { createSelector } from 'reselect'

const authSelector = (state) => state.auth

export const currentUserSelector = createSelector(
    [authSelector],
    auth => auth.currentUser
)

export const userRoleSelector = createSelector(
    [currentUserSelector],
    currentUser => currentUser ? currentUser.role : {}
)

export const tokenSelector = createSelector(
    [authSelector],
    auth => auth.userToken
)

export const errMessageSelector = createSelector(
    [authSelector],
    auth => auth.errMessage
)

export const isLoadUserLoadingSelector = createSelector(
    [authSelector],
    auth => auth.isLoadUserLoading
)
export const isLoadingSelector = createSelector(
    [authSelector],
    auth => auth.isLoading
)

