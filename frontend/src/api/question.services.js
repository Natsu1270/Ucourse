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