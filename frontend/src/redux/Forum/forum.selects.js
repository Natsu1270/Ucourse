import {createSelector} from 'reselect'

const forumSelector = state => state.forum

export const forumsSelector = createSelector(
    [forumSelector],
    forum => forum.forums ? forum.forums : []
)

export const forumDetailSelector = createSelector(
    [forumSelector],
    forum => forum.forumDetail ? forum.forumDetail : {}
)

export const threadsSelector = createSelector(
    [forumSelector],
    forum => forum.threads ? forum.threads : []
)

export const threadDetailSelector = createSelector(
    [forumSelector],
    forum => forum.threadDetail ? forum.threadDetail : {}
)

export const isGettingSelector = createSelector(
    [forumSelector],
    forum => forum.isGetting
)

export const errorResponseSelector = createSelector(
    [forumSelector],
    forum => forum.errorResponse
)