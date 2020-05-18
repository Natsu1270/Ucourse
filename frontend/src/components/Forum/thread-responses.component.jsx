import React, {useEffect, useState} from 'react'
import {Card} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {deleteThreadResponseStart, replyThreadStart} from "../../redux/Forum/forum.actions";
import ThreadResponse from "./thread-response.component";
import ThreadResponseModal from "./thread-reponse-modal.component";
import {replyThreadSelector} from "../../redux/Forum/forum.selects";

const ThreadResponses = ({threadReplies, isLoading, user, token, thread_id}) => {
    const dispatch = useDispatch()
    const [replies, setReplies] = useState(threadReplies)
    const replyThread = useSelector(state=>replyThreadSelector(state))

    useEffect(() => {
        if (threadReplies.length > 0) {
            setReplies(threadReplies)
        }
    }, [threadReplies])

    useEffect(() => {
        if (replyThread.content) {
            setReplies([replyThread, ...replies])
        }
    }, [replyThread])

    const deleteItem = (id) => {
        dispatch(deleteThreadResponseStart({token, responseId: id}))
        const remainReplies = replies.filter(r => r.id !== id)
        setReplies(remainReplies)
    }

    const addItem = (content) => {
        dispatch(replyThreadStart({token, thread: thread_id, content}))
        // const currentReplies = replies.push(item)
        // setReplies(currentReplies)
    }

    return (
        <div>
            <Card style={{width: '100%', marginTop: 16}}>
                {
                    replies.map(reply => <ThreadResponse
                        key={reply.id}
                        threadId={thread_id} token={token} user={user}
                        reply={reply} handleDelete={deleteItem}
                        isLoading={isLoading}/>)
                }
            </Card>
            <ThreadResponseModal handleAddItem={addItem} token={token} thread_id={thread_id}/>
        </div>
    )
}

export default ThreadResponses