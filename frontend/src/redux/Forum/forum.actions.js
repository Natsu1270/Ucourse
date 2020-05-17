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

export const getThreadDetailSuccess = (threadDetail) => ({
    type: ForumTypes.GET_THREAD_DETAIL_SUCCESS,
    payload: threadDetail
});

export const getThreadDetailFail = (err) => ({
    type: ForumTypes.GET_THREAD_DETAIL_FAIL,
    payload: err
});

export const createThreadsStart = (params) => ({
    type: ForumTypes.CREATE_THREADS_START,
    payload: params
});

export const createThreadsSuccess = () => ({
    type: ForumTypes.CREATE_THREADS_SUCCESS,
});

export const createThreadsFail = (err) => ({
    type: ForumTypes.CREATE_THREADS_FAIL,
    payload: err
});

export const replyThreadStart = (params) => ({
    type: ForumTypes.REPLY_THREAD_START,
    payload: params
});

export const replyThreadSuccess = (reply) => ({
    type: ForumTypes.REPLY_THREAD_SUCCESS,
    payload: reply
});

export const replyThreadFail = (err) => ({
    type: ForumTypes.REPLY_THREAD_FAIL,
    payload: err
});

export const deleteThreadStart = (params) => ({
    type: ForumTypes.DELETE_THREAD_START,
    payload: params
});

export const deleteThreadSuccess = () => ({
    type: ForumTypes.DELETE_THREAD_SUCCESS,
});

export const deleteThreadFail = (err) => ({
    type: ForumTypes.DELETE_THREAD_FAIL,
    payload: err
});

export const modifyThreadStart = (params) => ({
    type: ForumTypes.MODIFY_THREAD_START,
    payload: params
});

export const modifyThreadSuccess = () => ({
    type: ForumTypes.MODIFY_THREAD_SUCCESS,
});

export const modifyThreadFail = (err) => ({
    type: ForumTypes.MODIFY_THREAD_FAIL,
    payload: err
});

export const deleteThreadResponseStart = (params) => ({
    type: ForumTypes.DELETE_THREAD_RESPONSE_START,
    payload: params
});

export const deleteThreadResponseSuccess = () => ({
    type: ForumTypes.DELETE_THREAD_RESPONSE_SUCCESS,
});

export const deleteThreadResponseFail = (err) => ({
    type: ForumTypes.DELETE_THREAD_FAIL,
    payload: err
});

export const modifyResponseStart = (params) => ({
    type: ForumTypes.MODIFY_THREAD_RESPONSE_START,
    payload: params
});

export const modifyResponseSuccess = () => ({
    type: ForumTypes.MODIFY_THREAD_RESPONSE_SUCCESS,
});

export const modifyResponseFail = (err) => ({
    type: ForumTypes.MODIFY_THREAD_RESPONSE_FAIL,
    payload: err
});