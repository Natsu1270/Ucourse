import React, { useEffect } from 'react'
import {Breadcrumb, Skeleton} from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { useParams } from 'react-router-dom'

import { slugifyString } from "../../utils/text.utils";
import { useDispatch, useSelector } from "react-redux";
import { fetchProgramDetailStart } from "../../redux/Program/program.actions";
import { createStructuredSelector } from "reselect";
import { errorResponseSelector, isFetchingSelector, programDetailSelector, programCoursesSelector } from "../../redux/Program/program.selects";
import HashLoader from "react-spinners/HashLoader";
import Constants from "../../constants";
import ProgramDetailBanner from "../../components/Program/program-detail-banner.component";
import CourseDetailTab from "../../components/Course/course-detail-tab.component";
import CourseDetailOverview from "../../components/Course/course-detail-overview.component";
import ProgramDetailPrequire from "../../components/Program/program-detail-prequire.component";
import ProgramDetailComponents from "../../components/Program/program-detail-componenets.component";
import ErrorBoundary from '../../components/ErrorBoundary/error-boundary.component'

const ProgramDetailPage = () => {

    const dispatch = useDispatch()
    const { slug } = useParams()
    useEffect(() => {
        window.scrollTo(0, 0)
        dispatch(fetchProgramDetailStart(slug))
    }, [])

    const { program, programCourses, isFetching, errorResponse } = useSelector(createStructuredSelector({
        program: programDetailSelector,
        programCourses: programCoursesSelector,
        isFetching: isFetchingSelector,
        errorResponse: errorResponseSelector
    }))

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
        <ProgramDetailBanner program={program} />
        <CourseDetailTab isProgram={true} />
        <CourseDetailOverview
            benefits={program.benefits}
            full_description={program.full_description}
            num_course={program.courses_count}
        />
        <ProgramDetailPrequire prequire={program.pre_requisites} />
        <ProgramDetailComponents courses={programCourses} />

    </div>)

    return (
        <div className="program-detail page section-10">
            {
                !isFetching ?
                    <ErrorBoundary errResponse={errorResponse} comp={programDetailComp} />
                    : <Skeleton active avatar />
            }
        </div>
    )
};

export default ProgramDetailPage