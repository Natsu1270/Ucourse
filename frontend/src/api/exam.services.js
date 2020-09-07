import axios from 'axios'

const API_URL = '/api/exams';


export const getExamDetailAPI = ({ token, exam_id }) => {
    return axios.request({
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${token}`,
        },
        method: 'GET',
        url: `${API_URL}/${exam_id}`,
    })
}

export const getStudentExamList = ({ token, exam_id }) => {
    return axios.request({
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${token}`,
        },
        method: 'GET',
        url: `${API_URL}/student_exams`,
        params: {
            exam_id
        }
    })
}

export const getStudentExamResultDetail = ({ token, exam_id }) => {
    return axios.request({
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${token}`,
        },
        method: 'GET',
        url: `${API_URL}/student_exam_result_detail`,
        params: {
            exam_id
        }
    })
}

export const submitExam = (params) => {
    const { token, exam, result, responses, courseHomeId, studentExamId } = params
    return axios.request({
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${token}`,
        },
        method: 'POST',
        url: `${API_URL}/submit/${studentExamId}`,
        data: {
            exam, result, responses, courseHomeId, studentExamId
        }
    })
}

export const createExam = (params) => {
    const { token } = params
    return axios.request({
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${token}`,
        },
        method: 'POST',
        url: `${API_URL}/create`,
        data: params
    })
}

export const deleteExam = (params) => {
    const { token, id } = params
    return axios.request({
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${token}`,
        },
        method: 'DELETE',
        url: `${API_URL}/${id}`,
    })
}

export const editExam = (params) => {
    const { token, id } = params
    return axios.request({
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${token}`,
        },
        method: 'PATCH',
        url: `${API_URL}/${id}`,
        data: params
    })
}

export const initExamAPI = ({ courseHomeId, examId, token }) => {
    return axios.request({
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${token}`,
        },
        method: 'POST',
        url: `${API_URL}/init`,
        data: { courseHomeId, examId }
    })
}

export const reviewExamAPI = ({ studentExamId, token }) => {
    return axios.request({
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${token}`,
        },
        method: 'GET',
        url: `${API_URL}/student_exams/${studentExamId}`,
    })
}