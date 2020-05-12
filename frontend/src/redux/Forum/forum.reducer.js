import ForumTypes from './forum.types'

const initState = {
    forums: null,
    forumDetail: null,
    threads: null,
    threadDetail: null,

    isGetting: false,
    errorResponse: null
}

const forumReducer = (state = initState, action) => {
    switch (action.type) {
        case ForumTypes.GET_FORUMS_START:
        case ForumTypes.GET_FORUM_DETAIL_START:
        case ForumTypes.GET_THREADS_START:
        case ForumTypes.GET_THREAD_DETAIL_START:
            return {...state, isGetting: true}

        case ForumTypes.GET_FORUMS_SUCCESS:
            return {...state, isGetting: false, forums: action.payload}

        case ForumTypes.GET_FORUM_DETAIL_SUCCESS:
            return {...state, isGetting: false, forumDetail: action.payload}

        case ForumTypes.GET_THREADS_SUCCESS:
            return {...state, isGetting: false, threads: action.payload}

        case ForumTypes.GET_THREAD_DETAIL_SUCCESS:
            return {...state, isGetting: false, threadDetail: action.payload}

        case ForumTypes.GET_FORUMS_FAIL:
        case ForumTypes.GET_FORUM_DETAIL_FAIL:
        case ForumTypes.GET_THREADS_FAIL:
        case ForumTypes.GET_THREAD_DETAIL_FAIL:
            return {...state, isGetting: false, errorResponse: action.payload}

        default:
            return state
    }
}

export default forumReducer