import React, {useEffect} from 'react'
import {useParams} from 'react-router-dom'

import ErrorBoundary from "../../components/ErrorBoundary/error-boundary.component";
import {Breadcrumb, Skeleton} from "antd";
import {HomeOutlined} from "@ant-design/icons";
import {slugifyString} from "../../utils/text.utils";
import {useDispatch, useSelector} from "react-redux";

import {getCourseHomeShowDetailStart} from '../../redux/CourseHome/course-home.actions'
import {
    classCourseSelector,
    classFieldSelector,
    courseHomeDetailShowSelector,
    errorResponseSelector,
    isLoadingSelector
} from '../../redux/CourseHome/course-home.selects'
import {createStructuredSelector} from "reselect";
import {tokenSelector} from "../../redux/Auth/auth.selects";

const ClassDetailPage = () => {

    const {slug, name} = useParams()
    const dispatch = useDispatch()
    const className = slugifyString(slug + name)

    const {token, classDetail, classField, classCourse,
        isLoading, errorResponse} = useSelector(createStructuredSelector({
        token: tokenSelector,
        classDetail: courseHomeDetailShowSelector,
        classField: classFieldSelector,
        classCourse: classCourseSelector,
        errorResponse: errorResponseSelector,
        isLoading: isLoadingSelector
    }))

    useEffect(() => {
        dispatch(getCourseHomeShowDetailStart({token, slug: className}))
    }, [])


    const classDetailComp = (
        <div>
            <Breadcrumb separator='>' className="course-detail__breadcrumb">
                <Skeleton paragraph={{rows: 1}} active loading={isLoading}>
                    <Breadcrumb.Item href="/">
                        <HomeOutlined/>
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
                </Skeleton>
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