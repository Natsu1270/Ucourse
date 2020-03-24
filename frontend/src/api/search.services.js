import axios from 'axios'


const SEARCH_API_URL = '/api/search';

export function simpleSearch(keyword) {
    return axios.request(
        {
            headers: {'Content-Type': 'application/json'},
            method: 'GET',
            url: SEARCH_API_URL,
            params: {
                query: keyword
            }
        }
    )
}