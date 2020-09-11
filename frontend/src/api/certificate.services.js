import axios from 'axios'

const API_URL = '/api/certificate'

export function CertificateInquiry(uuid) {

    return axios.request({
        headers: { 'Content-Type': 'application/json' },
        method: 'GET',
        url: `${API_URL}/inquiry`,
        params: { uuid }
    })
}