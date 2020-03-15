import { combineReducers } from 'redux'

import authReducer from './Auth/auth.reducers'
import uiReducer from './UI/ui.reducers'
import courseReducer from './Course/course.reducers'


const rootReducer = combineReducers({
    auth: authReducer,
    ui: uiReducer,
    course: courseReducer
})

export default rootReducer