import {createStore, applyMiddleware} from "redux"
import createSagaMiddleware from 'redux-saga'

import logger from 'redux-logger'

const sagaMiddleware = createSagaMiddleware()

const middlewares = [sagaMiddleware]

if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger)
}

export const store = createStore()

sagaMiddleware.run()

export default {store}