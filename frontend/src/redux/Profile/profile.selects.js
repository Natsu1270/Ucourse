import {createSelector} from 'reselect'

const profileSelector = state => state.profile

export const userProfileSelector = createSelector(
    [profileSelector],
    profile => profile.userProfile
)

export const profileLoadingSelector = createSelector(
    [profileSelector],
    profile => profile.isLoading
)

export const profileErrorSelector = createSelector(
    [profileSelector],
    profile => profile.errorResponse
)

export const teacherListSelector = createSelector(
    [profileSelector],
    profile => profile.teacherList ? profile.teacherList : []
)