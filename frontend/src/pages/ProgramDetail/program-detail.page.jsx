import React, { useEffect, useState } from 'react'
import { Breadcrumb, message, Skeleton, Modal, Result, Button } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { useParams, useLocation } from 'react-router-dom'

import { slugifyString } from "../../utils/text.utils";
import { useDispatch, useSelector } from "react-redux";
import { fetchProgramDetailStart } from "../../redux/Program/program.actions";
import { createStructuredSelector } from "reselect";
import {
    errorResponseSelector,
    isFetchingSelector,
    programDetailSelector,
    programCoursesSelector
} from "../../redux/Program/program.selects";
import ProgramDetailBanner from "../../components/Program/program-detail-banner.component";
import CourseDetailTab from "../../components/Course/course-detail-tab.component";
import CourseDetailOverview from "../../components/Course/course-detail-overview.component";
import ProgramDetailPrequire from "../../components/Program/program-detail-prequire.component";
import ProgramDetailComponents from "../../components/Program/program-detail-componenets.component";
import ErrorBoundary from '../../components/ErrorBoundary/error-boundary.component'
import { buyProgramAPI, buyProgramSuccessAPI } from "../../api/program.services";
import { tokenSelector, userRoleSelector } from "../../redux/Auth/auth.selects";
import Constants from "../../constants";
import { showRLModal, toggleRegisterCourseModal } from "../../redux/UI/ui.actions";
import queryString from "query-string"

const ProgramDetailPage = () => {
    const [isRegistering, setIsRegistering] = useState(false)
    const [buyResult, setBuyResult] = useState(false)
    const [own, setOwn] = useState(false);
    const [isCall, setIsCall] = useState(false)
    const dispatch = useDispatch()
    const { slug } = useParams()
    const location = useLocation()
    const queryValues = queryString.parse(location.search);

    const { program, programCourses, isFetching, errorResponse, token, userRole } = useSelector(createStructuredSelector({
        program: programDetailSelector,
        programCourses: programCoursesSelector,
        isFetching: isFetchingSelector,
        errorResponse: errorResponseSelector,
        token: tokenSelector,
        userRole: userRoleSelector
    }))

    const updatePayment = async () => {
        setIsRegistering(true)
        setIsCall(true)
        const partnerRefId = queryValues.orderId
        const requestId = queryValues.requestId
        const errorCode = queryValues.errorCode
        const extraData = queryValues.extraData
        try {
            const { data } = await buyProgramSuccessAPI({ token, partnerRefId, requestId, errorCode, extraData, program: program.id })
            if (data.result) {
                setOwn(true)
                setBuyResult(true)
            } else {
                message.error("Thanh toán thất bại!")
            }
        } catch (err) {
            message.error("Lỗi: " + err.message)
        }
        setIsRegistering(false)
    }

    useEffect(() => {
        if (queryValues.requestId && program.id && token && !isCall) {
            updatePayment()
        }
    }, [queryValues, program, token])

    useEffect(() => {
        window.scrollTo(0, 0)
        dispatch(fetchProgramDetailStart({ slug, token }))
    }, [dispatch])

    useEffect(() => {
        if (program.is_my_program !== undefined) {
            setOwn(program.is_my_program)
        }
    }, [program])

    const programDetailComp = (<div className="program-detail">
        <Breadcrumb separator='>' className="course-detail__breadcrumb">
            <Breadcrumb.Item href="/">
                <HomeOutlined />
            </Breadcrumb.Item>
            <Breadcrumb.Item href="/field">
                Field
            </Breadcrumb.Item>
            <Breadcrumb.Item href={`/field/${slugifyString(program.field)}`}>
                {program.field}
            </Breadcrumb.Item>
        </Breadcrumb>
        <ProgramDetailBanner
            isOwn={own} isRegistering={isRegistering} program={program}
            userRole={userRole} programCourses={programCourses} token={token} />
        <CourseDetailTab isRegistering={isRegistering} isProgram={true} />
        <CourseDetailOverview
            benefits={program.benefits}
            full_description={program.full_description}
            num_course={program.courses_count}
        />
        <ProgramDetailPrequire prequire={program.pre_requisites} />
        <ProgramDetailComponents courses={programCourses} boughtCourses={program.bought_courses} />

    </div>)

    return (
        <div className="program-detail page section-10">
            {
                !isFetching ?
                    <ErrorBoundary errResponse={errorResponse} comp={programDetailComp} />
                    : <Skeleton active avatar />
            }
            <Modal title="Đăng ký chương trình thành công"
                visible={buyResult}
                onCancel={() => setBuyResult(false)}
                onOk={() => setBuyResult(false)}
                footer={null}
                bodyStyle={{ backgroundColor: 'white', height: '35rem', padding: '0' }}
            >
                <Result
                    status="success"
                    title="Đăng ký chương trình thành công!"
                    subTitle={`Bạn đã đăng ký chương trình ${program.name} thành công`}
                    extra={[
                        <Button key="buy" type="primary" onClick={() => setBuyResult(false)}>Đóng</Button>,
                    ]}
                />
            </Modal>
        </div>
    )
};

export default ProgramDetailPage