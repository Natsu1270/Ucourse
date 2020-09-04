import { takeLatest, all, call, put } from 'redux-saga/effects'

import NotificationActionTypes from "./notification.types"
import * as NotificaitonActions from './notification.actions'
import * as NotificationServices from '../../api/notification.services'

export function* getMyNotifications({ payload }) {
    try {
        let { data } = yield call(NotificationServices.getMyNotificationList, payload)
        yield put(NotificaitonActions.getMyNotificationsSuccess(data.data))
    } catch (err) {
        yield put(NotificaitonActions.getMyNotificationsFail(err.response))
    }
}

export function* onGetMyNotifications() {
    yield takeLatest(NotificationActionTypes.GET_MY_NOTIFICATIONS_START, getMyNotifications)
}


export default function* notificationSaga() {
    yield all([
        call(onGetMyNotifications),
    ])
}