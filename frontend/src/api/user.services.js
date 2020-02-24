import axios from "axios";

const AUTH_API_URL = '/api/auth/'

export function loadUserAPI(token) {
    return axios.request({
        headers: {'Content-Type': 'application/json', 'Authorization': `Token ${token}`},
        method: 'GET',
        url: `${AUTH_API_URL}user`
    })
}

export function loginAPI(authParams) {
    return axios.request({
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        url: `${AUTH_API_URL}login`,
        data: authParams
    })
}

export function logoutAPI(token) {
    return axios.request({
        headers: {'Content-Type': 'application/json', 'Authorization': `Token ${token}`},
        method: 'GET',
        url: `${AUTH_API_URL}logout`
    })
}