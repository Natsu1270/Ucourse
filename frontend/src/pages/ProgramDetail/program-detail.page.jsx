import React, {useEffect, useState} from 'react'
import {Breadcrumb, message, Skeleton} from "antd";
import {HomeOutlined} from "@ant-design/icons";
import {useParams} from 'react-router-dom'

import {slugifyString} from "../../utils/text.utils";
import {useDispatch, useSelector} from "react-redux";
import {fetchProgramDetailStart} from "../../redux/Program/program.actions";
import {createStructuredSelector} from "reselect";
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
import {buyProgramAPI} from "../../api/program.services";
import {tokenSelector} from "../../redux/Auth/auth.selects";
import Constants from "../../constants";
import {showRLModal} from "../../redux/UI/ui.actions";

const ProgramDetailPage = () => {
    const [isRegistering, setIsRegistering] = useState(false)
    const [own, setOwn] = useState(false);
    const dispatch = useDispatch()
    const {slug} = useParams()


    const {program, programCourses, isFetching, errorResponse, token} = useSelector(createStructuredSelector({
        program: programDetailSelector,
        programCourses: programCoursesSelector,
        isFetching: isFetchingSelector,
        errorResponse: errorResponseSelector,
        token: tokenSelector
    }))

    useEffect(() => {
        window.scrollTo(0, 0)
        dispatch(fetchProgramDetailStart({slug, token}))
    }, [dispatch])

    useEffect(() => {
        if (program.is_my_program !== undefined) {
            setOwn(program.is_my_program)
        }
    }, [program])

    const registerProgram = async () => {
        setIsRegistering(true)
        const result = await buyProgramAPI({token, program_id: program.id})
    }

    const handleRegister = () => {
        if (!token) {
            message.error(Constants.UN_AUTHORIZATION_ERROR, 1.5, () => dispatch(showRLModal()))
            return
        }
        registerProgram()
            .then(res => {
                message.success("Đăng ký chương trình thành công")
                setOwn(true)
            })
            .catch(err => message.error(err.message))
            .finally(() => setIsRegistering(false))
    }

    const programDetailComp = (<div className="program-detail">
        <Breadcrumb separator='>' className="course-detail__breadcrumb">
            <Breadcrumb.Item href="/">
                <HomeOutlined/>
            </Breadcrumb.Item>
            <Breadcrumb.Item href="/field">
                Field
            </Breadcrumb.Item>
            <Breadcrumb.Item href={`/field/${slugifyString(program.field)}`}>
                {program.field}
            </Breadcrumb.Item>
        </Breadcrumb>
        <ProgramDetailBanner isOwn={own} isRegistering={isRegistering} handleRegister={handleRegister}
                             program={program}/>
        <CourseDetailTab isRegistering={isRegistering} handleRegister={handleRegister} isProgram={true}/>
        <CourseDetailOverview
            benefits={program.benefits}
            full_description={program.full_description}
            num_course={program.courses_count}
        />
        <ProgramDetailPrequire prequire={program.pre_requisites}/>
        <ProgramDetailComponents courses={programCourses}/>

    </div>)

    return (
        <div className="program-detail page section-10">
            {
                !isFetching ?
                    <ErrorBoundary errResponse={errorResponse} comp={programDetailComp}/>
                    : <Skeleton active avatar/>
            }
        </div>
    )
};

export default ProgramDetailPage