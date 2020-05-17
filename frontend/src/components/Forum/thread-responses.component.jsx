import React, {useEffect, useState} from 'react'
import {Avatar, Button, Card, Dropdown, Menu, Popover, Skeleton} from "antd";
import {parseHtml, timeDiff} from "../../utils/text.utils";
import {DownOutlined, CaretDownOutlined} from '@ant-design/icons'
import {useDispatch} from "react-redux";
import {deleteThreadResponseStart} from "../../redux/Forum/forum.actions";
import ThreadResponseModal from "./thread-reponse-modal.component";
import {toggleReplyThreadModal} from "../../redux/UI/ui.actions";

const ThreadResponses = ({threadReplies, isLoading, user, token, thread_id}) => {
    const dispatch = useDispatch()
    const {Meta} = Card
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
                replies.map(reply => {
                    const menu = (
                        <Menu>
                            <Menu.Item
                                onClick={
                                    () => deleteItem(reply.id)
                                }
                            >
                                Xóa phản hồi
                            </Menu.Item>
                            <Menu.Item onClick={() => dispatch(toggleReplyThreadModal())}>
                                Sửa phản hồi
                            </Menu.Item>
                        </Menu>
                    );
                    return (
                        <div>
                            <Card hoverable={true} type="inner" className="mb-3 thread--reply-card">
                                <Skeleton loading={isLoading} avatar active>
                                    <Meta
                                        avatar={
                                            <Avatar
                                                size={48}
                                                src={reply.created_by ? reply.created_by.user_profile.avatar : ""}/>
                                        }
                                        title={
                                            <div className="dis-flex-between">
                                                <div>
                                             <span
                                                 className="thread--user mr-3">
                                                 {reply.created_by ? reply.created_by.user_profile.fullname : ''}
                                             </span>
                                                    <span
                                                        className="text-info-sub">&middot; {timeDiff(reply.timestamp)}</span>
                                                </div>
                                                {
                                                    reply.created_by.id === user.id ?
                                                        <Dropdown overlay={menu} placement="topCenter">
                                                            <CaretDownOutlined className="down-indict"/>
                                                        </Dropdown> : null
                                                }
                                            </div>
                                        }
                                        description={
                                            <span className="text-info-normal ">
                                        {parseHtml(reply.content)}
                                    </span>}
                                    />
                                </Skeleton>
                            </Card>
                            <ThreadResponseModal isCreate={false} token={token}
                                                 thread_id={thread_id} responseId={reply.id}
                                                 content={reply.content}
                            />
                        </div>
                    )
                })
            }
        </Card>
    )
}

export default ThreadResponses