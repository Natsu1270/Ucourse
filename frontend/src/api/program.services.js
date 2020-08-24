import axios from 'axios'

const PROGRAM_API_URL = '/api/programs/';


export const getProgramListAPI = () => {
    return axios.request({
        headers: { 'Content-Type': 'application/json' },
        method: 'GET',
        url: PROGRAM_API_URL
    })
};


export const getProgramDetailAPI = (params) => {
    const { token, slug } = params
    const headers = token ?
        { 'Content-Type': 'application/json', 'Authorization': `token ${token}` } :
        { 'Content-Type': 'application/json' }

    return axios.request({
        headers,
        method: 'GET',
        url: `${PROGRAM_API_URL}/${slug}`
    })
};


export const buyProgramAPI = (params) => {
    const { token, program_id } = params
    return axios.request({
        headers: { 'Content-Type': 'application/json', 'Authorization': `token ${token}` },
        method: 'POST',
        url: `${PROGRAM_API_URL}/user/buy`,
        data: {
            program_id
        }
    })
}

export const buyProgramSuccessAPI = async (params) => {
    const {
        token, program, partnerRefId, requestId, errorCode, extraData
    } = params;

    return axios.request({
        headers: { 'Content-Type': 'application/json', 'Authorization': `token ${token}`, 'Access-Control-Allow-Origin': '*' },
        method: 'POST',
        url: `${PROGRAM_API_URL}/user/buy/success`,
        data: { program, partnerRefId, requestId, errorCode, extraData }
    })
}

