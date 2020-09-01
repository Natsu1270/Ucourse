import axios from 'axios'

const API_URL = '/api/summary'
const CERTIFCATE_API_URL = '/api/certificate'

export function getListSummary({ token, course_id, class_id }) {
    return axios.request({
        headers: { 'Content-type': 'application/json', 'Authorization': `token ${token}` },
        method: 'GET',
        url: `${API_URL}/students`,
        params: { course_id, class_id }
    })
}

export function getStudentSummary({ token, courseId, courseHomeId }) {
    return axios.request({
        headers: { 'Content-type': 'application/json', 'Authorization': `token ${token}` },
        method: 'GET',
        url: `${API_URL}/student`,
        params: { courseId, courseHomeId }
    })
}


export function getStudentCertificate({ token, courseId, courseHomeId }) {
    return axios.request({
        headers: { 'Content-type': 'application/json', 'Authorization': `token ${token}` },
        method: 'GET',
        url: `${CERTIFCATE_API_URL}/student`,
        params: { courseId, courseHomeId }
    })
}

export function getAllCourseCertificate({ token }) {
    return axios.request({
        headers: { 'Content-type': 'application/json', 'Authorization': `token ${token}` },
        method: 'GET',
        url: `${CERTIFCATE_API_URL}/all`,
        params: {}
    })
}


export function searchSummary(params) {
    const { token } = params
    return axios.request({
        headers: { 'Content-type': 'application/json', 'Authorization': `token ${token}` },
        method: 'POST',
        url: `${API_URL}/students/search`,
        data: params
    })
}


export function updateSummary({ token, userCourseId, status, rank }) {

    return axios.request({
        headers: { 'Content-type': 'application/json', 'Authorization': `token ${token}` },
        method: 'POST',
        url: `${API_URL}/update`,
        data: { userCourseId, status, rank }
    })
}


export function multiUpdateSummary({ token, datas }) {

    return axios.request({
        headers: { 'Content-type': 'application/json', 'Authorization': `token ${token}` },
        method: 'POST',
        url: `${API_URL}/multi-update`,
        data: datas
    })
}


export function genCertificateAPI({ token, params }) {

    return axios.request({
        headers: { 'Content-type': 'application/json', 'Authorization': `token ${token}` },
        method: 'GET',
        url: `${CERTIFCATE_API_URL}/generate`,
        params: params,
        responseType: 'blob'
    })
}


export function handOutCertificateAPI({ token, formData }) {

    return axios.request({
        headers: { 'Content-type': 'multipart/form-data', 'Authorization': `token ${token}` },
        method: 'POST',
        url: `${CERTIFCATE_API_URL}/handout`,
        data: formData,
    })
}

export function requestProgramCertificate({ token, programId }) {

    return axios.request({
        headers: { 'Content-type': 'application/json', 'Authorization': `token ${token}` },
        method: 'GET',
        url: `${CERTIFCATE_API_URL}/program/request`,
        params: { programId }
    })
}