import axios from 'axios'

const ABILITY_TEST_URL = '/api/ability-tests';

export const generateAbilityTestAPI = ({ability_test, token}) => {
    return axios.request({
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${token}`,
        },
        method: 'POST',
        url: `${ABILITY_TEST_URL}/create`,
        data: {ability_test : ability_test}
    })
};

export const submitAbilityTestAPI = ({user_responses, result, token, id}) => {
    return axios.request({
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${token}`,
        },
        method: 'PATCH',
        url: `${ABILITY_TEST_URL}/users/${id}`,
        data: {user_responses, result}
    })
}
