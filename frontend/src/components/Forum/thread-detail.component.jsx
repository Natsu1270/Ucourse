import React, {useEffect} from 'react'

import {useParams} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import {getThreadDetailStart} from "../../redux/Forum/forum.actions";
import {isGettingSelector, threadDetailSelector, threadRepliesSelector} from "../../redux/Forum/forum.selects";
import {Avatar, Card, Skeleton, Tag} from "antd";
import {createStructuredSelector} from "reselect";

import {FieldTimeOutlined, MessageOutlined} from '@ant-design/icons'
import {parseHtml, timeDiff} from "../../utils/text.utils";
import ThreadTitle from "./thread-title.component";
import ThreadDescription from "./thread-description.component";

const ThreadDetail = ({token}) => {
    const {thread_id} = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getThreadDetailStart({token, thread_id}))
    }, [])

    const {threadDetail, threadReplies, isLoading} = useSelector(createStructuredSelector({
        threadDetail: threadDetailSelector,
        threadReplies: threadRepliesSelector,
        isLoading: isGettingSelector
    }))

    const {Meta} = Card

    return (
        <section className="section-5 page-2 thread">

            <Card
                style={{width: '80%', marginTop: 16}}
                actions={[
                    <MessageOutlined key="setting"/>,
                ]}
            >
                <Skeleton loading={isLoading} avatar active>
                    <Meta
                        avatar={
                            <Avatar
                                size={48}
                                src={threadDetail.created_by ? threadDetail.created_by.user_profile.avatar : ""}/>
                        }
                        title={<ThreadTitle threadDetail={threadDetail} /> }
                        description={<ThreadDescription threadDetail={threadDetail} /> }
                    />
                </Skeleton>
            </Card>

            <Card style={{width: '80%', marginTop: 16}}>
                {
                    threadReplies.map(reply => (
                        <Card hoverable={true} type="inner" className="mb-5">
                            <Skeleton loading={isLoading} avatar active>
                                <Meta
                                    avatar={
                                        <Avatar
                                            size={48}
                                            src={reply.created_by ? reply.created_by.user_profile.avatar:""}/>
                                    }
                                    title={
                                        <div>
                                            <span className="thread--user mr-3">{reply.created_by ? reply.created_by.user_profile.fullname : ''}</span>
                                            <span className="text-info-sub">&middot; {timeDiff(reply.timestamp)}</span>
                                        </div>
                                    }
                                    description={<span className="text-info-normal">{parseHtml(reply.content)}</span>}
                                />
                            </Skeleton>
                        </Card>
                    ))
                }
            </Card>

        </section>
    )
}

export default ThreadDetail