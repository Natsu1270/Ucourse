import { combineReducers } from 'redux'

import authReducer from './Auth/auth.reducers'
import uiReducer from './UI/ui.reducers'


const rootReducer = combineReducers({
    auth: authReducer,
    ui: uiReducer
})

export default rootReducer