import axios from 'axios'

const API_URL = '/api/course-home';


export const registerCourseAPI = ({course_id, token, class_id}) => {
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

export const unRegisterCourseAPI = ({token, class_id}) => {
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


export const fetchMyCourseHomesAPI = ({token}) => {
    return axios.request({
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${token}`,
        },
        method: 'GET',
        url: `${API_URL}/my`,
    })
};

export const getCourseHomeDetailAPI = ({slug, token}) => {
    return axios.request({
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${token}`,
        },
        method: 'GET',
        url: `${API_URL}/${slug}`
    })
}