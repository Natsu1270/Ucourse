import axios from 'axios'

const GET_ALL_URL = '/api/all'

export function getAllAPI() {
    return axios.request({
        headers: {'Content-Type': 'application/json'},
        method: 'GET',
        url: GET_ALL_URL
    })
}