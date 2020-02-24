import { createSelector } from 'reselect'

const userSelector = (state) => state.user

export const currentUserSelector = createSelector(
    [userSelector],
    user => user.currentUser
)

export const tokenSelector = createSelector(
    [userSelector],
    user => user.userToken
)

export const userErrorMessage = createSelector(
    [userSelector],
    user => user.errorMessage
)

export const userIsLoadingSelector = createSelector(
    [userSelector],
    user => user.isLoading
)