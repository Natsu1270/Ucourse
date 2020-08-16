import axios from 'axios'
import { uuidv4 } from '../utils/common';
import MoMoService from './momo.service';

const COURSE_API_URL = '/api/courses';


export const getCourseListAPI = () => {
    return axios.request({
        headers: { 'Content-Type': 'application/json' },
        method: 'GET',
        url: COURSE_API_URL
    })
};


export const getCourseDetailAPI = async (params) => {
    const {slug, token} = params
    const headers = token ?
        {'Content-Type': 'application/json', 'Authorization': `token ${token}`} :
        {'Content-Type': 'application/json'}
    const detail =  axios.request({
        headers,
        method: 'GET',
        url: `${COURSE_API_URL}/${slug}`
    })
    return detail;
};

export const buyCourseAPI = async (params) => {
    const {token, course} = params;

    return axios.request({
        headers: { 'Content-Type': 'application/json', 'Authorization': `token ${token}`, 'Access-Control-Allow-Origin': '*' },
        method: 'POST',
        url: `${COURSE_API_URL}/user/buy`,
        data: {
            course
        }
    })
}

export const buyCourseSuccessAPI = async (params) => {
    const {token, course,
        partnerRefId, 
        requestId, 
        errorCode,
        extraData} = params;
    const data = axios.request({
        headers: { 'Content-Type': 'application/json', 'Authorization': `token ${token}`, 'Access-Control-Allow-Origin': '*' },
        method: 'POST',
        url: `${COURSE_API_URL}/user/buy/success`,
        data: {
            course,
            partnerRefId, 
            requestId, 
            errorCode,
            extraData
        }
    })
    return data;
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


