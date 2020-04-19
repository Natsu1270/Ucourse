import {createSelector} from 'reselect'

const courseHomeSelector = state => state.courseHome;

export const isLoadingSelector = createSelector(
    [courseHomeSelector],
    courseHome => courseHome.isLoading
);

export const errorResponseSelector = createSelector(
    [courseHomeSelector],
    courseHome => courseHome.errorResponse
);

export const myCourseHomesSelector = createSelector(
    [courseHomeSelector],
    courseHome => courseHome.myCourseHomes ? courseHome.myCourseHomes : []
);