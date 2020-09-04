import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import ErrorBoundary from "../../components/ErrorBoundary/error-boundary.component";
import { Breadcrumb, Skeleton } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { slugifyString } from "../../utils/text.utils";
import { useDispatch, useSelector } from "react-redux";

import { getCourseHomeShowDetailStart } from '../../redux/CourseHome/course-home.actions'
import {
    classCourseSelector,
    classFieldSelector,
    courseHomeDetailShowSelector,
    errorResponseSelector,
    isLoadingSelector
} from '../../redux/CourseHome/course-home.selects'
import { createStructuredSelector } from "reselect";
import { tokenSelector } from "../../redux/Auth/auth.selects";
import { Descriptions, Badge, Timeline, Button, message } from 'antd';
import { formatDate } from '../../utils/text.utils'
import Constants from '../../constants'
import { courseHomeStatus, canRegister } from '../../components/Course/course-home.utils'
import { dayDiff } from "../../utils/text.utils";
import { registerCourseStart, unRegisterCourseStart } from "../../redux/CourseHome/course-home.actions";
import { checkBoughtCourseAPI } from "../../api/course.services";



import "./class-detail.page.scss";
import moment from 'moment';

const now = moment()

const ClassDetailPage = () => {

    const { slug, name } = useParams()
    const dispatch = useDispatch()
    const className = slugifyString(slug + name)

    const {
        token, classDetail, classField, classCourse,
        isLoading, errorResponse
    } = useSelector(createStructuredSelector({
        token: tokenSelector,
        classDetail: courseHomeDetailShowSelector,
        classField: classFieldSelector,
        classCourse: classCourseSelector,
        errorResponse: errorResponseSelector,
        isLoading: isLoadingSelector
    }))

    useEffect(() => {
        window.scrollTo(0, 0)
        if (token) {

            dispatch(getCourseHomeShowDetailStart({ token, slug: className }))
        }
    }, [className, dispatch, token])

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



    const registerClass = async (item) => {
        try {
            const result = await checkBoughtCourseAPI({ token, course: classDetail.course.id })
            const isOwn = result.status === 200
            if (!isOwn) {
                message.error("Vui lòng đăng ký khóa học trước khi đăng ký lớp")
            } else {
                if (item.is_my_class) {
                    dispatch(unRegisterCourseStart({ token, class_id: item.id }))
                } else {
                    dispatch(registerCourseStart({ course_id: item.course.id, token, class_id: item.id }))
                }
                window.location.reload();
            }
        } catch (err) {
            console.log(err)
        }
    }


    const classDetailComp = (
        <div className="class-detail">
            <Skeleton paragraph={{ rows: 1 }} active loading={isLoading}>
                <Breadcrumb separator='>' className="course-detail__breadcrumb mb-5">
                    <Breadcrumb.Item href="/">
                        <HomeOutlined />
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href="/field">
                        Field
                        </Breadcrumb.Item>
                    <Breadcrumb.Item href={`/field/${slugifyString(classField.slug)}`}>
                        {classField.name}
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href={`/courses/${slugifyString(classCourse.slug)}`}>
                        {classCourse.title}
                    </Breadcrumb.Item>
                </Breadcrumb>
            </Skeleton>

            <div className="class-detail--content mb-4">
                <Skeleton active loading={isLoading}>
                    <div className="row">
                        <h3 className="text--main col-xl-6 col-md-6">
                            {classDetail.full_name}
                        </h3>
                    </div>
                </Skeleton>

                <Skeleton active loading={isLoading}>
                    <Descriptions className="class-detail__description"
                        title={
                            <div className="row">
                                <h3 className="col-xl-6 col-md-6">
                                    Thông tin lớp học
                                </h3>
                                <div className="col-xl-6 col-md-6 text-right">
                                    {
                                        canRegister(classDetail) ?

                                            <Button type="primary" onClick={() => registerClass(classDetail)}>
                                                {registerBtn(classDetail)}
                                            </Button>
                                            : null
                                    }
                                </div>
                            </div>}
                        layout="vertical" bordered>
                        <Descriptions.Item label="Khoá học">{classDetail.course ? classDetail.course.title : ''}</Descriptions.Item>
                        <Descriptions.Item label="Giảng viên">{classDetail.teacher ? classDetail.teacher.fullname : ''}</Descriptions.Item>
                        <Descriptions.Item label="Trạng thái">
                            {courseHomeStatus(classDetail)}
                        </Descriptions.Item>
                        <Descriptions.Item label="Số lượng học viên đã đăng ký">{classDetail.student_count}</Descriptions.Item>
                        <Descriptions.Item label="Số lượng học viên tối đa">{classDetail.maximum_number}</Descriptions.Item>
                        <Descriptions.Item label="Thời gian cho phép đăng ký sau khi lớp bắt đầu" >{classDetail.over_admission_days}</Descriptions.Item>
                        <Descriptions.Item label="Thời gian dự kiến">
                            <Timeline>
                                <Timeline.Item color="green">{formatDate(classDetail.register_date, Constants.DD_MM_YYYY)} - Ngày mở đăng ký</Timeline.Item>
                                <Timeline.Item color="green">{formatDate(classDetail.open_date, Constants.DD_MM_YYYY)} - Ngày bắt đầu học</Timeline.Item>
                                <Timeline.Item color="red">
                                    {formatDate(moment(classDetail.open_date).add('days', classDetail.over_admission_days), Constants.DD_MM_YYYY)} - Ngày hết hạn đăng ký
                                </Timeline.Item>
                                <Timeline.Item color="red">
                                    {formatDate(classDetail.end_date, Constants.DD_MM_YYYY)} - Ngày kết thúc dự kiến
                                </Timeline.Item>

                            </Timeline>
                        </Descriptions.Item>
                    </Descriptions>
                </Skeleton>
            </div>
        </div>
    )

    return (
        <div className="section-10 page class-detail-page">
            <ErrorBoundary errResponse={errorResponse} comp={classDetailComp} />
        </div>
    )
}

export default ClassDetailPage