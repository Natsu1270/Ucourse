import React, { useEffect, lazy, Suspense, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams, useHistory } from 'react-router-dom'

import { buyCourseStart, fetchCourseDetailStart } from '../../redux/Course/course.actions'
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

const CourseDetail = () => {
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

    const [ownCourse, setOwnCourse] = useState(false);

    useEffect(() => {

        dispatch(fetchCourseDetailStart({ slug, token }));

        window.scrollTo(0, 0)
    }, []);

    useEffect(() => {
        if (course.id) {
            // const checkBought = async () => {
            //     const result = await checkBoughtCourseAPI({token, course: course.id})
            //     const isOwn = result.status === 200
            //     setOwnCourse(isOwn)
            // }
            // checkBought().then(r => console.log(r))
            dispatch(getCourseHomeShowStart({ token, course_id: course.id }))
            setOwnCourse(course.is_my_course)
        }
    }, [course])

    const handleRegister = () => {
        // if (token) {
        //     dispatch(buyCourseStart({ course: course.id, token }))
        //     // dispatch(registerCourseStart({course_id: course.id, token}))
        //     if (!errorRegister) {
        //         dispatch(toggleRegisterCourseModal())
        //         setOwnCourse(true)
        //     }
        // } else {
        //     message.error('Bạn phải đăng nhập để thực hiện chức năng này!',
        //         1.5,
        //         () => dispatch(showRLModal()))
        // }
        if (token) {
            dispatch(buyCourseStart({ course: course.id, token }))
            // dispatch(registerCourseStart({course_id: course.id, token}))
            if (!errorRegister) {
                // dispatch(toggleRegisterCourseModal())
                // setOwnCourse(true)
            }
        } else {
            message.error('Bạn phải đăng nhập để thực hiện chức năng này!',
                1.5,
                () => dispatch(showRLModal()))
        }

    };

    const courseDetailComp = (
        <div className="course-detail">
            <Breadcrumb separator='>' className="course-detail__breadcrumb">
                <Breadcrumb.Item href="/">
                    <HomeOutlined />
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
                handleRegister={handleRegister}
                isLoading={isFetching}
            />

            <CourseDetailTab
                isOwn={ownCourse} course={course} isProgram={false} handleRegister={handleRegister}
            />

            <CourseDetailOverview
                full_description={courseDetail.full_description}
                open_date={course.open_date}
                end_date={course.end_date}
                level={course.level}
                benefits={courseDetail.benefits}
                skills={courseDetail.skills}
                isLoading={isFetching}
            />

            <CourseDetailComponents loading={isFetching} course={course} />

            <CourseClasses token={token} course={course} isOwn={ownCourse} classes={courseHomeShows}
                isLoading={isFetching} />

            {/*<CourseDetailTeacher />*/}

            {/*<CourseDetailReview course={course}/>*/}

            {/*<CourseDetailRelated course={course}/>*/}

            <AbilityTest />

            <Modal title="Đăng ký khóa học thành công"
                visible={registerCourseModal}
                onCancel={() => dispatch(toggleRegisterCourseModal())}
                onOk={() => dispatch(toggleRegisterCourseModal())}
                footer={null}
                bodyStyle={{ backgroundColor: 'white', height: '35rem', padding: '0' }}
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
            <ErrorBoundary comp={courseDetailComp} errResponse={errorResponse} />
        </div>
    )
};

export default CourseDetail