import axios from 'axios'

const API_URL = '/api/grade'


export const getStudentGradesAPI = ({ token, courseHomeId }) => {
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