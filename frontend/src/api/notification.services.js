import axios from 'axios'

const API_URL = '/api/notification'


export function getMyNotificationList(token) {
    return axios.request({
        headers: { 'Content-Type': 'application/json', 'Authorization': `Token ${token}` },
        method: 'GET',
        url: `${API_URL}/my-notifications`
    })
}

export function createRegisterNotification({ token, type, instanceId }) {
    return axios.request({
        headers: { 'Content-Type': 'application/json', 'Authorization': `Token ${token}` },
        method: 'POST',
        url: `${API_URL}/create/register`,
        data: { type, instanceId }
    })
}

export function readNotification(id) {
    return axios.request({
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        url: `${API_URL}/read`,
        data: { id }
    })
}

export function deleteNotification(id) {
    return axios.request({
        headers: { 'Content-Type': 'application/json' },
        method: 'DELETE',
        url: `${API_URL}/delete/${id}`,
    })
}
