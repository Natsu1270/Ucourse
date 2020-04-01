import axios from 'axios'

const FIELD_API_URL = '/field/';

export const getFieldsAPI = () => {
    return axios.request({
        headers: {'Content-Type': 'application/json'},
        method: 'GET',
        url: FIELD_API_URL
    })
};

export const getFieldDetailAPI = (slug) => {
    return axios.request({
        headers: {'Content-Type': 'application/json'},
        method: 'GET',
        url: `${FIELD_API_URL}/${slug}`
    })
};