import ExamTypes from "./exam.types";

const initState = {
    examDetail: null,
    studentExams: null,
    studentExamDetail: null,
    isProcessing: false,
    errorResponse: null
}

const examReducer = (state=initState, action) => {
    switch (action.type) {

        case ExamTypes.GET_EXAM_START:
        case ExamTypes.GET_STUDENT_EXAM_START:
        case ExamTypes.GET_STUDENT_EXAM_DETAIL_START:
        case ExamTypes.SUBMIT_EXAM_START:
            return {...state, isProcessing: true}

        case ExamTypes.GET_EXAM_SUCCESS:
            return {...state, isProcessing: false, examDetail: action.payload}

        case ExamTypes.GET_STUDENT_EXAM_SUCCESS:
            return {...state, isProcessing: false, studentExams: action.payload}

        case ExamTypes.GET_STUDENT_EXAM_DETAIL_SUCCESS:
            return {...state, isProcessing: false, studentExamDetail: action.payload}

        case ExamTypes.SUBMIT_EXAM_SUCCESS:
            return {...state, isProcessing: false}

        case ExamTypes.GET_EXAM_FAIL:
        case ExamTypes.GET_STUDENT_EXAM_FAIL:
        case ExamTypes.GET_STUDENT_EXAM_DETAIL_FAIL:
        case ExamTypes.SUBMIT_EXAM_FAIL:
            return {...state, isProcessing: false, errorResponse: action.payload}

        default:
            return state
    }
}

export default examReducer