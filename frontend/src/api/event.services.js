import axios from 'axios'

const EVENT_API_URL = '/api/events/';


export const getEventListAPI = () => {
    return axios.request(
        {
            headers: {'Content-Type': 'application/json'},
            method: 'GET',
            url: `${EVENT_API_URL}list`,
        }
    )
};


export const getEventDetailAPI = (token, eventId) => {
    return axios.request({
        headers: { 'Content-Type': 'application/json', 'Authorization': `token ${token}` },
        method: 'GET',
        url: `${EVENT_API_URL}${eventId}`
    })
};




