import ForumTypes from './forum.types'

const initState = {
    forums: null,
    forumDetail: null,
    threads: null,
    threadDetail: null,

    replyThread: null,

    isGetting: false,
    errorResponse: null
}

const forumReducer = (state = initState, action) => {
    switch (action.type) {
        case ForumTypes.GET_FORUMS_START:
        case ForumTypes.GET_FORUM_DETAIL_START:
        case ForumTypes.GET_THREADS_START:
        case ForumTypes.GET_THREAD_DETAIL_START:
        case ForumTypes.CREATE_THREADS_START:
        case ForumTypes.REPLY_THREAD_START:
        case ForumTypes.DELETE_THREAD_START:
        case ForumTypes.MODIFY_THREAD_START:
        case ForumTypes.DELETE_THREAD_RESPONSE_START:
        case ForumTypes.MODIFY_THREAD_RESPONSE_START:
            return {...state, isGetting: true}

        case ForumTypes.GET_FORUMS_SUCCESS:
            return {...state, isGetting: false, forums: action.payload}

        case ForumTypes.GET_FORUM_DETAIL_SUCCESS:
            return {...state, isGetting: false, forumDetail: action.payload}

        case ForumTypes.GET_THREADS_SUCCESS:
            return {...state, isGetting: false, threads: action.payload}

        case ForumTypes.GET_THREAD_DETAIL_SUCCESS:
            return {...state, isGetting: false, threadDetail: action.payload}

        case ForumTypes.CREATE_THREADS_SUCCESS:
        case ForumTypes.DELETE_THREAD_SUCCESS:
        case ForumTypes.MODIFY_THREAD_SUCCESS:
        case ForumTypes.DELETE_THREAD_RESPONSE_SUCCESS:
        case ForumTypes.MODIFY_THREAD_RESPONSE_SUCCESS:
            return {...state, isGetting: false}

        case ForumTypes.REPLY_THREAD_SUCCESS:
            return {...state, isGetting: false, replyThread: action.payload}

        case ForumTypes.GET_FORUMS_FAIL:
        case ForumTypes.GET_FORUM_DETAIL_FAIL:
        case ForumTypes.GET_THREADS_FAIL:
        case ForumTypes.GET_THREAD_DETAIL_FAIL:
        case ForumTypes.CREATE_THREADS_FAIL:
        case ForumTypes.REPLY_THREAD_FAIL:
        case ForumTypes.DELETE_THREAD_FAIL:
        case ForumTypes.MODIFY_THREAD_FAIL:
        case ForumTypes.DELETE_THREAD_RESPONSE_FAIL:
        case ForumTypes.MODIFY_THREAD_RESPONSE_FAIL:
            return {...state, isGetting: false, errorResponse: action.payload}

        default:
            return state
    }
}

export default forumReducer