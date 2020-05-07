import ExamTypes from "./exam.types";

export const getExamStart = (params) => ({
    type: ExamTypes.GET_EXAM_START,
    payload: params
});

export const getExamSuccess = (exam) => ({
    type: ExamTypes.GET_EXAM_SUCCESS,
    payload: exam
});

export const getExamFail = (err) => ({
    type: ExamTypes.GET_EXAM_FAIL,
    payload: err
});

export const getStudentExamsStart = (params) => ({
    type: ExamTypes.GET_STUDENT_EXAM_START,
    payload: params
});

export const getStudentExamsSuccess = (exams) => ({
    type: ExamTypes.GET_STUDENT_EXAM_SUCCESS,
    payload: exams
});

export const getStudentExamsFail = (err) => ({
    type: ExamTypes.GET_STUDENT_EXAM_FAIL,
    payload: err
});

export const getStudentExamDetailStart = (params) => ({
    type: ExamTypes.GET_STUDENT_EXAM_DETAIL_START,
    payload: params
});

export const getStudentExamDetailSuccess = (exam) => ({
    type: ExamTypes.GET_STUDENT_EXAM_DETAIL_SUCCESS,
    payload: exam
});

export const getStudentExamDetailFail = (err) => ({
    type: ExamTypes.GET_STUDENT_EXAM_DETAIL_FAIL,
    payload: err
});

export const submitExamStart = (params) => ({
    type: ExamTypes.SUBMIT_EXAM_START,
    payload: params
});

export const submitExamSuccess = () => ({
    type: ExamTypes.SUBMIT_EXAM_SUCCESS,
});

export const submitExamFail = (err) => ({
    type: ExamTypes.SUBMIT_EXAM_FAIL,
    payload: err
});