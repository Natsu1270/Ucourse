import axios from 'axios'

const PROGRAM_API_URL = '/api/programs/';


export const getProgramListAPI = () => {
    return axios.request({
        headers: {'Content-Type': 'application/json'},
        method: 'GET',
        url: PROGRAM_API_URL
    })
};


export const getProgramDetailAPI = (slug) => {
    return axios.request({
        headers: {'Content-Type': 'application/json'},
        method: 'GET',
        url: `${PROGRAM_API_URL}/${slug}`
    })
};


