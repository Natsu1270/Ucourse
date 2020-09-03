import React, { useEffect, useState } from 'react'
import { Row, Col, Input, Space, Divider, List, Avatar, Skeleton, Spin, Menu, Button } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'
import { getMyCoursesAPI, searchRegisterCourseAPI } from '../../api/home.services'
import { message } from 'antd'
import { useSelector } from 'react-redux'
import { tokenSelector } from '../../redux/Auth/auth.selects'
import Constants from '../../constants'
import { courseHomeStatus, canRegister } from '../../components/Course/course-home.utils'
import { registerCourseAPI, unRegisterCourseAPI } from '../../api/courseHome.services'

import { dayDiff } from '../../utils/text.utils'
import moment from 'moment'
import { notification } from 'antd'

const { Search } = Input
const { SubMenu } = Menu
const now = moment()

const RegisterClassPage = () => {
    const history = useHistory()
    const token = useSelector(state => tokenSelector(state))

    const [loading, setLoading] = useState(true)
    const [myCourses, setMyCourses] = useState([])
    const [searched, setSearched] = useState(false)

    const getMyCourses = async () => {
        setLoading(true)
        try {
            const { data } = await getMyCoursesAPI(token)
            setMyCourses(data.data)
        } catch (err) {
            message.error("Có lỗi xảy ra: " + err.message)
        }
        setLoading(false)
    }

    const searchCourse = async (keyword) => {
        setLoading(true)
        setSearched(true)
        try {
            const { data } = await searchRegisterCourseAPI(token, keyword)
            setMyCourses(data.data)
        } catch (err) {
            message.error("Có lỗi xảy ra: " + err.message)
        }
        setLoading(false)
    }

    useEffect(() => {
        if (token) {
            getMyCourses()
        }
    }, [token])


    const registerCourse = async (type, class_id, course_id) => {
        setLoading(true)
        try {
            if (type === 1) {
                const { data } = await registerCourseAPI({ course_id, token, class_id })
                message.success('Đăng ký thành công', 1.5, () => window.location.reload())
            } else {
                const { data } = await unRegisterCourseAPI({ token, class_id, course_id })
                // setClass(updateCourses)
                message.success('Hủy đăng ký thành công', 1.5, () => window.location.reload())
            }
        } catch (err) {
            message.error('Có lỗi xảy ra: ' + err.message)
            setLoading(false)
        }
    }

    const registerBtn = (item) => {
        if (item.isOwn) {
            if (canRegister(item)) {
                if (dayDiff(item.open_date, now) <= 0) {
                    return 'Đăng ký thành công'
                } else {
                    return 'Hủy đăng ký'
                }
            } else {
                return 'Đăng ký thành công'
            }
        }
        if (!canRegister(item)) return 'Hết hạn đăng ký'
        if (item.maximum_number === item.student_count) return "Đủ số lượng học viên đăng ký"

        return 'Đăng ký'
    }

    const registerClass = (item, isOwn, course) => {
        if (!isOwn) {
            message.error("Vui lòng đăng ký khóa học trước khi đăng ký lớp")
        } else {
            if (item.isOwn) {
                // unregister
                registerCourse(2, item.id, course.id)
            } else {
                // register
                registerCourse(1, item.id, course.id)
            }
        }
    }

    return (
        <section className="section-10 page">
            <div className="page-card">
                <div className="text-center mb-5">
                    <h3 className="text--main">Trang đăng ký lớp</h3>
                </div>
                <Row justify="center">
                    <Col span={16}>
                        <Search
                            loading={loading}
                            placeholder="Nhập tên khóa học/ mã khóa học"
                            enterButton={<Space><SearchOutlined />Tìm</Space>}
                            size="large"
                            onSearch={value => {
                                if (value.trim() == "") return
                                searchCourse(value)
                            }}
                        />
                    </Col>
                </Row>
                <Row justify="center" className="mt-4">
                    <Col>
                        <h3 className="text--main">Danh sách</h3>
                        <p className="text--sub__bigger2">{searched ? null : "Khóa học đã đăng ký"}</p>
                    </Col>

                </Row>

                <Row style={{ paddingLeft: '5rem', paddingRight: '5rem' }}>
                    <Col span={24}>
                        <div className="register-class__content">
                            <Spin spinning={loading} indicator={Constants.SPIN_ICON}>
                                <Menu
                                    style={{ borderRight: 'none', fontSize: '1.7rem', fontWeight: '500', paddingLeft: '0' }}
                                    mode="inline" width="100%">
                                    {
                                        myCourses.map(course => {

                                            const registered = course.my_course_homes.map(c => c.id)
                                            const classess = course.c_homes.map(c => {
                                                const isOwn = registered.includes(c.id)
                                                return { ...c, isOwn }
                                            })
                                            return (
                                                <SubMenu key={course.id} title={course.title + " - " + course.code}>
                                                    <List
                                                        bordered
                                                        itemLayout="horizontal"
                                                        dataSource={classess}

                                                        renderItem={item => {
                                                            return (
                                                                <List.Item
                                                                    actions={[
                                                                        <Button
                                                                            loading={loading}
                                                                            onClick={() => registerClass(item, course.is_my_course, course)}
                                                                            disabled={!canRegister(item) || item.student_count === item.maximum_number}
                                                                            type="primary"
                                                                            key="list-loadmore-edit">
                                                                            {
                                                                                registerBtn(item)
                                                                            }
                                                                        </Button>,
                                                                        <Button onClick={() => history.push(`/courses/${course.slug}/${item.name}`)} key={`a-${item.id}`}>
                                                                            Chi tiết
                                                                    </Button>,
                                                                    ]}
                                                                >
                                                                    <List.Item.Meta
                                                                        avatar={<Avatar src={item.teacher.avatar} />}
                                                                        title={item.full_name}
                                                                        description={
                                                                            <Row gutter={[12, 12]}>
                                                                                <Col span={6}>
                                                                                    <span style={{ color: '#000' }}>Giảng viên: {item.teacher.fullname}</span>
                                                                                </Col>
                                                                                <Col span={8}>
                                                                                    <span style={{ color: '#000' }}>Ngày bắt đầu: {item.open_date}</span>
                                                                                </Col>
                                                                                <Col span={8}>
                                                                                    <span style={{ color: '#000' }}>{courseHomeStatus(item)}</span>
                                                                                </Col>
                                                                                <Col span={6}>
                                                                                    <span
                                                                                        style={{ color: '#000' }}>Đăng ký: {item.student_count}/{item.maximum_number}</span>
                                                                                </Col>
                                                                                <Col span={8}>
                                                                                    <span style={{ color: '#000' }}>Ngày mở đăng ký {item.register_date}</span>
                                                                                </Col>
                                                                                <Col span={10}>
                                                                                    <span style={{ color: '#000' }}>Gia hạn đăng ký khi khóa học đã mở: {item.over_admission_days} ngày</span>
                                                                                </Col>
                                                                            </Row>
                                                                        }
                                                                    />
                                                                </List.Item>
                                                            )
                                                        }}
                                                    />
                                                </SubMenu>
                                            )
                                        })

                                    }
                                </Menu>


                            </Spin>

                        </div>
                    </Col>
                </Row>

            </div>

        </section>
    )
}

export default RegisterClassPage