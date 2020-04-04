import { combineReducers } from 'redux'

import authReducer from './Auth/auth.reducers'
import uiReducer from './UI/ui.reducers'
import courseReducer from './Course/course.reducers'
import profileReducer from './Profile/profile.reducer'
import searchReducer from './Search/search.reducer'
import fieldReducer from './Field/field.reducer'


const rootReducer = combineReducers({
    auth: authReducer,
    ui: uiReducer,
    course: courseReducer,
    profile: profileReducer,
    search: searchReducer,
    field: fieldReducer,
});

export default rootReducer