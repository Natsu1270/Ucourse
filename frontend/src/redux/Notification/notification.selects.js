import { createSelector } from 'reselect'

const notificationsSelector = state => state.notifications;

export const myNotificationsSelector = createSelector(
    [notificationsSelector],
    notifications => notifications.notifications ? notifications.notifications : []
);

export const favCourseCountSelector = createSelector(
    [notificationsSelector],
    notifications => notifications.favCourseCount ? notifications.favCourseCount : 0
);

export const fetchingNotificationSelector = createSelector(
    [notificationsSelector],
    notifications => notifications.isFetching
);