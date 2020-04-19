import { combineReducers } from 'redux'

import authReducer from './Auth/auth.reducers'
import uiReducer from './UI/ui.reducers'
import courseReducer from './Course/course.reducers'
import profileReducer from './Profile/profile.reducer'
import searchReducer from './Search/search.reducer'
import fieldReducer from './Field/field.reducer'
import programReducer from './Program/program.reducers'
import abilityTestReducer from './AbilityTest/abilityTest.reducer'
import courseHomeReducer from './CourseHome/course-home.reducer'


const rootReducer = combineReducers({
    auth: authReducer,
    ui: uiReducer,
    course: courseReducer,
    program: programReducer,
    profile: profileReducer,
    search: searchReducer,
    field: fieldReducer,
    abilityTest: abilityTestReducer,
    courseHome: courseHomeReducer,
});

export default rootReducer