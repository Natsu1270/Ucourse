import {
    DownOutlined, InboxOutlined,
    PaperClipOutlined, SettingOutlined, UploadOutlined
} from '@ant-design/icons';
import {
    Badge, Button,
    Card, Descriptions, Form,
    List, message,

    Popconfirm, Skeleton,
    Space, Statistic,
    Tabs, Tag, Tree, Upload
} from "antd";
import Modal from 'antd/lib/modal/Modal';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAssignmentDetailAPI, getStudentAssignmentAPI, submitAssignmentAPI } from '../../api/assignment.services';
import { deleteTopicAsset } from '../../api/courseHome.services';
import Constants from '../../constants';
import { dayDiff, formatDate, isTimeBefore, parseHtml } from '../../utils/text.utils';

const { Dragger } = Upload
const { Countdown } = Statistic
const { TabPane } = Tabs

const normFile = e => {
    if (Array.isArray(e)) {
        return e;
    }
    return e && e.fileList;
};

const AssignmentStudent = ({ token }) => {

    const { assignmentId } = useParams();
    const [loading, setLoading] = useState(false)
    const [assignmentDetail, setAssignmentDetail] = useState({})
    const [studentAssignment, setStudentAssignment] = useState({})
    const [showModal, setShowModal] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [attachments, setAttachments] = useState([])
    const [isEdit, setIsEdit] = useState(false)

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

    useEffect(() => {
        if (studentAssignment.student_assignment_files) {
            setAttachments(studentAssignment.student_assignment_files)
        }
        if (studentAssignment.id !== undefined) {
            setIsEdit(true)
        }
    }, [studentAssignment])


    const submitAssignment = async (values) => {
        const fileList = values.files
        const formData = new FormData()
        fileList.forEach(file => {
            formData.append('files[]', file.originFileObj, file.name)
        })
        formData.set('assignment', assignmentDetail.id)
        formData.set('studentAssignment', studentAssignment.id)
        const data = {
            token, formData
        }
        setUploading(true)
        try {
            const result = await submitAssignmentAPI(data)
            message.success("Xác nhận thành công", 1.5, () => window.location.reload())
        } catch (err) {
            message.error("Xác nhận không thành công: " + err.message)
        }
        setUploading(false)
    }

    const parseStatus = (status) => {
        if (status === undefined) return <Tag color="red">Chưa nộp bài</Tag>
        if (status === "1") {
            return <Tag color="#108ee9">Đã nộp bài</Tag>
        }
        if (status === "0") {
            return <Tag color="yellow">Chưa có bài nộp</Tag>
        }
        return <Tag color="red">Bài nộp không hợp lệ</Tag>
    }

    const calCountDownVal = () => {
        if (assignmentDetail.due_date) {
            const value = (dayDiff(assignmentDetail.due_date, Date.now())) * 24 * 60 * 60 * 1000
            return Date.now() + value
        }
    }

    const parseRemainTime = () => {
        if (!isTimeBefore(assignmentDetail.due_date)) {
            return (<Countdown
                value={calCountDownVal()}
                format="D ngày H giờ m phút s"
            />)
        } else {
            return <Tag color="red">Bài assignment đã quá hạn nộp</Tag>
        }
    }

    const deleteAttachment = async (id) => {
        const data = { token, id }
        setLoading(true)
        try {
            const result = await deleteTopicAsset(data)
            const newAttachments = attachments.filter(a => a.id !== id)
            setAttachments(newAttachments)
            message.success("Xóa file nộp thành công")
        } catch (err) {
            message.error("Có lỗi xảy ra: " + err.message)
        }
        setLoading(false)
    }

    const parseSubmitBtn = () => {
        if (studentAssignment.status === undefined) {
            return (
                <Button type="primary" onClick={() => setShowModal(true)}>
                    <UploadOutlined />Thêm bài nộp
                </Button>
            )
        }
        return studentAssignment.submit_time < assignmentDetail.max_submit_time ?
            (studentAssignment.status === '0' && studentAssignment.submit_time == 0) ?
                <Button type="primary" onClick={() => setShowModal(true)}>
                    <UploadOutlined />Thêm bài nộp
                </Button> :
                <Button type="primary" onClick={() => setShowModal(true)}>
                    <SettingOutlined />Chỉnh sửa bài nộp
                </Button> : null
    }


    const onSelect = (selectedKeys, info) => {
        console.log('selected', selectedKeys, info);
        if (info.node.url) {
            if (info.node.url) {
                window.open(info.node.url, '_blank')
            }
        }
    };


    return (
        <section className="section-5 page-2 course-lecture">
            {
                <div>
                    <div className="exam-list--title">
                        <Skeleton loading={loading} active>
                            <h3 className="text--main">
                                {assignmentDetail.name}
                            </h3>
                        </Skeleton>
                    </div>
                    <Skeleton loading={loading} active paragraph={{ rows: 8 }}>
                        <p className="text--sub__bigger2">{parseHtml(assignmentDetail.info)}</p>
                        <div className="text-center">
                            <p className="text--sub__bigger">Thời gian còn lại</p>
                            {
                                parseRemainTime()
                            }
                        </div>
                        <Tabs defaultActiveKey="1">
                            <TabPane tab="Mô tả bài assignment" key="1">
                                <Descriptions
                                    title="Thông tin bài assignment" className="mb-5"
                                    bordered layout="vertical"
                                    column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
                                    <Descriptions.Item label="Số lần nộp tối đa">
                                        {assignmentDetail.max_submit_time ? assignmentDetail.max_submit_time : "Không giới hạn"}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Điểm">{assignmentDetail.max_score}</Descriptions.Item>
                                    <Descriptions.Item
                                        label="Phần trăm điểm">{assignmentDetail.percentage}%</Descriptions.Item>
                                    <Descriptions.Item label="Ngày bắt đầu">
                                        {
                                            !isTimeBefore(assignmentDetail.start_date) ?
                                                <Badge status="processing"
                                                    text={formatDate(assignmentDetail.start_date, Constants.MMM_Do__YY__TIME)} /> :
                                                <Badge status="warning"
                                                    text={formatDate(assignmentDetail.start_date, Constants.MMM_Do__YY__TIME)} />
                                        }
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Deadline">
                                        {
                                            !isTimeBefore(assignmentDetail.due_date) ?
                                                <Badge status="processing"
                                                    text={formatDate(assignmentDetail.due_date, Constants.MMM_Do__YY__TIME)} /> :
                                                <Badge status="error"
                                                    text={formatDate(assignmentDetail.due_date, Constants.MMM_Do__YY__TIME)} />
                                        }
                                    </Descriptions.Item>
                                    {
                                        assignmentDetail.assignment_files ?
                                            <Descriptions.Item label="File đính kèm">
                                                <Tree
                                                    onSelect={onSelect}
                                                    switcherIcon={<DownOutlined />}
                                                    defaultExpandedKeys={['a-1']}
                                                    showLine
                                                    treeData={[
                                                        {
                                                            title: "Attachments",
                                                            key: 'a-1',
                                                            children: assignmentDetail.assignment_files.map(
                                                                file => ({
                                                                    key: file.id,
                                                                    title: file.name,
                                                                    url: file.file
                                                                })
                                                            )
                                                        }
                                                    ]}
                                                >
                                                </Tree>
                                            </Descriptions.Item> : null
                                    }
                                </Descriptions>
                            </TabPane>
                            <TabPane tab="Bài nộp của tôi" key="2">
                                <Descriptions
                                    column={{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 2 }}
                                    title="Bài nộp của tôi" bordered>
                                    <Descriptions.Item
                                        label="Trạng thái">{parseStatus(studentAssignment.status)}</Descriptions.Item>
                                    <Descriptions.Item label="Số lần đã nộp">
                                        {studentAssignment.submit_time ? studentAssignment.submit_time : 0}/{assignmentDetail.max_submit_time
                                        }</Descriptions.Item>
                                    <Descriptions.Item label="Điểm">
                                        {
                                            studentAssignment.score ? studentAssignment.score : "Chưa được chấm điểm"
                                        }
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Lần sửa đổi cuối cùng">
                                        {
                                            formatDate(studentAssignment.modified_date, Constants.MMM_Do__YY__TIME)
                                        }
                                    </Descriptions.Item>
                                    {/* <Descriptions.Item label="Thời gian còn lại">
                                        
                                    </Descriptions.Item> */}

                                </Descriptions>
                                {
                                    studentAssignment.student_assignment_files ?
                                        <Card className="mt-5" hoverable loading={loading}>
                                            <Tree
                                                onSelect={onSelect}
                                                switcherIcon={<DownOutlined />}
                                                defaultExpandedKeys={['a-1']}
                                                showLine
                                                treeData={[
                                                    {
                                                        title: "Attachments",
                                                        key: 'a-1',
                                                        children: studentAssignment.student_assignment_files.map(
                                                            file => ({
                                                                key: file.id,
                                                                title: file.name,
                                                                url: file.file
                                                            })
                                                        )
                                                    }
                                                ]}
                                            >
                                            </Tree>
                                        </Card>
                                        : null
                                }
                                <div className="text-center mt-5">
                                    {
                                        parseSubmitBtn()
                                    }
                                </div>
                            </TabPane>
                        </Tabs>


                    </Skeleton>

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
                        ]}>
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
                    {
                        studentAssignment.status === "1" ?
                            <List
                                loading={loading}
                                itemLayout="horizontal"
                                dataSource={attachments}
                                renderItem={item => (
                                    <List.Item
                                        actions={
                                            [
                                                <Popconfirm
                                                    title="Bạn có chắc chắn muốn xóa file đã nộp?"
                                                    onConfirm={() => deleteAttachment(item.id)}
                                                    okText="Xác nhận"
                                                    cancelText="Hủy"
                                                >
                                                    <Button

                                                        danger type="primary" key="delete">Xóa file</Button>
                                                </Popconfirm>

                                            ]
                                        }>
                                        <Skeleton avatar title={false} loading={item.loading} active>
                                            <List.Item.Meta
                                                title={<Space><PaperClipOutlined />{item.name}</Space>}
                                            />
                                        </Skeleton>
                                    </List.Item>
                                )}
                            /> : null
                    }
                </Form>
            </Modal>

        </section>
    )
}

export default AssignmentStudent