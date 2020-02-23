import { combineReducers} from 'redux'

import userReducer from './User/user.reducers'


const rootReducer = combineReducers({
    user: userReducer
})

export default rootReducer