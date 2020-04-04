import {createSelector} from 'reselect'

const courseSelector = state => state.course;

export const courseDetailSelector = createSelector(
    [courseSelector],
    course => course.courseDetail
);

export const isFetchingSelector = createSelector(
    [courseSelector],
    course => course.isFetching
);

export const errorResponseSelector = createSelector(
    [courseSelector],
    course => course.errorResponse
);