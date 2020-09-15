import React, { useState, useEffect } from 'react'
import { Timeline, Spin, Divider, Row, Col, message, Space, Alert, Skeleton, Button } from 'antd'
import { Link, useHistory } from 'react-router-dom'
import Constants from '../../constants'
import { formatDate } from '../../utils/text.utils'
import './notification.styles.scss'
import { deleteNotification, readNotification } from '../../api/notification.services'
import { TeamOutlined, ReadOutlined, RocketOutlined, LaptopOutlined, FileProtectOutlined } from '@ant-design/icons'
import ResultComponent from '../../components/Common/result.component'

const NotificationPage = ({ notifications, loading }) => {

    const history = useHistory()
    const [myNotifications, setMyNotifications] = useState([])
    const [reading, setLoading] = useState(false)

    const readNoti = async (id) => {
        setLoading(true)
        try {
            await readNotification(id)
        } catch (err) {
            message.error('Co loi xay ra')
        }
        setLoading(false)

    }

    useEffect(() => {
        if (notifications.length) {
            const notiList = notifications.flatMap(n => {
                const reference = n.reference_object
                if (reference == null) return []
                let content = ""
                let onClick = null
                if (n.type === "1" && reference != null) {
                    onClick = () => {
                        readNoti(n.id)
                        window.open(`/courses/${reference.slug}`, '_self')
                    }

                    content = <Space>
                        <ReadOutlined /> Đăng ký thành công khóa học <span className="b-500">{reference.title}</span>
                    </Space>
                }
                if (n.type === "2" && reference != null) {
                    onClick = () => {
                        readNoti(n.id)
                        window.open(`/programs/${reference.slug}`, '_self')
                    }
                    content = <Space>
                        <RocketOutlined /> Đăng ký thành công chương trình học <span className="b-500">{reference.name}</span>
                    </Space>
                }
                if (n.type === "3" && reference != null) {
                    onClick = () => {
                        readNoti(n.id)
                        window.open(`/learn/${reference.slug}`, '_self')
                    }
                    content = <Space>
                        <LaptopOutlined /> Đăng ký thành công lớp <span className="b-500">{reference.full_name}</span>
                    </Space>
                }
                if (n.type === "4" && reference != null) {
                    onClick = () => {
                        readNoti(n.id)
                        window.open(`/learn/${reference.course_home.slug}/forums`, '_self')
                    }
                    content = <Space>
                        <TeamOutlined /> Có diễn đàn mới được tạo ở lớp <span className="b-500">{reference.course_home.full_name}</span>
                    </Space>
                }

                if (n.type === "5" && reference != null) {
                    onClick = () => {
                        readNoti(n.id)
                        window.open(
                            `/learn/${reference.course_home.slug}/forums/${reference.forum}/threads/${reference.id}`, '_self'
                        )
                    }
                    content = <span>
                        <TeamOutlined /> Có chủ đề mới được tạo ở lớp <span className="b-500">{reference.course_home.full_name}</span>
                    </span>
                }

                if (n.type === "6" && reference != null) {
                    if (reference) {
                        onClick = () => {
                            readNoti(n.id)
                            window.open(
                                `/learn/${reference.course_home.slug}/exams/${reference.id}`, '_self'
                            )
                        }
                        content = <Space>
                            <FileProtectOutlined /> Có bài kiểm tra mới phải làm ở lớp
                            <span className="b-500">{reference.course_home.full_name}</span>
                        </Space>
                    }
                }
                return [{ ...n, content, onClick }]
            })
            setMyNotifications(notiList)
        }
    }, [notifications])

    const deleteNoti = async (id) => {

        setLoading(true)
        try {
            const { data } = await deleteNotification(id)
            message.success('Xóa thông báo thành công')
            const updateNotifications = myNotifications.filter(n => n.id != id)
            setMyNotifications(updateNotifications)
        } catch (err) {
            message.error('Có lỗi xảy ra: ' + err.message)
        }
        setLoading(false)
    }

    return (
        <section className="section-10 page">
            <div className="page-card">
                <h3 className="text--main">
                    Thông báo của tôi
                </h3>
                <Divider />
                <Spin spinning={loading} indicator={Constants.SPIN_ICON}>
                    <Skeleton active paragraph={{ rows: 4 }} loading={loading}>
                        {
                            myNotifications.length ?
                                (<Timeline >
                                    {
                                        myNotifications.map(n => {

                                            return (
                                                <Timeline.Item

                                                    key={n.id} color={n.is_read ? 'green' : 'red'}>
                                                    <Row gutter={16} align="middle" className={`noti-item ${!n.is_read ? 'is-read' : null}`}>
                                                        <Col span={3}>
                                                            <span style={{ fontStyle: 'italic', fontSize: '1.4rem' }}>{formatDate(n.created_date, Constants.MMM_Do_YYYY)}</span>
                                                        </Col>
                                                        <Col span={18} onClick={n.onClick}>
                                                            <span className="text--sub__bigger2">{n.content}</span>
                                                        </Col>
                                                        <Col span={3} className="text-right">
                                                            <Button type="primary" danger onClick={() => deleteNoti(n.id)}>Xóa</Button>
                                                        </Col>
                                                    </Row>
                                                </Timeline.Item>
                                            )
                                        })
                                    }
                                </Timeline>) : <ResultComponent type={Constants.RESULT_TYPE_NODATA} title="Hôp thư thông báo rỗng" info="Bạn chưa có thông báo nào" />
                        }
                    </Skeleton>
                </Spin>
            </div>
        </section>
    )
}

export default NotificationPage