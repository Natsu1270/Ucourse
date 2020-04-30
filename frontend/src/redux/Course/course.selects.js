import { createSelector } from 'reselect'

const courseSelector = state => state.course;

export const courseDetailSelector = createSelector(
    [courseSelector],
    course => course.courseDetail ? course.courseDetail : {}
);

export const courseTeacherSelector = createSelector(
    [courseDetailSelector],
    courseDetail => courseDetail.teacher ? courseDetail.teacher : []
);

export const courseDetailDetailSelector = createSelector(
    [courseDetailSelector],
    courseDetail => courseDetail.course_detail ? courseDetail.course_detail : {}
);

export const isFetchingSelector = createSelector(
    [courseSelector],
    course => course.isFetching
);

export const errorResponseSelector = createSelector(
    [courseSelector],
    course => course.errorResponse
);