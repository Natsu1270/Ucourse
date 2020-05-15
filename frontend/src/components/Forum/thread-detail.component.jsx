import React, {useEffect} from 'react'

import {useParams} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import {getThreadDetailStart} from "../../redux/Forum/forum.actions";
import {isGettingSelector, threadDetailSelector} from "../../redux/Forum/forum.selects";
import {Avatar, Card, Skeleton} from "antd";
import {createStructuredSelector} from "reselect";

import {MessageOutlined} from '@ant-design/icons'
import {parseHtml} from "../../utils/text.utils";

const ThreadDetail = ({token}) => {
    const {thread_id} = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getThreadDetailStart({token, thread_id}))
    }, [])

    const {threadDetail, isLoading} = useSelector(createStructuredSelector({
        threadDetail: threadDetailSelector,
        isLoading: isGettingSelector
    }))

    const {Meta} = Card

    return (
        <section className="section-5 page-2">
            {
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
                                title={threadDetail.name}
                                description={parseHtml(threadDetail.content)}
                            />
                        </Skeleton>
                    </Card>
            }
        </section>
    )
}

export default ThreadDetail