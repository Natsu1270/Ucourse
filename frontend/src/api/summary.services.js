import axios from 'axios'

const API_URL = '/api/summary'

export function getListSummary({ token, course_id, class_id }) {
    return axios.request({
        headers: { 'Content-type': 'application/json', 'Authorization': `token ${token}` },
        method: 'GET',
        url: `${API_URL}/students`,
        params: { course_id, class_id }
    })
}


export function searchSummary(params) {
    const { token } = params
    return axios.request({
        headers: { 'Content-type': 'application/json', 'Authorization': `token ${token}` },
        method: 'POST',
        url: `${API_URL}/students/search`,
        data: params
    })
}


export function updateSummary({ token, userCourseId, status, rank }) {

    return axios.request({
        headers: { 'Content-type': 'application/json', 'Authorization': `token ${token}` },
        method: 'POST',
        url: `${API_URL}/update`,
        data: { userCourseId, status, rank }
    })
}