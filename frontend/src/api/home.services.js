import axios from 'axios'

const GET_ALL_URL = '/api/all'

export function getAllAPI(page) {
    return axios.request({
        headers: { 'Content-Type': 'application/json' },
        method: 'GET',
        url: GET_ALL_URL,
        params: { page }
    })
}

export function getAllMyAPI(token) {
    const headers = token ?
        { 'Content-Type': 'application/json', 'Authorization': `token ${token}` } :
        { 'Content-Type': 'application/json' }
    return axios.request({
        headers,
        method: 'GET',
        url: `${GET_ALL_URL}/my`
    })
}

export function getTransactionHistory(token) {
    const headers = token ?
        { 'Content-Type': 'application/json', 'Authorization': `token ${token}` } :
        { 'Content-Type': 'application/json' }
    return axios.request({
        headers,
        method: 'GET',
        url: `${GET_ALL_URL}/transaction-history`
    })
}

export function getMaterialCount() {
    return axios.request({
        method: 'GET',
        url: `${GET_ALL_URL}/total-material`
    })
}

export function getProgramProcessAPI(token) {
    const headers = { 'Content-Type': 'application/json', 'Authorization': `token ${token}` }
    return axios.request({
        headers,
        method: 'GET',
        url: `${GET_ALL_URL}/program-process`
    })
}

export function getMyCoursesAPI(token) {
    return axios.request({
        headers: { 'Content-Type': 'application/json', 'Authorization': `token ${token}` },
        method: 'GET',
        url: `${GET_ALL_URL}/courses`
    })
}

export function searchRegisterCourseAPI(token, keyword) {
    return axios.request({
        headers: { 'Content-Type': 'application/json', 'Authorization': `token ${token}` },
        method: 'GET',
        url: `${GET_ALL_URL}/search`,
        params: { keyword }
    })
}