import React, {useEffect, useState} from 'react'
import {Card} from "antd";
import {useDispatch} from "react-redux";
import {deleteThreadResponseStart} from "../../redux/Forum/forum.actions";
import ThreadResponse from "./thread-response.component";

const ThreadResponses = ({threadReplies, isLoading, user, token, thread_id}) => {
    const dispatch = useDispatch()
    const [replies, setReplies] = useState(threadReplies)
    useEffect(() => {
        if (threadReplies.length > 0) {
            setReplies(threadReplies)
        }
    }, [threadReplies])

    const deleteItem = (id) => {
        dispatch(deleteThreadResponseStart({token, responseId: id}))
        const remainReplies = replies.filter(r => r.id !== id)
        setReplies(remainReplies)
    }

    return (
        <Card style={{width: '100%', marginTop: 16}}>
            {
                replies.map(reply => <ThreadResponse
                   threadId={thread_id} token={token} user={user}
                   reply={reply} handleDelete={deleteItem}
                   isLoading={isLoading} />)
            }
        </Card>
    )
}

export default ThreadResponses