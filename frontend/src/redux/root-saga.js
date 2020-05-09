import { all, call } from 'redux-saga/effects'

import { authSaga } from './Auth/auth.sagas'
import { profileSaga} from './Profile/profile.sagas'
import { searchSaga } from './Search/search.sagas'
import { fieldSaga } from './Field/field.saga'
import { courseSaga } from './Course/course.sagas'
import { programSaga } from './Program/program.sagas'
import { abilityTestSaga } from './AbilityTest/abilityTest.sagas'
import courseHomeSaga from './CourseHome/course-home.sagas'
import homeSaga from "./Home/home.sagas"
import examSaga from './Exam/exam.sagas'

export default function* rootSaga() {
    yield all([
        call(authSaga),
        call(profileSaga),
        call(searchSaga),
        call(fieldSaga),
        call(courseSaga),
        call(programSaga),
        call(abilityTestSaga),
        call(courseHomeSaga),
        call(homeSaga),
        call(examSaga),
    ])
}