import React, { useEffect, lazy, Suspense, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams, useHistory, useLocation } from 'react-router-dom'

import { buyCourseStart, fetchCourseDetailStart, buyCourseFinish } from '../../redux/Course/course.actions'
import { Breadcrumb, Modal, Skeleton, Spin, Result, Button, message } from 'antd'
import { HomeOutlined } from '@ant-design/icons'
import { createStructuredSelector } from "reselect";
import {
    courseDetailSelector,
    errorResponseSelector,
    isFetchingSelector,
    courseDetailDetailSelector,
    courseClassesSelector,
} from "../../redux/Course/course.selects";
import { slugifyString } from "../../utils/text.utils";
import CourseDetailBanner from "../../components/Banners/course-detail-banner.component";
import CourseDetailTab from "../../components/Course/course-detail-tab.component";
import CourseDetailOverview from "../../components/Course/course-detail-overview.component";
import CourseDetailComponents from "../../components/Course/course-detail-components.component";
import CourseClasses from "../../components/Course/course-classes.component";

import ErrorBoundary from '../../components/ErrorBoundary/error-boundary.component'
import {
    myCourseHomesSelector,
    errorResponseRegisterCourseSelector,
    courseHomeShowSelector
} from "../../redux/CourseHome/course-home.selects";
import { getCourseHomeShowStart, registerCourseStart } from "../../redux/CourseHome/course-home.actions";
import { tokenSelector } from "../../redux/Auth/auth.selects";
import { registerCourseModalSelector } from "../../redux/UI/ui.selects";
import { showRLModal, toggleRegisterCourseModal } from "../../redux/UI/ui.actions";
import Constants from "../../constants";

const AbilityTest = lazy(() => import("../../components/AbilityTest/ability-test.component"));

const CourseDetail = ({location}) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { slug } = useParams();
    const {
        course, courseDetail, isFetching, errorResponse, myCourses,
        token, registerCourseModal, errorRegister, classes, courseHomeShows,
    } = useSelector(createStructuredSelector({
        course: courseDetailSelector,
        courseDetail: courseDetailDetailSelector,
        isFetching: isFetchingSelector,
        errorResponse: errorResponseSelector,
        myCourses: myCourseHomesSelector,
        token: tokenSelector,
        registerCourseModal: registerCourseModalSelector,
        errorRegister: errorResponseRegisterCourseSelector,
        classes: courseClassesSelector,
        courseHomeShows: courseHomeShowSelector
    }));

    useEffect(() => {
        dispatch(fetchCourseDetailStart({ slug, token }));
    }, []);


    useEffect(() => {
            const params = new URLSearchParams(location.search); 
            const partnerRefId = params.get("orderId")
            const requestId = params.get("requestId")
            const errorCode = params.get("errorCode")
            const extraData = params.get("extraData")
            dispatch(buyCourseFinish({ course: course.id, token, partnerRefId, requestId, errorCode, extraData }))
    }, [course])




    return (
        <div className="page section-10 course-detail">
        </div>
    )
};

export default CourseDetail