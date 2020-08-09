import React, {useEffect} from 'react'
import { Skeleton, Button, Modal, Row, Col, Form, Upload, Input } from "antd";
import CourseHomeTopic from "./course-home-topic.component";
import { useState } from 'react';

import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

import { createLearningTopic, editLearningTopic } from '../../api/courseHome.services'

import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import { message } from 'antd';
import slugify from 'slugify';

import { deleteLearningTopic } from '../../api/courseHome.services';


const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
};
const normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
        return e;
    }
    return e && e.fileList;
};

const CourseHomeSchedule = ({ topics, isLoading, userRole, token, course }) => {

    const [showModal, setShowModal] = useState(false)
    const [info, setInfo] = useState("")
    const [name, setName] = useState("")
    const [loading, setLoading] = useState(false)
    const [learningTopics, setTopic] = useState([])
    const [isDeleting, setDeleting] = useState(false)
    const [editingTopic, setEditingTopic] = useState(null)

    useEffect(() => {
        if (topics && topics.length > 0) {
            setTopic(topics)
        }
    }, [topics])

    const onFinish = values => {
        if (editingTopic === null) {
            createTopic(values.name, info)
        }
        editTopic(values.name, info)
    };

    const handleDelete = async (id) => {
        const data = { token, id: id }
        setDeleting(true)
        try {
            const result = await deleteLearningTopic(data)
            const updateTopics = learningTopics.filter(topic => topic.id != id)
            setTopic(updateTopics)
            message.success("Xoá thành công")
        } catch (err) {
            message.error(err.message)
        }
        setDeleting(false)
    }

    const createTopic = async (name, info) => {
        setLoading(true)
        const data = {
            token, course_home: course, name, info, code: slugify(name)
        }
        try {
            const result = await createLearningTopic(data)
            const newTopic = result.data.data
            learningTopics.push(newTopic)
            setTopic(learningTopics)
            message.success("Tạo mới chủ đề học thành công")
            setShowModal(false)
        } catch (err) {
            message.error("Có lỗi xảy ra: " + err.message)
        }
        setLoading(false)
    }

    const triggerEdit = (id) => {
        setEditingTopic(id)
        const topicToEdit = learningTopics.find(topic => topic.id === id)
        setInfo(topicToEdit.info)
        setName(topicToEdit.name)
        setShowModal(true)
    }


    const editTopic = async (name, info, id) => {
        setLoading(true)
        const data = {
            token, name, info, id
        }

        try {
            const result = await editLearningTopic(data)
        } catch (err) {
            message.error(err.message)
        }
    }

    const handleClose = () => {
        setShowModal(false)
    }
    
    return (
        <section className="section-5 page-2">

            <Row>
                <Col span={10}><h3 className="text--main mb-5">Chủ đề học</h3></Col>
                <Col span={4}>{
                    userRole.code
                        ? userRole.code === "TC" ?
                            <Button onClick={() => {
                                setShowModal(true)
                            }
                            } type="primary">Thêm chủ đề học</Button> : null
                        : null
                }</Col>
            </Row>


            {
                isLoading ? (
                    <div>
                        <Skeleton active avatar />
                        <Skeleton active avatar />
                        <Skeleton active avatar />
                        <Skeleton active avatar />
                        <Skeleton active avatar />
                    </div>
                ) : learningTopics.map(topic =>
                    <Skeleton active avatar paragraph={{ rows: 4 }} loading={isDeleting}>
                         <CourseHomeTopic
                            handleDelete={handleDelete}
                            triggerEdit={triggerEdit}
                            userRole={userRole}
                            key={topic.id}
                            topic={topic}
                            token={token}
                        />
                    </Skeleton>
                    )
            }


            <Modal
                destroyOnClose={true}
                width={920}
                style={{ paddingBottom: "0px" }}
                className="bg-white"
                title="Tạo mới chủ đề học"
                visible={showModal}
                confirmLoading={loading}
                footer={[
                    <Button key="back" danger onClick={handleClose}>
                        Huỷ
                    </Button>
                ]}
                onCancel={handleClose}

            >
                <Form
                    name="validate_other"
                    {...formItemLayout}
                    onFinish={onFinish}
                    initialValues={{
                        name: name
                    }}
                >
                    <Form.Item
                        {...formItemLayout}
                        name="name"
                        label="Tên chủ đề"
                        rules={[
                            {
                                required: true,
                                message: 'Nhập tên chủ đề',
                            },
                        ]}
                    >
                        <Input placeholder="Nhập tên chủ đề" value={name}/>
                    </Form.Item>
                    
                    <Form.Item
                        {...formItemLayout}
                        name="info"
                        label="Mô tả chủ đề"
                    >
                        
                        <CKEditor
                            key="editor"
                            editor={ClassicEditor}
                            data={info}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                setInfo(data)
                            }}
                        >

                        </CKEditor>
                    </Form.Item>
                    <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                        <Button type="primary" htmlType="submit" disabled={loading}>
                            Xác nhận
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </section>


    )
};

export default CourseHomeSchedule;