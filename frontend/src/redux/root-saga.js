import { all, call } from 'redux-saga/effects'

import { authSaga } from './Auth/auth.sagas'
import { profileSaga} from './Profile/profile.sagas';

export default function* rootSaga() {
    yield all([
        call(authSaga),
        call(profileSaga),
    ])
}