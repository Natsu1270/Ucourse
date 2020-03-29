import axios from 'axios'


const SEARCH_API_URL = '/api/search';
const TAGS_API_URL = '/api/tags/';

export function simpleSearch(keyword) {
    return axios.request(
        {
            headers: { 'Content-Type': 'application/json' },
            method: 'GET',
            url: SEARCH_API_URL,
            params: {
                query: keyword
            }
        }
    )
}

export function getPopularSearchKeywordsAPI() {
    return axios.request(
        {
            headers: { 'Content-Type': 'applications/json' },
            method: 'GET',
            url: `${TAGS_API_URL}keywords`
        }
    )
}