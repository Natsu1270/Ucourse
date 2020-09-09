import React, { useState, useEffect } from 'react'
import {
    Row, Col, Table, List, Input, Modal, Space,
    message, Tag, Form, Button, Select, notification
} from 'antd'
import { getListSummary, updateSummary, multiUpdateSummary, genCertificateAPI, handOutCertificateAPI } from '../../api/summary.services'
import Avatar from 'antd/lib/avatar/avatar'
import { Link, useParams } from 'react-router-dom'
import { formatDate, dayDiff } from '../../utils/text.utils'
import Constants from '../../constants'
import moment from 'moment'
import { CloudSyncOutlined, FileSearchOutlined, MailOutlined, SwapOutlined } from '@ant-design/icons'
import { Document, Page } from 'react-pdf'
import PDFViewer from 'pdf-viewer-reactjs'
import { renderStatus, renderRank, renderCertificate, parseRankByScore } from '../../components/Certificate/certificate.utils'
import { useSelector } from 'react-redux'
import { tokenSelector } from '../../redux/Auth/auth.selects'
import { keys } from 'lodash'

const { Search } = Input
const { Option } = Select;
const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
};

const AdminCertificateCourse = ({ }) => {

    const { courseId, courseHomeId } = useParams()
    const token = useSelector(state => tokenSelector(state))

    const [loading, setLoading] = useState(true)
    const [userCourses, setUserCourses] = useState([])
    const [studentCourseHomes, setStudentCourseHomes] = useState({})
    const [orgUserCourses, setOrgUserCourse] = useState([])
    const [currentItem, setCurrentItem] = useState({})
    const [showModal, setShowModal] = useState(false)
    const [selectedRows, setSelectedRows] = useState([])
    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    const [fileURL, setFileURL] = useState(null)
    const [file, setFile] = useState(null)
    const [cerItem, setCerItem] = useState({})
    const [course, setCourse] = useState({})


    const [form] = Form.useForm()
    const [sumForm] = Form.useForm()


    const normalize = (dataset) => {
        const result = {}
        dataset.forEach(item => {
            result[item.student] = item
        })
        return result
    }

    const getAll = async () => {
        setLoading(true)
        try {
            const { data } = await getListSummary({ token, course_id: courseId, class_id: courseHomeId })
            const schList = normalize(data.data.studentCourseHomes)
            setStudentCourseHomes(schList)
            setUserCourses(data.data.userCourses)
            setCourse(data.data.courseDetail)
            setOrgUserCourse(data.data.userCourses)
        } catch (err) {
            message.error("Có lỗi xảy ra: " + err.message)
        }
        setLoading(false)
    }

    useEffect(() => {
        if (token) getAll()
    }, [token])


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

    const genCertificate = async (item) => {
        // if (dayDiff(moment(), item.end_date) < 0) openNotification(item.end_date)
        setLoading(true)
        setCerItem(item)
        const params = {
            name: course.title, studentName: item.fullname, type: 'c',
            rank: parseRankByScore(item.rank)
        }
        try {
            const { data } = await genCertificateAPI({ token, params })
            const res = new Blob([data], { type: 'application/pdf' })
            setFile(res)
            const fileUrl = URL.createObjectURL(res)
            setFileURL(fileUrl)
            setShowModal(true)
        } catch (err) {
            message.error("Có lỗi xảy ra: " + err.message)
        }
        setLoading(false)
    }

    const handOut = async () => {
        const key = 'handout'

        setLoading(true)
        message.loading({ content: 'Đang gửi chứng chỉ đến học viên...', key })
        const formData = new FormData()
        formData.set('type', 'c')
        formData.set('email', cerItem.email)
        formData.set('courseHomeId', courseHomeId)
        formData.set('courseId', course.id)
        formData.set('studentId', cerItem.studentId)
        formData.set('name', course.title)
        formData.set('studentName', cerItem.fullname)
        formData.set('studentCourseId', cerItem.id)
        formData.set('file', file, cerItem.username + course.slug + "_Certificate.pdf")

        try {
            const { data } = await handOutCertificateAPI({ token, formData })
            message.success({ content: 'Cấp chứng chỉ thành công', key, duration: 1.5, onClose: () => window.location.reload() })
        } catch (err) {
            message.error('Có lỗi xảy ra: ' + err.message)
            setLoading(false)
        }
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



    const summaryStudent = async (values, record, isMultiple) => {
        setLoading(true)
        let datas = null
        if (values != null) {
            datas = { token, userCourseId: currentItem.id, status: values.status, rank: values.rank }
        } else if (record != null) {
            const status = record.schStatus
            datas = { token, userCourseId: record.id, status, rank: parseRankByScore(record.finalScore) }
        } else {
            datas = selectedRows.map(row => {
                const status = row.schStatus
                const rank = parseRankByScore(row.finalScore)
                return {
                    userCourseId: row.id, status, rank
                }
            })
        }
        try {
            const { data } = isMultiple == null ? await updateSummary(datas) : await multiUpdateSummary({ token, datas })
            message.success("Tổng kết thành công", 1.5, () => window.location.reload())
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
            title: 'Tình trạng lớp',
            dataIndex: 'schStatus',
            key: 'schStatus',
            render: schStatus => <span>{renderStatus(schStatus)}</span>
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
            render: (received, record) => renderCertificate(received, record, genCertificate)
        },

        {
            title: '',
            dataIndex: 'action',
            key: 'action',
            render: (action, record) => (<Space>
                <Button
                    disabled={(record.schStatus != 'pass' && record.schStatus != 'fail') || record.received}
                    type="primary"
                    onClick={() => genSummary(record)}>Tổng kết</Button>
                <Button
                    disabled={(record.schStatus != 'pass' && record.schStatus != 'fail') || record.received}
                    onClick={() => summaryStudent(null, record, null)}>
                    <SwapOutlined />Tự động</Button>
            </Space>)
        },
    ]

    const finalData = userCourses.map((userCourse, index) => {
        const studentId = userCourse.user ? userCourse.user.id : null
        const schDetail = studentId ? studentCourseHomes[studentId] : {}

        return {
            stt: index + 1,
            id: userCourse.id,
            username: userCourse.user.username,
            avatar: userCourse.user.user_profile.avatar,
            fullname: userCourse.user.user_profile.fullname,
            email: userCourse.user.email,
            studentId: userCourse.user.id,
            status: userCourse.status,
            rank: userCourse.rank,
            received: userCourse.received_certificate,
            end_date: userCourse.end_date,
            finalScore: schDetail.final_score,
            schStatus: schDetail.status,
            is_summarised: userCourse.is_summarised,
            key: userCourse.id,
        }
    })

    const SummaryTable = () => {
        return (
            <Table
                bordered
                loading={loading}
                rowSelection={{
                    type: "checkbox",
                    selectedRowKeys,
                    onChange: (selectedRowKeys, selectedRows) => {
                        setSelectedRowKeys(selectedRowKeys)
                        setSelectedRows(selectedRows)
                    },
                    getCheckboxProps: record => ({
                        name: record.username,
                        disabled: record.is_summarised == true || record.schStatus == 'on_going' || record.received
                    })
                }}
                dataSource={finalData}
                columns={columns}
            />
        )
    }


    return (
        <section className="section-5 page-2">
            <div className="page-card">
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
                <Row className="mb-4">
                    <Col>
                        {
                            selectedRows.length > 0 ? <Button type="primary" onClick={() => summaryStudent(null, null, true)}
                                style={{ background: "#3d1e6d", border: 'none' }}>
                                <CloudSyncOutlined /> Tổng kết theo điểm các hàng đã chọn
                        </Button> : <span style={{ fontSize: '1.6rem' }}>Chọn checkbox để tổng kết theo điểm hàng loạt</span>
                        }
                    </Col>
                </Row>
                <SummaryTable />
            </div>
            <Modal
                title="Tổng kết học viên"
                style={{ background: 'white', paddingBottom: '0' }}
                visible={showModal}
                onCancel={() => {
                    setShowModal(false)
                    setCurrentItem({})
                }}
                onOk={() => sumForm.submit()}
                cancelText="Hủy"
            >
                {
                    currentItem.id != null ? <Form
                        form={sumForm}
                        layout="vertical"
                        name="summaryForm"
                        onFinish={(values) => summaryStudent(values, null, null)}
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
                        >
                            <Select placeholder="Hãy chọn xếp loại">
                                <Option value="bad">Yếu</Option>
                                <Option value="medium">Trung bình</Option>
                                <Option value="good">Khá</Option>
                                <Option value="xgood">Xuất sắc</Option>
                            </Select>
                        </Form.Item>

                    </Form> : <Row gutter={20} justify="center">
                            <Col>
                                <Button
                                    loading={loading}
                                    onClick={() => window.open(fileURL)}>
                                    <FileSearchOutlined /> Xem trước
                                </Button>
                            </Col>
                            <Col>
                                <Button
                                    loading={loading}
                                    type="primary" danger
                                    onClick={handOut}><MailOutlined /> Cấp chứng chỉ</Button>
                            </Col>
                        </Row>

                }
            </Modal>

        </section >
    )
}

export default AdminCertificateCourse