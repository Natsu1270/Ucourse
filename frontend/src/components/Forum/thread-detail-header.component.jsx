import React, {useEffect, useState} from 'react'
import {useHistory, useParams} from 'react-router-dom'

import {Avatar, Card, message, Popconfirm, Skeleton} from "antd";
import {toggleCreateThreadModal, toggleReplyThreadModal} from "../../redux/UI/ui.actions";
import {DeleteOutlined, MessageOutlined, SettingOutlined} from "@ant-design/icons";
import {deleteThreadStart} from "../../redux/Forum/forum.actions";
import ThreadTitle from "./thread-title.component";
import ThreadDescription from "./thread-description.component";
import {useDispatch, useSelector} from "react-redux";
import {createStructuredSelector} from "reselect";
import {errorResponseSelector, isGettingSelector} from "../../redux/Forum/forum.selects";
import {currentUserSelector} from "../../redux/Auth/auth.selects";
import ThreadModal from "./thread-modal.component";

const ThreadDetailHeader = ({token, threadDetail, thread_id}) => {

    const history = useHistory()
    const dispatch = useDispatch()
    const {forum_id} = useParams()
    const {Meta} = Card
    const [deleted, setDeleted] = useState(false)

    const {isLoading, errorResponse, user} = useSelector(createStructuredSelector({
        isLoading: isGettingSelector,
        errorResponse: errorResponseSelector,
        user: currentUserSelector,
    }))

    function confirm(e) {
        dispatch(deleteThreadStart({token, thread_id}))
        setDeleted(true)
    }

    useEffect(() => {
        if (deleted) {
            if (!isLoading && errorResponse) {
                message.error(errorResponse)
            } else if (!isLoading && !errorResponse) {
                message.success('Xóa thành công', 1, () => history.goBack())
            }
        }
    }, [deleted, isLoading])

    const actions = [<span key="reply" className="mr-5" onClick={() => dispatch(toggleReplyThreadModal())}>
                        <MessageOutlined className="mr-2"/>
                        Trả lời
                    </span>]
    if (threadDetail.created_by && threadDetail.created_by.id === user.id) {
        actions.push(
            <span key="setting" onClick={()=>dispatch(toggleCreateThreadModal())}>
                <SettingOutlined className="mr-2"/>
                Chỉnh sửa
            </span>
        )
        actions.push(
            <Popconfirm
                disabled={deleted}
                title="Bạn có chắc muốn xóa chủ đề này?"
                onConfirm={confirm}
                okText="OK"
                cancelText="Hủy"
            >
                <span key="delete">
                    <DeleteOutlined className="mr-2"/> Xóa
                </span>
            </Popconfirm>
        )
    }

    return (
        <div>
            <Card
                style={{width: '100%', marginTop: 16}}
                actions={actions}
            >
                <Skeleton loading={isLoading} avatar active>
                    <Meta
                        avatar={
                            <Avatar
                                size={48}
                                src={threadDetail.created_by ? threadDetail.created_by.user_profile.avatar : ""}/>
                        }
                        title={<ThreadTitle threadDetail={threadDetail}/>}
                        description={<ThreadDescription threadDetail={threadDetail}/>}
                    />
                </Skeleton>
            </Card>
            <ThreadModal
                token={token}
                thread_id={thread_id}
                forum_id={forum_id}
                name={threadDetail.name}
                content={threadDetail.content}
                isCreate={false}
            />
        </div>

    )
}

export default ThreadDetailHeader