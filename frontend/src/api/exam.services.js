import axios from 'axios'

const API_URL = '/api/exams';

export const getExamDetailAPI = ({token, exam_id}) => {
    return axios.request({
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${token}`,
        },
        method: 'GET',
        url: `${API_URL}/${exam_id}`,
    })
}

export const getStudentExamList = ({ token, exam_id }) => {
    return axios.request({
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${token}`,
        },
        method: 'GET',
        url: `${API_URL}/student_exams`,
        params: {
            exam_id
        }
    })
}

export const submitExam = (params) => {
    const {token, exam, result, responses} = params
    return axios.request({
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${token}`,
        },
        method: 'POST',
        url: `${API_URL}/submit`,
        data: {
            exam, result, responses
        }
    })
}