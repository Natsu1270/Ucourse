import React from 'react'
import { Skeleton, Button, Modal, Row, Col, Form, Upload, Input } from "antd";
import CourseHomeTopic from "./course-home-topic.component";
import { useState } from 'react';

import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

import { createLearningTopic } from '../../api/courseHome.services'

import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import { message } from 'antd';
import slugify from 'slugify';

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
    const [loading, setLoading] = useState(false)


    const onFinish = values => {
        createTopic(values.name, info)
    };

    const createTopic = async (name, info) => {
        setLoading(true)
        const data = {
            token, course_home: course, name, info, code: slugify(name)
        }
        const result = await createLearningTopic(data)
        if (result === 200) {
            message.success("Tạo mới chủ đề học thành công")
        } else {
            message.error("Có lỗi xảy ra: " + result.data)
        }
        setLoading(false)
    }

    return (
        <section className="section-5 page-2">

            <Row>
                <Col span={10}><h3 className="text--main mb-5">Chủ đề học</h3></Col>
                <Col span={4}>{
                    userRole.code
                        ? userRole.code === "TC" ?
                            <Button onClick={() => setShowModal(true)} type="primary">Thêm chủ đề học</Button> : null
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
                ) : topics.map(topic => <CourseHomeTopic key={topic.id} topic={topic} />)
            }


            <Modal
                width={920}
                style={{ paddingBottom: "0px" }}
                className="bg-white"
                title="Tạo mới chủ đề học"
                visible={showModal}
                confirmLoading={loading}
                footer={[
                    <Button key="back" danger onClick={() => setShowModal(false)}>
                        Huỷ
                    </Button>
                ]}

            >
                <Form
                    name="validate_other"
                    {...formItemLayout}
                    onFinish={onFinish}
                    initialValues={{
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
                        <Input placeholder="Nhập tên chủ đề" />
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        name="info"
                        label="Mô tả chủ đề"
                    >
                        <CKEditor
                            editor={ClassicEditor}
                            data={info}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                setInfo(data)
                            }}
                        >

                        </CKEditor>
                        <Input type="hidden" value={info} placeholder="Nhập mô tả chủ đề" />
                    </Form.Item>
                    <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                        <Button type="primary" htmlType="submit">
                            Xác nhận
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </section>


    )
};

export default CourseHomeSchedule;