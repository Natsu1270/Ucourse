import { createSelector } from 'reselect'

const homeSelector = state => state.home

export const isGettingSelector = createSelector(
    [homeSelector],
    home => home.isGetting
)

export const errorResponseSelector = createSelector(
    [homeSelector],
    home => home.errorResponse
)

export const coursesAndProgramsSelector = createSelector(
    [homeSelector],
    home => home.coursesAndPrograms ? home.coursesAndPrograms : {}
)

export const homeProgramsSelector = createSelector(
    [coursesAndProgramsSelector],
    coursesAndPrograms => coursesAndPrograms.programs ?
        coursesAndPrograms.programs : []
)

export const homeCoursesSelector = createSelector(
    [coursesAndProgramsSelector],
    coursesAndPrograms => coursesAndPrograms.courses ?
        coursesAndPrograms.courses : []
)