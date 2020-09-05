import axios from 'axios'

const API_URL = '/api/questions';

export const deleteQuestion = (params) => {
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

export const createQuestion = (params) => {
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

export const editQuestion = (params) => {
    const { token } = params

    return axios.request({
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${token}`,
        },
        method: 'POST',
        url: `${API_URL}/edit`,
        data: params
    })
}


export const getQuestionsByTeacher = (token) => {

    return axios.request({
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${token}`,
        },
        method: 'GET',
        url: `${API_URL}/questions-by-teacher`,
    })
}



export const getQuestionsRemainByTeacher = (token, examId) => {

    return axios.request({
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${token}`,
        },
        method: 'GET',
        url: `${API_URL}/questions-teacher-remain`,
        params: { examId }
    })
}

export const addQuestionToExam = ({ token, examId, rows }) => {

    return axios.request({
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${token}`,
        },
        method: 'POST',
        url: `${API_URL}/add-to-exam`,
        data: { examId, rows }
    })
}