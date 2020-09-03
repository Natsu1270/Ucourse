import axios from 'axios'


const SEARCH_API_URL = '/api/search';
const TAGS_API_URL = '/api/tags/';

export function simpleSearch({ token, query }) {
    const headers = token ? { 'Content-Type': 'application/json', 'Authorization': `token ${token}` } : { 'Content-Type': 'application/json' }
    return axios.request(
        {
            headers,
            method: 'GET',
            url: SEARCH_API_URL,
            params: {
                query
            }
        }
    )
}

export function advancedSearchAPI(params) {
    const { token } = params
    const headers = token ? { 'Content-Type': 'application/json', 'Authorization': `token ${token}` } : { 'Content-Type': 'application/json' }
    return axios.request({
        headers,
        method: 'GET',
        url: SEARCH_API_URL + '/advanced',
        params
    })
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