import { all, call } from 'redux-saga/effects'

import { authSaga } from './Auth/auth.sagas'
import { profileSaga} from './Profile/profile.sagas'
import { searchSaga } from './Search/search.sagas'

export default function* rootSaga() {
    yield all([
        call(authSaga),
        call(profileSaga),
        call(searchSaga),
    ])
}