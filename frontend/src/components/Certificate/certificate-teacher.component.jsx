import React, { useState, useEffect } from 'react'
import {
    Row, Col, Table, List, Input, Modal, Space,
    message, Tag, Form, Button, Select, notification
} from 'antd'
import { getListSummary, updateSummary } from '../../api/summary.services'
import Avatar from 'antd/lib/avatar/avatar'
import { Link } from 'react-router-dom'
import { formatDate, dayDiff } from '../../utils/text.utils'
import Constants from '../../constants'
import moment from 'moment'

const { Search } = Input
const { Option } = Select;
const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
};

const CertificateTeacher = ({ token, course, courseHome }) => {

    const [loading, setLoading] = useState(true)
    const [userCourses, setUserCourses] = useState([])
    const [orgUserCourses, setOrgUserCourse] = useState([])
    const [currentItem, setCurrentItem] = useState({})
    const [showModal, setShowModal] = useState(false)
    const [selectedRows, setSelectedRows] = useState([])
    const [selectedRowKeys, setSelectedRowKeys] = useState([])

    const [form] = Form.useForm()
    const [sumForm] = Form.useForm()



    const getAll = async () => {
        setLoading(true)
        try {
            const { data } = await getListSummary({ token, course_id: course, class_id: courseHome.id })
            setUserCourses(data.data.userCourses)
            setOrgUserCourse(data.data.userCourses)
        } catch (err) {
            message.error("Có lỗi xảy ra: " + err.message)
        }
        setLoading(false)
    }

    useEffect(() => {
        if (course && courseHome.id) {
            getAll()
        }
    }, [course, courseHome])

    const renderStatus = (status) => {
        if (status === 'on_going') return <Tag color="purple">Trong tiến trình</Tag>
        if (status === 'fail') return <Tag color="red">Chưa đạt tiêu chuẩn</Tag>
        return <Tag color="blue">Đạt</Tag>
    }

    const renderRank = (rank) => {
        if (rank === null) return <Tag color="red">Chưa phân loại</Tag>
        if (rank === 'medium') return <Tag color="purple">Trung bình</Tag>
        if (rank === 'good') return <Tag color="green">Khá</Tag>
        return <Tag color="blue">Xuất sắc</Tag>
    }

    const onFinish = (values) => {
        let query = orgUserCourses
        if (values.username) {
            query = userCourses.filter(u => u.user.username.includes(values.username))
        }
        if (values.name) {
            query = query.filter(q => q.user.user_profile.fullname.includes(values.name))
        }
        if (values.status) {
            query = query.filter(q => q.status == values.status)
        }
        if (values.rank) {
            query = query.filter(q => q.rank == values.rank)
        }
        if (values.received) {
            query = query.filter(q => q.received_certificate == values.received)
        }
        setUserCourses(query)
    }

    const genCertificate = (item) => {
        if (dayDiff(moment(), item.end_date) < 0) openNotification(item.end_date)
    }

    const genSummary = (item) => {
        // if (dayDiff(moment(), item.end_date) < 0) {
        //     openNotification(item.end_date)
        // } else {
        //     setShowModal(true)
        // }
        setShowModal(true)
        setCurrentItem(item)
    }

    const openNotification = (endDate) => {
        notification.open({
            message: <span className="text-red">Khóa học chưa kết thúc</span>,
            description: `Bạn chỉ được tổng kết/cấp phát chứng chỉ sau khi khóa học kết thúc vào ${formatDate(endDate, Constants.MMM_Do_YYYY)}`,
            onClick: () => {
                console.log('Notification Clicked!');
            },
        });
    };

    const summaryStudent = async (values) => {
        setLoading(true)
        try {
            const { data } = await updateSummary(
                { token, userCourseId: currentItem.id, status: values.status, rank: values.rank })
            message.success("Tổng kết thành công")
        } catch (err) {
            message.error("Có lỗi xảy ra: " + err.message)
        }
        setLoading(false)

    }


    const columns = [
        {
            title: '#',
            dataIndex: 'stt',
            key: 'stt',
            render: stt => <span>{stt}</span>,
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
            render: (name, record) => <Space><Avatar src={record.avatar} /><span>{name}</span></Space>
        },
        {
            title: 'Họ tên',
            dataIndex: 'fullname',
            key: 'fullname',
            render: name => <span>{name}</span>
        },

        {
            title: 'Điểm',
            dataIndex: 'finalScore',
            key: 'finalScore',
            render: finalScore => <b>{finalScore || finalScore == 0 ? finalScore : "Chưa tổng kết"}</b>
        },

        {
            title: 'Tình trạng',
            dataIndex: 'status',
            key: 'status',
            render: status => <span>{renderStatus(status)}</span>
        },

        {
            title: 'Xếp loại',
            dataIndex: 'rank',
            key: 'rank',
            render: rank => <span>{renderRank(rank)}</span>
        },

        {
            title: 'Chứng chỉ',
            dataIndex: 'received',
            key: 'received',
            render: (received, record) => <span>{!received ?
                <Button
                    type="primary"
                    style={{ background: "#8874a3", border: 'none' }}
                    onClick={() => genCertificate(record)}>
                    Cấp ngay
                </Button> : <Tag color="#2db7f5">Đã cấp</Tag>}</span>
        },

        {
            title: '',
            dataIndex: 'action',
            key: 'action',
            render: (action, record) => (<Space>
                <Button type="primary" onClick={() => genSummary(record)}>Tổng kết</Button>
                <Button onClick={() => genSummary(record)}>Tổng kết theo điểm</Button>
            </Space>)
        },
    ]

    const finalData = userCourses.map((userCourse, index) => {

        return {
            stt: index + 1,
            username: userCourse.user.username,
            avatar: userCourse.user.user_profile.avatar,
            fullname: userCourse.user.user_profile.fullname,
            status: userCourse.status,
            rank: userCourse.rank,
            received: userCourse.received_certificate,
            end_date: userCourse.end_date,
            finalScore: userCourse.final_score
        }
    })

    const SummaryTable = () => {
        return (
            <Table
                loading={loading}
                rowSelection={{
                    type: "checkbox",
                    selectedRowKeys,
                    onChange: (selectedRowKeys, selectedRows) => {
                        setSelectedRowKeys(selectedRowKeys)
                        setSelectedRows(selectedRows)
                    },
                    getCheckboxProps: record => ({
                        name: record.username
                    })
                }}
                dataSource={finalData}
                columns={columns}
            />
        )
    }


    return (
        <section className="section-5 page-2">
            <h3 className="text--main mb-5">
                Tổng kết và cấp phát chứng chỉ
            </h3>
            <div className="mb-5">
                <Form
                    layout="vertical"
                    form={form}
                    name="advanced_search"
                    className="ant-advanced-search-form"
                    onFinish={onFinish}
                >
                    <Row gutter={24}>
                        <Col span={8}>
                            <Form.Item
                                name="username"
                                label="Username"
                            >
                                <Input placeholder="username" />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name="name"
                                label="Tên"
                            >
                                <Input placeholder="Tên" />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name="status"
                                label="Tình trạng"
                            >
                                <Select placeholder="Chọn trạng thái">
                                    <Option value="on_going">Trong tiến trình</Option>
                                    <Option value="pass">Đạt</Option>
                                    <Option value="fail">Không đạt tiêu chuẩn</Option>
                                </Select>
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Form.Item
                                name="rank"
                                label="Xếp loại"
                            >
                                <Select placeholder="Chọn xếp loại">
                                    <Option value="medium">Trung bình</Option>
                                    <Option value="good">Khá</Option>
                                    <Option value="xgood">Xuất sắc</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name="received"
                                label="Đã cấp chứng chỉ?"
                            >
                                <Select placeholder="Đã cấp chứng chỉ?">
                                    <Option value={true}>Đã cấp</Option>
                                    <Option value={false}>Chưa cấp</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24} style={{ textAlign: 'right' }}>
                            <Button type="primary" htmlType="submit">
                                Lọc
                            </Button>
                            <Button
                                style={{ margin: '0 8px' }}
                                onClick={() => {
                                    form.resetFields();
                                }}
                            >
                                Clear
                            </Button>

                        </Col>
                    </Row>
                </Form>
            </div>
            <SummaryTable />
            <Modal
                title="Tổng kết học viên"
                style={{ background: 'white', paddingBottom: '0' }}
                visible={showModal}
                onCancel={() => setShowModal(false)}
                onOk={() => sumForm.submit()}
                cancelText="Hủy"
            >
                <Form
                    form={sumForm}
                    layout="vertical"
                    name="summaryForm"
                    onFinish={summaryStudent}
                >
                    <Form.Item
                        name="status"
                        label="Đạt chuẩn khóa học"
                        hasFeedback
                        rules={[{ required: true, message: 'Chọn 1 lựa chọn' }]}
                    >
                        <Select placeholder="Chọn 1 lựa chọn">
                            <Option value="pass">Đạt tiêu chuẩn</Option>
                            <Option value="fail">Không đạt</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="rank"
                        label="Xếp loại"
                    // hasFeedback
                    // rules={[{ required: true, message: 'Hãy chọn xếp loại' }]}
                    >
                        <Select placeholder="Hãy chọn xếp loại">
                            <Option value="bad">Yếu</Option>
                            <Option value="medium">Trung bình</Option>
                            <Option value="good">Khá</Option>
                            <Option value="xgood">Xuất sắc</Option>
                        </Select>
                    </Form.Item>

                </Form>
            </Modal>
        </section >
    )
}

export default CertificateTeacher