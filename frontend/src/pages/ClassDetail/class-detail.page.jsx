import React, {useEffect} from 'react'
import {useParams} from 'react-router-dom'

import ErrorBoundary from "../../components/ErrorBoundary/error-boundary.component";
import {Breadcrumb} from "antd";
import {HomeOutlined} from "@ant-design/icons";
import {slugifyString} from "../../utils/text.utils";
import {useDispatch, useSelector} from "react-redux";

import {getCourseHomeShowDetailStart} from '../../redux/CourseHome/course-home.actions'
import {
    courseHomeDetailShowSelector,
    errorResponseSelector,
    isLoadingSelector
} from '../../redux/CourseHome/course-home.selects'
import {createStructuredSelector} from "reselect";
import {tokenSelector} from "../../redux/Auth/auth.selects";

const ClassDetailPage = () => {

    const {slug, name} = useParams()
    const dispatch = useDispatch()

    const {token, classDetail, isLoading, errorResponse} = useSelector(createStructuredSelector({
        token: tokenSelector,
        classDetail: courseHomeDetailShowSelector,
        errorResponse: errorResponseSelector,
        isLoading: isLoadingSelector
    }))

    useEffect(() => {
        dispatch(getCourseHomeShowDetailStart({token, slug: name}))
    })


    const classDetailComp = (
        <div>
            <Breadcrumb separator='>' className="course-detail__breadcrumb">
                <Breadcrumb.Item href="/">
                    <HomeOutlined/>
                </Breadcrumb.Item>
                <Breadcrumb.Item href="/field">
                    Field
                </Breadcrumb.Item>
                <Breadcrumb.Item href={`/field/${slugifyString(classDetail.field.slug)}`}>
                    {classDetail.field.name}
                </Breadcrumb.Item>
                <Breadcrumb.Item href={`/courses/${slugifyString(classDetail.course.slug)}`}>
                    {classDetail.course.title}
                </Breadcrumb.Item>
            </Breadcrumb>
        </div>
    )

    return (
        <div className="section-10 page class-detail-page">
            <ErrorBoundary errResponse={errorResponse} comp={classDetailComp}/>
        </div>
    )
}

export default ClassDetailPage