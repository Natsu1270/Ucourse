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

export const submitExam = (params) => {
    const { token, exam, result, responses, courseHomeId } = params
    return axios.request({
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${token}`,
        },
        method: 'POST',
        url: `${API_URL}/submit`,
        data: {
            exam, result, responses, courseHomeId
        }
    })
}

export const createExam = (params) => {
    const {
        token, topic, name, exam_type,
        get_result_type, duration, max_try,
        pass_score, start_date, expired_date, percentage, mandatory
    } = params
    return axios.request({
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${token}`,
        },
        method: 'POST',
        url: `${API_URL}/create`,
        data: {
            topic, name, exam_type, get_result_type, duration,
            max_try, pass_score, start_date, expired_date, percentage, mandatory
        }
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