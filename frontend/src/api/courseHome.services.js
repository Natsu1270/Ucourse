import axios from 'axios'

const API_URL = '/api/course-home';


export const registerCourseAPI = ({course_id, token}) => {
    return axios.request({
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${token}`,
        },
        method: 'POST',
        url: `${API_URL}/register`,
        data: { course_id }
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