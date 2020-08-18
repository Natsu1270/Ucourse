import axios from 'axios'
import { formatDate } from '../utils/text.utils';

const API_URL = '/api/course-home';


export const registerCourseAPI = ({ course_id, token, class_id }) => {
    return axios.request({
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${token}`,
        },
        method: 'POST',
        url: `${API_URL}/register`,
        data: { course_id, class_id }
    })
};

export const unRegisterCourseAPI = ({ token, class_id }) => {
    return axios.request({
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${token}`,
        },
        method: 'POST',
        url: `${API_URL}/unregister`,
        data: { class_id }
    })
};


export const fetchMyCourseHomesAPI = ({ token }) => {
    return axios.request({
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${token}`,
        },
        method: 'GET',
        url: `${API_URL}/my`,
    })
};

export const getCourseHomeDetailAPI = ({ slug, token }) => {
    return axios.request({
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${token}`,
        },
        method: 'GET',
        url: `${API_URL}/${slug}`
    })
}


export const getCourseHomeShowAPI = ({ token, course_id }) => {

    const headers = token ?
        { 'Content-Type': 'application/json', 'Authorization': `token ${token}` } :
        { 'Content-Type': 'application/json' }
    return axios.request({
        headers,
        method: 'GET',
        url: `${API_URL}/show/class`,
        params: {
            course_id
        }
    })
}

export const getCourseHomeDetailShowAPI = ({ token, slug }) => {
    const headers = token ?
        { 'Content-Type': 'application/json', 'Authorization': `token ${token}` } :
        { 'Content-Type': 'application/json' }
    return axios.request({
        headers,
        method: 'GET',
        url: `${API_URL}/show/class/${slug}`,
    })
}


export const checkClassOwnership = ({ token, slug }) => {

    const headers = token ?
        { 'Content-Type': 'application/json', 'Authorization': `token ${token}` } :
        { 'Content-Type': 'application/json' }
    return axios.request({
        headers,
        method: 'POST',
        url: `${API_URL}/check`,
        data: {
            slug
        }
    })
}

export const updateCourseHomeInfo = ({ token, slug, info }) => {


    return axios.request({
        headers: { 'Content-Type': 'application/json', 'Authorization': `token ${token}` },
        method: 'PUT',
        url: `${API_URL}/${slug}`,
        data: {
            course_info: info
        }
    })
}

export const createLearningTopic = (data) => {
    const { token, name, info, course_home, code } = data
    return axios.request({
        headers: { 'Content-Type': 'application/json', 'Authorization': `token ${token}` },
        method: 'POST',
        url: `${API_URL}/learning_topic/create`,
        data: {
            name, info, course_home, code
        }
    })
}

export const editLearningTopic = (data) => {
    const { token, name, info, id } = data
    return axios.request({
        headers: { 'Content-Type': 'application/json', 'Authorization': `token ${token}` },
        method: 'PUT',
        url: `${API_URL}/learning_topic/${id}`,
        data: {
            name, info
        }
    })
}

export const deleteLearningTopic = (data) => {
    const { token, id } = data
    return axios.request({
        headers: { 'Content-Type': 'application/json', 'Authorization': `token ${token}` },
        method: 'DELETE',
        url: `${API_URL}/learning_topic/${id}`
    })
}


export const createTopicAsset = (data) => {

    const { token, name, info, learning_topic, file_type, file } = data
    const formData = new FormData()
    formData.set("name", name)
    formData.set("info", info)
    formData.set("learning_topic", learning_topic)
    formData.set("file_type", file_type)
    formData.append("file", file)

    return axios.request({
        headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `token ${token}` },
        method: 'POST',
        url: `${API_URL}/topic_asset/create`,
        data: formData
    })
}



export const editTopicAsset = (data) => {
    const { token, name, info, file_type, file, id } = data
    const formData = new FormData()
    formData.set("name", name)
    formData.set("info", info)
    formData.set("file_type", file_type)
    if (file !== undefined && file !== null) {
        formData.append("file", file)
    }
    return axios.request({
        headers: { 'Content-Type': 'application/json', 'Authorization': `token ${token}` },
        method: 'PUT',
        url: `${API_URL}/topic_asset/${id}`,
        data: formData
    })
}

export const deleteTopicAsset = (data) => {
    const { token, id } = data
    return axios.request({
        headers: { 'Content-Type': 'application/json', 'Authorization': `token ${token}` },
        method: 'DELETE',
        url: `${API_URL}/topic_asset/${id}`
    })
}

export const getAssignmentDetailAPI = (data) => {
    const { token, assignment } = data
    return axios.request({
        headers: { 'Content-Type': 'application/json', 'Authorization': `token ${token}` },
        method: 'GET',
        url: `${API_URL}/assignment/${assignment}`,
    })
}

export const createAssignment = (data) => {

    const { token, name, info, learning_topic, max_score, max_submit_time, start_date, due_date, files } = data
    const formData = new FormData()
    formData.set("name", name)
    formData.set("info", info)
    formData.set("learning_topic", learning_topic)
    formData.set("max_score", max_score)
    formData.set("max_submit_time", max_submit_time)
    formData.set("start_date", start_date)
    formData.set("due_date", due_date)
    files.forEach(file => formData.append("file[]", file.file, file.fileName))

    return axios.request({
        headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `token ${token}` },
        method: 'POST',
        url: `${API_URL}/assignment`,
        data: formData
    })
}

export const deleteAssigment = (data) => {
    const { token, id } = data
    return axios.request({
        headers: { 'Content-Type': 'application/json', 'Authorization': `token ${token}` },
        method: 'DELETE',
        url: `${API_URL}/assignment/${id}`
    })
}

export const getStudentAssignmentAPI = (data) => {
    const { token, assignment } = data

    return axios.request({
        headers: { 'Content-Type': 'application/json', 'Authorization': `token ${token}` },
        method: 'GET',
        url: `${API_URL}/assignment/student`,
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
        url: `${API_URL}/assignment/student/submit`,
        data: formData
    })
}