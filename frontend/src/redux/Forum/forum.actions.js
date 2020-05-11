import ForumTypes from "./forum.types";

export const getForumsStart = (params) => ({
    type: ForumTypes.GET_FORUMS_START,
    payload: params
});

export const getForumsSuccess = (forums) => ({
    type: ForumTypes.GET_FORUMS_SUCCESS,
    payload: forums
});

export const getForumsFail = (err) => ({
    type: ForumTypes.GET_FORUMS_FAIL,
    payload: err
});

export const getForumDetailStart = (params) => ({
    type: ForumTypes.GET_FORUM_DETAIL_START,
    payload: params
});

export const getForumDetailSuccess = (forum) => ({
    type: ForumTypes.GET_FORUM_DETAIL_SUCCESS,
    payload: forum
});

export const getForumDetailFail = (err) => ({
    type: ForumTypes.GET_FORUM_DETAIL_FAIL,
    payload: err
});

export const getThreadsStart = (params) => ({
    type: ForumTypes.GET_THREADS_START,
    payload: params
});

export const getThreadsSuccess = (threads) => ({
    type: ForumTypes.GET_THREADS_SUCCESS,
    payload: threads
});

export const getThreadsFail = (err) => ({
    type: ForumTypes.GET_THREADS_FAIL,
    payload: err
});

export const getThreadDetailStart = (params) => ({
    type: ForumTypes.GET_THREAD_DETAIL_START,
    payload: params
});

export const getThreadDetailSuccess = () => ({
    type: ForumTypes.GET_FORUM_DETAIL_SUCCESS,
});

export const getThreadDetailFail = (err) => ({
    type: ForumTypes.GET_THREAD_DETAIL_FAIL,
    payload: err
});