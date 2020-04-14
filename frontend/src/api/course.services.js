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


