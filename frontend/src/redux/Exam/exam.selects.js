import {createSelector} from 'reselect'

const examSelector = state => state.exam

export const studentExamsSelector = createSelector(
    [examSelector],
    exam => exam.studentExams ? exam.studentExams : []
)

export const examDetailSelector = createSelector(
    [examSelector],
    exam => exam.examDetail ? exam.examDetail : {}
)

export const studentExamDetailSelector = createSelector(
    [examSelector],
    exam => exam.studentExamDetail ? exam.studentExamDetail : {}
)

export const isProcessingSelector = createSelector(
    [examSelector],
    exam => exam.isProcessing
)

export const errorResponseSelector = createSelector(
    [examSelector],
    exam => exam.errorResponse
)