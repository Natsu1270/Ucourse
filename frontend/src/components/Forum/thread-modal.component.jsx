import React, {useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {createThreadModalSelector} from "../../redux/UI/ui.selects";
import {Form, Input, Modal} from "antd";
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import {toggleCreateThreadModal} from "../../redux/UI/ui.actions";
import {createStructuredSelector} from "reselect";
import {errorResponseSelector, isGettingSelector} from "../../redux/Forum/forum.selects";
import {createThreadsStart} from "../../redux/Forum/forum.actions";
import Constants from "../../constants";

const ThreadModal = ({token, forum_id}) => {

    const dispatch = useDispatch()
    const {createThreadModal, isCreating, errorResponse} = useSelector(createStructuredSelector({
        createThreadModal: createThreadModalSelector,
        isCreating: isGettingSelector,
        errorResponse: errorResponseSelector
    }))

    const [editorState, setEditorState] = useState(null)
    const handleChange = (editorState) => {
        setEditorState(editorState)
    }


    const handleOk = () => {
        // dispatch(createThreadsStart({token, name, content}))
    };

    const handleCancel = () => {
        dispatch(toggleCreateThreadModal())
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
                bodyStyle={bodyStyles}
                title="Title"
                visible={createThreadModal}
                onOk={handleOk}
                confirmLoading={isCreating}
                onCancel={handleCancel}
            >
                <Form
                    {...layout}
                    name="thread"
                    className="thread--form"
                    // onFinish={onFinish}
                    // onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="Tên chủ đề"
                        name="name"
                        rules={[{required: true, message: 'Hãy nhập tên chủ đề'}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="Nội dung"
                        name="content"
                        rules={[{required: true, message: 'Hãy nhập nội dung chủ đề'}]}
                    >
                        <CKEditor
                            editor={ClassicEditor}
                            data={editorState}
                            onInit={editor => {
                                // You can store the "editor" and use when it is needed.
                                console.log('Editor is ready to use!', editor);
                            }}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                setEditorState(data)
                                console.log({event, editor, data});
                            }}
                        />
                    </Form.Item>

                </Form>
            </Modal>
        </div>
    )
}

export default ThreadModal