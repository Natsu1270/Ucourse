import axios from 'axios'

const ABILITY_TEST_URL = '/api/ability-tests';

export const generateAbilityTest = ({ability_test, token}) => {
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

