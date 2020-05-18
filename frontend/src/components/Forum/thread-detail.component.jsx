import React, {useEffect} from 'react'

import {useParams} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import {getThreadDetailStart} from "../../redux/Forum/forum.actions";
import {isGettingSelector, threadDetailSelector, threadRepliesSelector} from "../../redux/Forum/forum.selects";
import {createStructuredSelector} from "reselect";

import ThreadResponseModal from "./thread-reponse-modal.component";
import ThreadDetailHeader from "./thread-detail-header.component";
import ThreadResponses from "./thread-responses.component";
import ThreadModal from "./thread-modal.component";
import {currentUserSelector} from "../../redux/Auth/auth.selects";

const ThreadDetail = ({token}) => {
    const {thread_id} = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getThreadDetailStart({token, thread_id}))
    }, [])

    const {threadDetail, threadReplies, isLoading, user} = useSelector(createStructuredSelector({
        threadDetail: threadDetailSelector,
        threadReplies: threadRepliesSelector,
        isLoading: isGettingSelector,
        user: currentUserSelector
    }))


    return (
        <section className="section-5 page-2 thread">

            <ThreadDetailHeader token={token} thread_id={thread_id} threadDetail={threadDetail} />
            <ThreadResponses thread_id={thread_id} token={token}  user={user} threadReplies={threadReplies} isLoading={isLoading} />

        </section>
    )
}

export default ThreadDetail