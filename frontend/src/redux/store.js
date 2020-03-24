import { createStore, applyMiddleware } from "redux"
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import { persistStore, persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage'

import logger from 'redux-logger'

import rootReducer from './root-reducer'
import rootSaga from './root-saga'

const sagaMiddleware = createSagaMiddleware()

const middlewares = [sagaMiddleware]


if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger)
}

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth','profile']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(persistedReducer, composeWithDevTools(
    applyMiddleware(...middlewares)
))

export const persistor = persistStore(store)

sagaMiddleware.run(rootSaga)

export default { store, persistor }