import NotificationActionTypes from './notification.types'

export const getMyNotificationsStart = (token) => ({
    type: NotificationActionTypes.GET_MY_NOTIFICATIONS_START,
    payload: token
});

export const getMyNotificationsSuccess = (notifications) => ({
    type: NotificationActionTypes.GET_MY_NOTIFICATIONS_SUCCESS,
    payload: notifications
});

export const getMyNotificationsFail = (err) => ({
    type: NotificationActionTypes.GET_MY_NOTIFICATIONS_FAIL,
    payload: err.response
});
