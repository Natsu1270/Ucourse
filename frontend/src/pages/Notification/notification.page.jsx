import React, { useState, useEffect } from 'react'
import { Timeline, Spin, Divider, Row, Col, message, Space } from 'antd'
import { Link, useHistory } from 'react-router-dom'
import Constants from '../../constants'
import { formatDate } from '../../utils/text.utils'
import './notification.styles.scss'
import { readNotification } from '../../api/notification.services'
import { TeamOutlined, ReadOutlined, RocketOutlined, LaptopOutlined, FileProtectOutlined } from '@ant-design/icons'

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
            const notiList = notifications.map(n => {
                const reference = n.reference_object
                let content = ""
                let onClick = null
                if (n.type === "1") {
                    onClick = () => {
                        readNoti(n.id)
                        window.open(`/courses/${reference.slug}`, '_self')
                    }

                    content = <Space>
                        <ReadOutlined /> Đăng ký thành công khóa học <span className="b-500">{reference.title}</span>
                    </Space>
                }
                if (n.type === "2") {
                    onClick = () => {
                        readNoti(n.id)
                        window.open(`/programs/${reference.slug}`, '_self')
                    }
                    content = <Space>
                        <RocketOutlined /> Đăng ký thành công chương trình học <span className="b-500">{reference.name}</span>
                    </Space>
                }
                if (n.type === "3") {
                    onClick = () => {
                        readNoti(n.id)
                        window.open(`/learn/${reference.slug}`, '_self')
                    }
                    content = <Space>
                        <LaptopOutlined /> Đăng ký thành công lớp <span className="b-500">{reference.full_name}</span>
                    </Space>
                }
                if (n.type === "4") {
                    onClick = () => {
                        readNoti(n.id)
                        window.open(`/learn/${reference.course_home.slug}/forums`, '_self')
                    }
                    content = <Space>
                        <TeamOutlined /> Có diễn đàn mới được tạo ở lớp <span className="b-500">{reference.course_home.full_name}</span>
                    </Space>
                }

                if (n.type === "5") {
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

                if (n.type === "6") {
                    onClick = () => {
                        readNoti(n.id)
                        window.open(
                            `/learn/${reference.course_home.slug}/forums/${reference.forum}/threads/${reference.id}`, '_self'
                        )
                    }
                    content = <span>
                        <FileProtectOutlined /> Có bài kiểm tra mới phải làm ở lớp <span className="b-500">{reference.course_home.full_name}</span>
                    </span>
                }
                return { ...n, content, onClick }
            })
            setMyNotifications(notiList)
        }
    }, [notifications])

    return (
        <section className="section-10 page">
            <div className="page-card">
                <h3 className="text--main">
                    Thông báo của tôi
                </h3>
                <Divider />
                <Spin spinning={loading} indicator={Constants.SPIN_ICON}>
                    <Timeline >
                        {
                            myNotifications.map(n => {

                                return (
                                    <Timeline.Item
                                        onClick={n.onClick}
                                        key={n.id} color={n.is_read ? 'green' : 'red'}>
                                        <Row className={`noti-item ${!n.is_read ? 'is-read' : null}`} gutter={16}>
                                            <Col>
                                                <span style={{ fontStyle: 'italic', fontSize: '1.4rem' }}>{formatDate(n.created_date, Constants.MMM_Do_YYYY)}</span>
                                            </Col>
                                            <Col>
                                                <span className="text--sub__bigger2">{n.content}</span>
                                            </Col>
                                        </Row>
                                    </Timeline.Item>
                                )
                            })
                        }
                    </Timeline>
                </Spin>
            </div>
        </section>
    )
}

export default NotificationPage