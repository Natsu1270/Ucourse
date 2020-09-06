import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { List, Avatar, Skeleton, Tag, Button, message, notification, Row, Col } from 'antd'
import { dayDiff } from "../../utils/text.utils";
import moment from 'moment'
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { registerCourseStart, unRegisterCourseStart } from "../../redux/CourseHome/course-home.actions";
import Constants from "../../constants";
import CourseHomeDrawer from "../CourseHome/course-home-drawer.component";
import { registerCourseAPI, unRegisterCourseAPI } from '../../api/courseHome.services'

import { courseHomeStatus, canRegister } from './course-home.utils'

const CourseClasses = ({ course, classes, isLoading, isOwn, token }) => {

    const history = useHistory()
    const dispatch = useDispatch()
    const now = moment()
    const [loading, setLoading] = useState(false)
    const [courseClasses, setClass] = useState([])

    useEffect(() => {
        if (classes.length > 0) setClass(classes)
    }, [classes])

    const registerCourse = async (type, class_id, course_id) => {
        setLoading(true)
        const data = { token, class_id }
        try {
            if (type === 1) {
                const { data } = await registerCourseAPI({ course_id, token, class_id })
                const updateCourses = courseClasses.map(c => {
                    if (c.id === class_id) {
                        c.is_my_class = true
                    }
                    else {
                        c.is_my_class = false
                    }
                    return c
                })
                setClass(updateCourses)
                message.success('Đăng ký thành công')
            } else {
                const { data } = await unRegisterCourseAPI({ token, class_id, course_id })
                const updateCourses = courseClasses.map(c => {
                    if (c.id === class_id) c.is_my_class = false
                    return c
                })
                setClass(updateCourses)
                message.success('Hủy đăng ký thành công')
            }
        } catch (err) {
            message.error('Có lỗi xảy ra: ' + err.message)
        }
        setLoading(false)
    }

    const openNotification = (registeredClass, item) => {
        const key = `open${Date.now()}`;
        const btn = (
            <Button type="primary" size="small" onClick={() => {
                if (registeredClass.id === item.id) {
                    registerCourse(2, item.id, course.id)
                } else {
                    registerCourse(1, item.id, course.id)
                }
                notification.close(key)
            }}>
                Xác nhận
            </Button>
        );
        notification.open({
            message: 'Notification Title',
            description: course.id === item.id ? 'Bạn có muốn hủy đăng ký ?' :
                `Bạn đã đăng ký lớp ${registeredClass.full_name}, bạn có chắc chuyển đăng ký sang lớp này không?`
            ,
            btn,
            key,
        });
    };


    const registerClass = (item) => {
        if (!isOwn) {
            message.error("Vui lòng đăng ký khóa học trước khi đăng ký lớp")
        } else {
            const registeredClass = classes.find(c => c.is_my_class === true)
            if (registeredClass) {
                openNotification(registeredClass, item)
            }
            else {
                registerCourse(1, item.id, course.id)
                // dispatch(registerCourseStart({ course_id: course.id, token, class_id: item.id }))
            }
        }
    }

    const registerBtn = (item) => {
        if (item.is_my_class) {
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

    return (
        <section className="mt-10 section-course-classes" id="cs-course-classes">
            <h2 className="text--main section-header" id="cs-course-overview">
                Danh sách lớp thuộc khóa học
            </h2>
            {classes.length ? <List
                className="class-list"
                loading={isLoading}
                itemLayout="horizontal"
                dataSource={classes}
                renderItem={item => (
                    <List.Item
                        actions={[
                            <Button
                                loading={loading}
                                onClick={() => registerClass(item)}
                                disabled={!canRegister(item) || item.student_count === item.maximum_number ||
                                    moment(item.open_date).isSameOrBefore(now)
                                }
                                type="primary"
                                key="list-loadmore-edit">
                                {
                                    registerBtn(item)
                                }
                            </Button>,
                            // eslint-disable-next-line jsx-a11y/anchor-is-valid
                            <Button onClick={() => history.push(`${course.slug}/${item.name}`)} key={`a-${item.id}`}>
                                Chi tiết
                            </Button>,
                        ]}
                    >
                        <Skeleton avatar title={false} loading={isLoading} active>
                            <List.Item.Meta
                                avatar={
                                    <Avatar src={item.teacher.avatar} />
                                }
                                title={
                                    <Link to={`${course.slug}/${item.name}`} className="text--sub__bigger3 text-black">{item.full_name}</Link>}
                                description={
                                    <Row gutter={[12, 12]}>
                                        <Col span={6}>
                                            <Link
                                                style={{ color: 'blue' }}

                                                to={`/user/${item.teacher.username}`}>
                                                Giảng viên: {item.teacher.fullname}
                                            </Link>
                                        </Col>
                                        <Col span={8}>
                                            <span className="class-sub-info__item">Ngày bắt đầu: {item.open_date}</span>
                                        </Col>
                                        <Col span={8}>
                                            <span className="class-sub-info__item">{courseHomeStatus(item)}</span>
                                        </Col>
                                        <Col span={6}>
                                            <span
                                                className="class-sub-info__item">Đăng ký: {item.student_count}/{item.maximum_number}</span>
                                        </Col>
                                        <Col span={8}>
                                            <span className="class-sub-info__item">Ngày mở đăng ký {item.register_date}</span>
                                        </Col>
                                        <Col span={10}>
                                            <span className="class-sub-info__item">Gia hạn đăng ký khi khóa học đã mở: {item.over_admission_days} ngày</span>
                                        </Col>

                                    </Row>
                                }

                            />

                        </Skeleton>
                    </List.Item>
                )}
            /> : Constants.EMPTY_CLASS_RESULT}
        </section>
    )
}

export default CourseClasses