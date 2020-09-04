import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { createThreadModalSelector } from "../../redux/UI/ui.selects";
import { Form, Input, message, Modal } from "antd";
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { toggleCreateThreadModal } from "../../redux/UI/ui.actions";
import { createStructuredSelector } from "reselect";
import { errorResponseSelector, isGettingSelector } from "../../redux/Forum/forum.selects";
import { createThreadsStart, modifyThreadStart } from "../../redux/Forum/forum.actions";
import Constants from "../../constants";

const ThreadModal = ({ token, forum_id, thread_id, isCreate, name, content, courseHomeId }) => {

    const dispatch = useDispatch()
    const { createThreadModal, isCreating, errorResponse } = useSelector(createStructuredSelector({
        createThreadModal: createThreadModalSelector,
        isCreating: isGettingSelector,
        errorResponse: errorResponseSelector
    }))
    const [editorState, setEditorState] = useState(content)
    const [form] = Form.useForm()

    const handleOk = () => {
        form.submit()
    };

    const onFinish = (values) => {
        if (isCreate) {
            dispatch(createThreadsStart({ token, forum: forum_id, name: values['name'], content: editorState, courseHomeId }))
        } else {
            dispatch(modifyThreadStart({ token, forum: forum_id, thread_id, name: values['name'], content: editorState }))
        }
        dispatch(toggleCreateThreadModal())
        if (!errorResponse) {
            message.success(
                isCreate ? "Tạo chủ đề thành công" : "Chỉnh sửa chủ đề thành công",
                1,
                () => {
                    window.location.reload(false);
                })
        } else {
            message.error(errorResponse)
        }
    }

    const handleCancel = () => {
        dispatch(toggleCreateThreadModal())
    };

    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
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
                bodyStyle={bodyStyles}
                title="Tạo một chủ đề thảo luận"
                visible={createThreadModal}
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
                    initialValues={{ name: name }}
                // onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="Tên chủ đề"
                        name="name"
                        rules={[{ required: true, message: 'Hãy nhập tên chủ đề' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Nội dung"
                        name="content"
                        rules={[{ required: true, message: 'Hãy nhập nội dung chủ đề' }]}
                    >
                        <CKEditor
                            editor={ClassicEditor}
                            data={content}
                            config={Constants.CKEDITOR_CONFIGS}
                            onInit={editor => {
                                // You can store the "editor" and use when it is needed.
                                console.log('Editor is ready to use!', editor);
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

export default ThreadModal