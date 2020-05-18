import React, {useEffect, useState} from 'react'
import {Avatar, Button, Card, Dropdown, Menu, Skeleton} from "antd";
import {toggleReplyThreadModal} from "../../redux/UI/ui.actions";
import {parseHtml, timeDiff} from "../../utils/text.utils";
import {CaretDownOutlined} from "@ant-design/icons";
import {useDispatch} from "react-redux";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Constants from "../../constants";
import CKEditor from "@ckeditor/ckeditor5-react";
import {modifyResponseStart} from "../../redux/Forum/forum.actions";

const ThreadResponse = ({token, threadId, reply, handleDelete, user, isLoading}) => {

    const [editing, setEditing] = useState(false)
    const [editorState, setEditorState] = useState(null)
    const [replyContent, setReplyContent] = useState(reply.content)
    const dispatch = useDispatch()
    const {Meta} = Card


    const menu = (
        <Menu>
            <Menu.Item
                onClick={
                    () => handleDelete(reply.id)
                }
            >
                Xóa phản hồi
            </Menu.Item>
            <Menu.Item onClick={() => setEditing(true)}>
                Sửa phản hồi
            </Menu.Item>
        </Menu>
    );
    return (
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
                        editing ?
                            <div>
                                <CKEditor
                                    editor={ClassicEditor}
                                    data={reply.content}
                                    config={Constants.CKEDITOR_CONFIGS}
                                    onInit={editor => {
                                    }}
                                    onChange={(event, editor) => {
                                        const data = editor.getData();
                                        setEditorState(data)
                                    }}
                                />
                                <Button
                                    disabled={!editorState}
                                    onClick={() => {
                                        dispatch(modifyResponseStart({
                                            token, thread_id: threadId, responseId: reply.id, content: editorState
                                        }))
                                        setReplyContent(editorState)
                                        setEditing(false)
                                    }}
                                    type="primary"
                                    className="mt-2 mr-2">Xong</Button>
                                <Button type="dashed" className="mt-2" onClick={() => setEditing(false)}>Hủy</Button>
                            </div> :
                            <span className="text-info-normal ">
                                {parseHtml(replyContent)}
                            </span>}
                />
            </Skeleton>
        </Card>
    )
}

export default ThreadResponse