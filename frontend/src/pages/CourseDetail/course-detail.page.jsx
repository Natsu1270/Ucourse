import React, {useEffect, lazy, Suspense, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux';
import {Link, useParams, useHistory} from 'react-router-dom'

import {fetchCourseDetailStart} from '../../redux/Course/course.actions'
import {Breadcrumb, Modal, Skeleton, Spin, Result, Button} from 'antd'
import {HomeOutlined} from '@ant-design/icons'
import {createStructuredSelector} from "reselect";
import {
    courseDetailSelector,
    errorResponseSelector,
    isFetchingSelector,
    courseDetailDetailSelector,
    courseTeacherSelector,
} from "../../redux/Course/course.selects";
import {slugifyString} from "../../utils/text.utils";
import CourseDetailBanner from "../../components/Banners/course-detail-banner.component";
import CourseDetailTab from "../../components/Course/course-detail-tab.component";
import CourseDetailOverview from "../../components/Course/course-detail-overview.component";
import CourseDetailComponents from "../../components/Course/course-detail-components.component";
import CourseDetailTeacher from "../../components/Course/course-detail-teacher.component";
import CourseDetailReview from "../../components/Course/course-detail-review.component";
import CourseDetailRelated from "../../components/Course/course-detail-related.component";
import ErrorBoundary from '../../components/ErrorBoundary/error-boundary.component'
import {myCourseHomesSelector, errorResponseRegisterCourseSelector} from "../../redux/CourseHome/course-home.selects";
import {registerCourseStart} from "../../redux/CourseHome/course-home.actions";
import {tokenSelector} from "../../redux/Auth/auth.selects";
import {registerCourseModalSelector} from "../../redux/UI/ui.selects";
import {toggleRegisterCourseModal} from "../../redux/UI/ui.actions";
import Constants from "../../constants";

const AbilityTest = lazy(() => import("../../components/AbilityTest/ability-test.component"));

const CourseDetail = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const {slug} = useParams();
    const [ownCourse, setOwnCourse] = useState(false);

    const {
        course, courseDetail, teachers,
        isFetching, errorResponse, myCourses,
        token, registerCourseModal, errorRegister
    } = useSelector(createStructuredSelector({
        course: courseDetailSelector,
        courseDetail: courseDetailDetailSelector,
        teachers: courseTeacherSelector,
        isFetching: isFetchingSelector,
        errorResponse: errorResponseSelector,
        myCourses: myCourseHomesSelector,
        token: tokenSelector,
        registerCourseModal: registerCourseModalSelector,
        errorRegister: errorResponseRegisterCourseSelector
    }));

    const isMyCourse = () => {
        let isOwn = myCourses.some(c => c.id === course.id)
        setOwnCourse(isOwn)
    };

    useEffect(() => {
        dispatch(fetchCourseDetailStart(slug));
        window.scrollTo(0, 0)
    }, []);

    useEffect(() => {
        if (Object.keys(course).length > 0) {
            isMyCourse()
        }
    }, [course])



    const handleRegister = () => {
        dispatch(registerCourseStart({course_id: course.id, token}))
        if (!errorRegister) {
            dispatch(toggleRegisterCourseModal())
            setOwnCourse(true)
        }
    };

    const courseDetailComp = (
        <div className="course-detail">
            <Breadcrumb separator='>' className="course-detail__breadcrumb">
                <Breadcrumb.Item href="/">
                    <HomeOutlined/>
                </Breadcrumb.Item>
                <Breadcrumb.Item href="/field">
                    Field
                </Breadcrumb.Item>
                <Breadcrumb.Item href={`/field/${slugifyString(course.field)}`}>
                    {course.field}
                </Breadcrumb.Item>
            </Breadcrumb>

            <CourseDetailBanner
                courseDetail={courseDetail}
                course={course}
                own={ownCourse}
                teachers={teachers}
                handleRegister={handleRegister}
            />

            <CourseDetailTab isOwn={ownCourse} course={course} isProgram={false} handleRegister={handleRegister}/>

            <CourseDetailOverview
                full_description={courseDetail.full_description}
                open_date={course.open_date}
                end_date={course.end_date}
                level={course.level}
                benefits={courseDetail.benefits}
                skills={courseDetail.skills}
            />

            <CourseDetailComponents course={course}/>

            <CourseDetailTeacher teachers={teachers}/>

            <CourseDetailReview course={course}/>

            <CourseDetailRelated course={course}/>

            <AbilityTest/>

            <Modal title="Đăng ký khóa học thành công"
                   visible={registerCourseModal}
                   onCancel={() => dispatch(toggleRegisterCourseModal())}
                   onOk={() => dispatch(toggleRegisterCourseModal())}
                   footer={null}
                   bodyStyle={{backgroundColor: 'white', height: '35rem', padding: '0'}}
            >
                <Result
                    status="success"
                    title="Đăng ký khóa học thành công!"
                    subTitle={`Bạn đã đăng ký khóa học ${course.title} thành công`}
                    extra={[
                        <Button
                            type="primary"
                            key="console"
                            onClick={() => window.open(`${Constants.COURSE_HOME_LINK}/${course.slug}`, '_self')}>
                            Truy cập khóa học
                        </Button>,
                        <Button key="buy" onClick={() => dispatch(toggleRegisterCourseModal())}>Đóng</Button>,
                    ]}
                />
            </Modal>
        </div>
    );


    return (
        <div className="page section-10 course-detail">
            {
                !isFetching ? <ErrorBoundary comp={courseDetailComp} errResponse={errorResponse}/> : (
                    <div className="skeleton">
                        <Skeleton active avatar paragraph={{rows: 6}}/>
                        <Skeleton active paragraph={{rows: 4}}/>
                    </div>
                )
            }
        </div>
    )
};

export default CourseDetail