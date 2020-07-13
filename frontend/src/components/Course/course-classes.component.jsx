import React, { useState } from 'react'
import { List, Avatar, Skeleton, Tag, Button, message } from 'antd'
import { dayDiff } from "../../utils/text.utils";
import moment from 'moment'
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { registerCourseStart, unRegisterCourseStart } from "../../redux/CourseHome/course-home.actions";
import Constants from "../../constants";
import CourseHomeDrawer from "../CourseHome/course-home-drawer.component";

import { courseHomeStatus, canRegister } from './course-home.utils'

const CourseClasses = ({ course, classes, isLoading, isOwn, token }) => {

    const history = useHistory()
    const dispatch = useDispatch()
    const now = moment()


    const registerClass = (item) => {
        if (!isOwn) {
            message.error("Vui lòng đăng ký khóa học trước khi đăng ký lớp")
        } else {
            if (item.is_my_class) {
                dispatch(unRegisterCourseStart({ token, class_id: item.id }))
            } else {
                dispatch(registerCourseStart({ course_id: course.id, token, class_id: item.id }))
            }
            window.location.reload();
        }
    }

    const registerBtn = (item) => {
        if (!canRegister(item)) return 'Hết hạn đăng ký'
        if (item.is_my_class) {
            if (dayDiff(item.open_date, now) <= 0) {
                return 'Đăng ký thành công'
            } else {
                return 'Hủy đăng ký'
            }
        }
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
                                onClick={() => registerClass(item)}
                                disabled={!canRegister(item)}
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
                                title={<span className="text--sub__bigger3 text-black">{item.full_name}</span>}
                                description={<div className="class-sub-info text-info-normal">
                                    <span className="class-sub-info__item">Giảng viên: {item.teacher.fullname}</span>
                                    <span className="class-sub-info__item">Ngày bắt đầu: {item.open_date}</span>
                                    <span className="class-sub-info__item">{courseHomeStatus(item)}</span>
                                    <span
                                        className="class-sub-info__item">Đăng ký: {item.student_count}/{item.maximum_number}</span>
                                </div>}
                            />

                        </Skeleton>
                    </List.Item>
                )}
            /> : Constants.EMPTY_CLASS_RESULT}
        </section>
    )
}

export default CourseClasses