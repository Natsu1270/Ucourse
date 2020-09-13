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

export const maxSizeSelector = createSelector(
    [coursesAndProgramsSelector],
    coursesAndPrograms => coursesAndPrograms.maxSize ?
        coursesAndPrograms.maxSize : 0
)


export const myCoursesAndProgramsSelector = createSelector(
    [homeSelector],
    home => home.myCoursesAndPrograms ? home.myCoursesAndPrograms : {}
)

export const myProgramsSelector = createSelector(
    [myCoursesAndProgramsSelector],
    myCoursesAndPrograms => myCoursesAndPrograms.myPrograms ?
        myCoursesAndPrograms.myPrograms : []
)

export const myCoursesSelector = createSelector(
    [myCoursesAndProgramsSelector],
    myCoursesAndPrograms => myCoursesAndPrograms.myCourses ?
        myCoursesAndPrograms.myCourses : []
)