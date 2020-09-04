import { createSelector } from 'reselect'

const notificationsSelector = state => state.notifications;

export const myNotificationsSelector = createSelector(
    [notificationsSelector],
    notifications => notifications.notifications ? notifications.notifications : []
);

export const fetchingNotificationSelector = createSelector(
    [notificationsSelector],
    notifications => notifications.isFetching
);