import axios from 'axios'

const API_URL = '/api/forums'

export const getForumsAPI = ({ token, course_home_id }) => {
    return axios.request({
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${token}`,
        },
        method: 'GET',
        url: `${API_URL}`,
        params: {
            course_home_id
        }
    })
}

export const createForumsAPI = ({ token, courseHomeId, name }) => {
    return axios.request({
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${token}`,
        },
        method: 'POST',
        url: `${API_URL}/`,
        data: {
            courseHomeId, name
        }
    })
}


export const getForumDetailAPI = ({ token, forum_id }) => {
    return axios.request({
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${token}`,
        },
        method: 'GET',
        url: `${API_URL}/${forum_id}`,
    })
}

export const getThreadsAPI = ({ token, forum_id }) => {
    return axios.request({
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${token}`,
        },
        method: 'GET',
        url: `${API_URL}/threads`,
        params: {
            forum_id
        }
    })
}

export const getThreadDetailAPI = ({ token, thread_id }) => {
    return axios.request({
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${token}`,
        },
        method: 'GET',
        url: `${API_URL}/threads/${thread_id}`,
    })
}

export const createThreadAPI = (params) => {
    const { token } = params
    return axios.request({
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${token}`,
        },
        method: 'POST',
        url: `${API_URL}/threads`,
        data: params
    })
}

export const replyThreadAPI = (params) => {
    const { token } = params
    return axios.request({
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${token}`,
        },
        method: 'POST',
        url: `${API_URL}/responses`,
        data: params
    })
}

export const deleteThreadAPI = (params) => {
    const { token, thread_id } = params
    return axios.request({
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${token}`,
        },
        method: 'DELETE',
        url: `${API_URL}/threads/${thread_id}`,
    })
}

export const modifyThreadAPI = (params) => {
    const { token, thread_id } = params
    return axios.request({
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${token}`,
        },
        method: 'PUT',
        url: `${API_URL}/threads/${thread_id}`,
        data: params
    })
}

export const deleteThreadResponseAPI = (params) => {
    const { token, responseId } = params
    return axios.request({
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${token}`,
        },
        method: 'DELETE',
        url: `${API_URL}/responses/${responseId}`,
    })
}

export const modifyThreadResponseAPI = (params) => {
    const { token, responseId } = params
    return axios.request({
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${token}`,
        },
        method: 'PUT',
        url: `${API_URL}/responses/${responseId}`,
        data: params
    })
}