import axios from 'axios'

const GET_ALL_URL = '/api/all'

export function getAllAPI() {
    return axios.request({
        headers: { 'Content-Type': 'application/json' },
        method: 'GET',
        url: GET_ALL_URL
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