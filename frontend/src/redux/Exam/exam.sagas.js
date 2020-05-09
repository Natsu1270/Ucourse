import {takeLatest, takeEvery, call, put, all} from 'redux-saga/effects'
import ExamTypes from './exam.types'
import * as ExamActions from './exam.actions'
import * as ExamSerivces from '../../api/exam.services'

export function* getExamDetail({payload: {token, exam_id}}) {
    try {
        let { data } = yield call(ExamSerivces.getExamDetailAPI, {token, exam_id})
        yield put(ExamActions.getExamSuccess(data.data))
    } catch (err) {
        yield put(ExamActions.getExamFail(err.response))
    }
}

export function* onGetExamDetail() {
    yield takeLatest(ExamTypes.GET_EXAM_START, getExamDetail)
}

export function* getStudentExamList({ payload: { token, exam_id } }) {
    try {
        let { data } = yield call(ExamSerivces.getStudentExamList, { token, exam_id })
        yield put(ExamActions.getStudentExamsSuccess(data.data))
    } catch (err) {
        yield put(ExamActions.getStudentExamsFail(err.response))
    }
}

export function* onGetStudentExamList() {
    yield takeLatest(ExamTypes.GET_STUDENT_EXAM_START, getStudentExamList)
}

export function* submitExam({payload}) {
    try {
        let {data} = yield call(ExamSerivces.submitExam, payload)
        yield put(ExamActions.submitExamSuccess())
    } catch (e) {
        yield put(ExamActions.submitExamFail(e.response))
    }
}

export function* onSubmitExam() {
    yield takeLatest(ExamTypes.SUBMIT_EXAM_START, submitExam)
}


export default function* examSaga() {
    yield all([
        call(onGetExamDetail),
        call(onGetStudentExamList),
        call(onSubmitExam),
    ])
}