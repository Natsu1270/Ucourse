import axios from 'axios'

const API_URL = '/api/grade'


export const getStudentGradesByCourseHomeAPI = ({ token, courseHomeId }) => {
    return axios.request({
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${token}`,
        },
        method: 'GET',
        url: `${API_URL}/student_grades`,
        params: { courseHomeId }
    })
};

export const getAllStudentGradesByCourseHomeAPI = ({ token, courseHomeId }) => {
    return axios.request({
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${token}`,
        },
        method: 'GET',
        url: `${API_URL}/all_grades`,
        params: { courseHomeId }
    })
};

export const updateStudentAssignmentGrade = ({ token, studentAssignmentId, score }) => {
    return axios.request({
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${token}`,
        },
        method: 'POST',
        url: `${API_URL}/assignment/update`,
        data: { studentAssignmentId, score }
    })
};



export const updateStudentCourseHomeGrade = ({ token, studentCourseHomeId, grade }) => {
    return axios.request({
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${token}`,
        },
        method: 'POST',
        url: `${API_URL}/student_coursehome/update`,
        data: { studentCourseHomeId, grade }
    })
};


export const updateMultiStudentCourseHomeGrade = ({ token, selectedRows }) => {
    return axios.request({
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${token}`,
        },
        method: 'POST',
        url: `${API_URL}/student_coursehome/multi-update`,
        data: selectedRows
    })
};