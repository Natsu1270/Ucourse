import React from 'react'
import { useSelector } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
    errorResponseSelector, fieldCoursesSelector, fieldDetailSelector,
    fieldProgramsSelector,
    isFetchingDetailSelector
} from "../../redux/Field/field.selects";
import SearchInput from "../SearchInput/search-input.component";
import SearchPrograms from "../SearchResult/search-programs.component";
import { Breadcrumb, Skeleton, Tabs } from "antd";
import FieldContainer from "./field-container.component";
import CourseCards from "../Course/course-cards.component";
import SearchFilter from "../SearchResult/search-filter.component";
import FieldDetailBanner from "../Banners/field-detail-banner.component";
import ErrorBoundary from '../ErrorBoundary/error-boundary.component';

import { HomeOutlined } from "@ant-design/icons";
import { slugifyString } from "../../utils/text.utils";


const FieldDetail = () => {
    const { TabPane } = Tabs;
    const { programs, courses, fieldDetail, isFetchingDetail, errorResponse } = useSelector(createStructuredSelector({
        programs: fieldProgramsSelector,
        courses: fieldCoursesSelector,
        fieldDetail: fieldDetailSelector,
        isFetchingDetail: isFetchingDetailSelector,
        errorResponse: errorResponseSelector
    }));

    const fieldDetailComp = (<div className="field-detail__content">
        <Breadcrumb separator='>' className="course-detail__breadcrumb">
            <Breadcrumb.Item href="/">
                <HomeOutlined />
            </Breadcrumb.Item>
            <Breadcrumb.Item href="/field">
                Lĩnh vực
        </Breadcrumb.Item>
        </Breadcrumb>

        <FieldDetailBanner
            title={fieldDetail.name}
            description={fieldDetail.description}
            photo={fieldDetail.icon}
            isLoading={isFetchingDetail}
        />
        <Tabs defaultActiveKey="1">
            <TabPane tab="Tất cả" key="1">
                <h1 className='search-result--title'>
                    Chương trình học 
                </h1>
                <FieldContainer component={SearchPrograms} programs={programs} />
                <h1 className='search-result--title'>Khóa học</h1>
                <FieldContainer component={CourseCards} courses={courses} isCourses={true} />
            </TabPane>

            <TabPane tab="Chương trình học" key="2">
                <FieldContainer component={SearchPrograms} programs={programs} />
            </TabPane>

            <TabPane tab="Khoá học" key="3">
                <FieldContainer component={CourseCards} courses={courses} />
            </TabPane>
        </Tabs>
    </div>)

    return (
        <div className="section-10 page field-detail">
            <ErrorBoundary errResponse={errorResponse} comp={fieldDetailComp} />
        </div>
    )
};

export default FieldDetail