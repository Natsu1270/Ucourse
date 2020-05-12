import axios from 'axios'

const API_URL = '/api/forums'

export const getForumsAPI = ({token, course_home_id}) => {
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

export const getForumDetailAPI = ({token, forum_id}) => {
    return axios.request({
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${token}`,
        },
        method: 'GET',
        url: `${API_URL}/${forum_id}`,
    })
}

export const getThreadsAPI = ({token, forum_id}) => {
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

export const getThreadDetailAPI = ({token, thread_id}) => {
    return axios.request({
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${token}`,
        },
        method: 'GET',
        url: `${API_URL}/threads/${thread_id}`,
    })
}