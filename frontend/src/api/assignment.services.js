import axios from 'axios'
import { formatDate } from '../utils/text.utils';

const API_URL = '/api/assignment';



export const getAssignmentDetailAPI = (data) => {
    const { token, assignment } = data
    return axios.request({
        headers: { 'Content-Type': 'application/json', 'Authorization': `token ${token}` },
        method: 'GET',
        url: `${API_URL}/${assignment}`,
    })
}

export const createAssignment = (data) => {

    const { token, name, info, learning_topic, max_score,
        max_submit_time, start_date, due_date, files, percentage, mandatory } = data
    const formData = new FormData()
    formData.set("name", name)
    formData.set("info", info)
    formData.set("learning_topic", learning_topic)
    formData.set("max_score", max_score)
    formData.set("max_submit_time", max_submit_time)
    formData.set("start_date", start_date)
    formData.set("due_date", due_date)
    formData.set("percentage", percentage)
    formData.set("mandatory", mandatory)

    files.forEach(file => formData.append("file[]", file.file, file.fileName))

    return axios.request({
        headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `token ${token}` },
        method: 'POST',
        url: `${API_URL}/`,
        data: formData
    })
}

export const editAssignment = (data, id) => {

    const { token, name, info, percentage, max_score, max_submit_time, start_date, due_date, files, mandatory } = data
    const formData = new FormData()
    formData.set("name", name)
    formData.set("info", info)
    formData.set("max_score", max_score)
    formData.set("max_submit_time", max_submit_time)
    formData.set("start_date", start_date)
    formData.set("due_date", due_date)
    formData.set("percentage", percentage)
    formData.set("mandatory", mandatory)
    files.forEach(file => formData.append("file[]", file.file, file.fileName))

    return axios.request({
        headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `token ${token}` },
        method: 'PATCH',
        url: `${API_URL}/${id}`,
        data: formData
    })
}

export const deleteAssigment = (data) => {
    const { token, id } = data
    return axios.request({
        headers: { 'Content-Type': 'application/json', 'Authorization': `token ${token}` },
        method: 'DELETE',
        url: `${API_URL}/${id}`
    })
}

export const getStudentAssignmentAPI = (data) => {
    const { token, assignment } = data

    return axios.request({
        headers: { 'Content-Type': 'application/json', 'Authorization': `token ${token}` },
        method: 'GET',
        url: `${API_URL}/student`,
        params: {
            assignment
        }
    })
}

export const submitAssignmentAPI = (data) => {
    const { token, formData } = data

    return axios.request({
        headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `token ${token}` },
        method: 'POST',
        url: `${API_URL}/student/submit`,
        data: formData
    })
}



export const getStudentAssignmentListByTopicAPI = (data) => {
    const { token, topic } = data

    return axios.request({
        headers: { 'Content-Type': 'application/json', 'Authorization': `token ${token}` },
        method: 'GET',
        url: `${API_URL}/student/list_by_topic`,
        params: {
            topic
        }
    })
}


export const downloadAssignmentItem = (data) => {
    const { token, id, filename } = data

    return axios.request({
        headers: { 'Authorization': `token ${token}` },
        method: 'GET',
        url: `${API_URL}/student/download_item`,
        params: { id, filename },
        responseType: 'blob'
    })
}


export const downloadAllAssigment = (data) => {
    const { token, assignmentId } = data

    return axios.request({
        headers: { 'Authorization': `token ${token}` },
        method: 'GET',
        url: `${API_URL}/student/download_all`,
        params: { assignmentId },
        responseType: 'blob'
    })
}