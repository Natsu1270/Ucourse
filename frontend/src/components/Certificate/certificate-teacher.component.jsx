import React, { useState, useEffect } from 'react'
import { Row, Col, Divider, List, Input, message, Tag, Form, Button, Select } from 'antd'
import { getListSummary } from '../../api/summary.services'
import Avatar from 'antd/lib/avatar/avatar'
import { Link } from 'react-router-dom'

const { Search } = Input
const { Option } = Select;

const CertificateTeacher = ({ token, course, courseHome }) => {

    const [loading, setLoading] = useState(true)
    const [userCourses, setUserCourses] = useState([])
    const [orgUserCourses, setOrgUserCourse] = useState([])

    const [form] = Form.useForm()

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


    return (
        <section className="section-5 page-2">
            <h3 className="text--main mb-5">
                Quản lý chứng chỉ
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

            <List
                header="Danh sách học viên"
                bordered
                itemLayout="horizontal"
                dataSource={userCourses}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar src={item.user.user_profile.avatar} />}
                            title={<Link onClick={() => window.open(`/user/${item.user.username}`)}>{item.user.user_profile.fullname}</Link>}
                            description={
                                <Row gutter={24} style={{ fontSize: '1.6rem' }}>
                                    <Col span={4}>{item.user.username}</Col>
                                    <Col>Tình trạng: {renderStatus(item.status)}</Col>
                                    <Col>Xếp loại: {renderRank(item.rank)}</Col>
                                    <Col>
                                        Chứng chỉ: {!item.received_certificate ? <Tag color="#f50">Chưa cấp</Tag> : <Tag color="#2db7f5">Đã cấp</Tag>}
                                    </Col>
                                </Row>

                            }
                        />
                    </List.Item>
                )}
            />

        </section >
    )
}

export default CertificateTeacher