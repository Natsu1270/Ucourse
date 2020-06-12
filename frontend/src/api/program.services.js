import axios from 'axios'

const PROGRAM_API_URL = '/api/programs/';


export const getProgramListAPI = () => {
    return axios.request({
        headers: {'Content-Type': 'application/json'},
        method: 'GET',
        url: PROGRAM_API_URL
    })
};


export const getProgramDetailAPI = (params) => {
    const {token, slug} = params
    return axios.request({
        headers: {'Content-Type': 'application/json', 'Authorization': `token ${token}`},
        method: 'GET',
        url: `${PROGRAM_API_URL}/${slug}`
    })
};


export const buyProgramAPI = (params) => {
    const {token, program_id} = params
    return axios.request({
        headers: { 'Content-Type': 'application/json', 'Authorization': `token ${token}` },
        method: 'POST',
        url: `${PROGRAM_API_URL}/user/buy`,
        data: {
            program_id
        }
    })
}


