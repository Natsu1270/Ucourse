import React, {useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {replyThreadModalSelector} from "../../redux/UI/ui.selects";
import {Form, message, Modal} from "antd";
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import {toggleReplyThreadModal} from "../../redux/UI/ui.actions";
import {createStructuredSelector} from "reselect";
import {errorResponseSelector, isGettingSelector} from "../../redux/Forum/forum.selects";
import Constants from "../../constants";

const ThreadResponseModal = ({token, thread_id, handleAddItem}) => {

    const dispatch = useDispatch()

    const {replyThreadModal, isCreating, errorResponse} = useSelector(createStructuredSelector({
        replyThreadModal: replyThreadModalSelector,
        isCreating: isGettingSelector,
        errorResponse: errorResponseSelector
    }))
    const [editorState, setEditorState] = useState(null)
    const [form] = Form.useForm()

    const handleOk = () => {
        form.submit()
    };

    const onFinish = (values) => {

        handleAddItem(editorState)
        dispatch(toggleReplyThreadModal())
        if (!isCreating && !errorResponse) {
            message.success(
                "Đã gửi phản hồi",
                1,
                () => {
                    // dispatch(toggleReplyThreadModal())
                })
        } else {
            message.error(errorResponse)
        }
    }

    const handleCancel = () => {
        dispatch(toggleReplyThreadModal())
    };

    const layout = {
        labelCol: {span: 4},
        wrapperCol: {span: 20},
    };

    const styles = {
        backgroundColor: '#fff',
    }
    const bodyStyles = {
        backgroundColor: '#fff',
    }

    return (
        <div>
            <Modal
                className="thread--modal"
                width={1000}
                style={styles}
                title="Phản hồi"
                bodyStyle={bodyStyles}
                visible={replyThreadModal}
                onOk={handleOk}
                confirmLoading={isCreating}
                onCancel={handleCancel}
            >
                <Form
                    form={form}
                    {...layout}
                    name="thread"
                    className="thread--form"
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="Nội dung"
                        name="content"
                        rules={[{required: true, message: 'Hãy nhập nội dung trả lời'}]}
                    >
                        <CKEditor
                            editor={ClassicEditor}
                            data={editorState}
                            config={Constants.CKEDITOR_CONFIGS}
                            onInit={editor => {
                            }}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                setEditorState(data)
                            }}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default ThreadResponseModal