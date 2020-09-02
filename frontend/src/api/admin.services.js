import axios from 'axios'

const API_URL = '/api/admin';


export const getUserAdminData = () => {
    return axios.request({
        headers: { 'Content-Type': 'application/json', },
        method: 'GET',
        url: `${API_URL}/data/user`,
    })
}


export const getProgramCourseAdminData = () => {
    return axios.request({
        headers: { 'Content-Type': 'application/json', },
        method: 'GET',
        url: `${API_URL}/data/program-course`,
    })
}

export const getIncomeAdminData = () => {
    return axios.request({
        headers: { 'Content-Type': 'application/json', },
        method: 'GET',
        url: `${API_URL}/data/income`,
    })
}