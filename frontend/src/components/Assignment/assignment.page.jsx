import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Skeleton, message, Descriptions, Badge, Button, Form, Upload } from "antd";
import { getAssignmentDetailAPI, submitAssignmentAPI, getStudentAssignmentAPI } from '../../api/courseHome.services'
import { formatDate, isTimeBefore, parseHtml } from '../../utils/text.utils';
import Constants from '../../constants';
import { showRLModal } from '../../redux/UI/ui.actions';
import Modal from 'antd/lib/modal/Modal';
import { InboxOutlined, UploadOutlined } from '@ant-design/icons'

const { Dragger } = Upload

const normFile = e => {
    if (Array.isArray(e)) {
        return e;
    }
    return e && e.fileList;
};

const AssignmentPage = ({ token }) => {

    const { assignmentId } = useParams();
    const [loading, setLoading] = useState(false)
    const [assignmentDetail, setAssignmentDetail] = useState({})
    const [studentAssignment, setStudentAssignment] = useState({})
    const [showModal, setShowModal] = useState(false)
    const [uploading, setUploading] = useState(false)

    const [form] = Form.useForm()

    const getAssignmentDetail = async () => {
        setLoading(true)
        const data = { token, assignment: assignmentId }
        try {
            const [assignmentRes, studentAssignmentRes] = await Promise.all([
                getAssignmentDetailAPI(data),
                getStudentAssignmentAPI(data)
            ])
            setAssignmentDetail(assignmentRes.data.data)
            if (studentAssignmentRes.data.result === true) {
                setStudentAssignment(studentAssignmentRes.data.data)
            }
        } catch (err) {
            message.error("Có lỗi xảy ra: " + err.message)
        }
        setLoading(false)
    }

    useEffect(() => {
        window.scrollTo(0, 0)
        if (assignmentId) {
            getAssignmentDetail()
        }
    }, [assignmentId])


    const submitAssignment = async (values) => {
        const fileList = values.files
        const formData = new FormData()
        fileList.forEach(file => {
            formData.append('files[]', file.originFileObj, file.name)
        })
        formData.set('assignment', assignmentDetail.id)
        const data = {
            token, formData
        }
        setUploading(true)
        try {
            const result = await submitAssignmentAPI(data)
            message.success("Xác nhận thành công")
        } catch (err) {
            message.error("Xác nhận không thành công: " + err.message)
        }
        setUploading(false)
    }



    return (
        <section className="section-5 page-2 course-lecture">
            {
                <div>
                    <div className="">
                        <Skeleton loading={loading} active>
                            <h3 className="text--main">
                                {assignmentDetail.name}
                            </h3>
                        </Skeleton>
                    </div>
                    <Skeleton loading={loading} active>
                        <p className="text--sub__bigger2">{parseHtml(assignmentDetail.info)}</p>
                        <Descriptions
                            title="" className="mb-5"
                            bordered layout="vertical"
                            column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
                            <Descriptions.Item label="Số lần nộp tối đa">
                                {assignmentDetail.max_submit_time ? assignmentDetail.max_submit_time : "Không giới hạn"}
                            </Descriptions.Item>
                            <Descriptions.Item label="Điểm">{assignmentDetail.max_score}</Descriptions.Item>
                            <Descriptions.Item label="Ngày bắt đầu">
                                {
                                    !isTimeBefore(assignmentDetail.start_date) ?
                                        <Badge status="processing" text={formatDate(assignmentDetail.start_date, Constants.MMM_Do__YY__TIME)} /> :
                                        <Badge status="warning" text={formatDate(assignmentDetail.start_date, Constants.MMM_Do__YY__TIME)} />
                                }
                            </Descriptions.Item>
                            <Descriptions.Item label="Deadline">
                                {
                                    !isTimeBefore(assignmentDetail.due_date) ?
                                        <Badge status="processing" text={formatDate(assignmentDetail.due_date, Constants.MMM_Do__YY__TIME)} /> :
                                        <Badge status="error" text={formatDate(assignmentDetail.due_date, Constants.MMM_Do__YY__TIME)} />
                                }
                            </Descriptions.Item>
                        </Descriptions>

                        <Descriptions
                            column={{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 2 }}
                            title="Bài nộp của tôi" bordered>
                            <Descriptions.Item label="Product">Cloud Database</Descriptions.Item>
                            <Descriptions.Item label="Billing Mode">Prepaid</Descriptions.Item>
                            <Descriptions.Item label="Automatic Renewal">YES</Descriptions.Item>
                            <Descriptions.Item label="Order time">2018-04-24 18:00:00</Descriptions.Item>
                            <Descriptions.Item label="Negotiated Amount">$80.00</Descriptions.Item>
                            <Descriptions.Item label="Discount">$20.00</Descriptions.Item>
                            <Descriptions.Item label="Official Receipts">$60.00</Descriptions.Item>
                        </Descriptions>
                    </Skeleton>
                    <div className="text-center mt-5">
                        <Button type="primary" onClick={() => setShowModal(true)}>
                            <UploadOutlined />Thêm bài nộp
                        </Button>
                    </div>
                </div>
            }

            <Modal
                onOk={() => form.submit()}
                okText="Gửi bài nộp"
                onCancel={() => setShowModal(false)}
                confirmLoading={uploading}
                cancelText="Hủy"
                visible={showModal}
                title="Thêm bài nộp"
                style={{ background: 'white', paddingBottom: '0' }}
            >
                <Form
                    form={form}
                    name="assignment_form"
                    onFinish={submitAssignment}
                >
                    <Form.Item
                        name="files"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                        rules={[
                            { required: true, message: 'Vui lòng tải file!', },
                        ]} >
                        <Dragger
                            multiple={true}
                            beforeUpload={() => false}
                        >
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">Nhấn vào hoặc kéo file vào để tải lên</p>
                        </Dragger>
                    </Form.Item>
                </Form>
            </Modal>

        </section>
    )
}

export default AssignmentPage