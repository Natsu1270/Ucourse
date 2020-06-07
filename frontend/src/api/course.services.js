import axios from 'axios'

const COURSE_API_URL = '/api/courses';


export const getCourseListAPI = () => {
    return axios.request({
        headers: { 'Content-Type': 'application/json' },
        method: 'GET',
        url: COURSE_API_URL
    })
};


export const getCourseDetailAPI = (slug) => {
    return axios.request({
        headers: { 'Content-Type': 'application/json' },
        method: 'GET',
        url: `${COURSE_API_URL}/${slug}`
    })
};

export const buyCourseAPI = (params) => {
    const {token, course} = params
    return axios.request({
        headers: { 'Content-Type': 'application/json', 'Authorization': `token ${token}` },
        method: 'POST',
        url: `${COURSE_API_URL}/user/buy`,
        data: {
            course
        }
    })
}

export const checkBoughtCourseAPI = (params) => {
    const {token, course} = params
    return axios.request({
        headers: { 'Content-Type': 'application/json', 'Authorization': `token ${token}` },
        method: 'POST',
        url: `${COURSE_API_URL}/user/check`,
        data: {
            course
        }
    })
}


