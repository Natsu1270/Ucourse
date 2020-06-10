import React from 'react'
import { useHistory } from "react-router-dom";
import { Button, Skeleton } from "antd";
import { formatDate } from "../../utils/text.utils";
import Constants from "../../constants";
import {useSelector} from "react-redux";
import {isLoadingSelector} from "../../redux/CourseHome/course-home.selects";

const CourseDetailBanner = ({ course, courseDetail, teachers, own, handleRegister, isLoading }) => {

    const history = useHistory();
    const gotoCourseLearn = () => {
        history.push(`${Constants.COURSE_HOME_LINK}/${course.slug}`)
    }
    const isRegistering = useSelector(state => isLoadingSelector(state));
    const s = {
        background: `linear-gradient(
          rgba(0, 0, 0, 0.2), 
          rgba(0, 0, 0, 0.8)
        ),
        url(${course.icon}) no-repeat center center / cover`,

    };
    return (
        <section style={s} className="pd-5 section-course-banner" id="cs-course-banner" >
            <div className="course-banner d-flex justify-content-start" >
                <div className="course-detail">
                    <h4 className="text--sub__smaller text-white">
                        Khóa học
                    </h4>
                    <h1 className="text--main text--main__bigger text-white">
                        {isLoading ? Constants.SPIN_ICON : courseDetail.verbose_name}
                    </h1>
                    <Skeleton active loading={isLoading}>
                        <p className="course-description text--sub text--sub__bigger mt-4">
                            {courseDetail.short_description}
                        </p>
                    </Skeleton>

                    <div className="d-flex enroll-area mt-5">
                        <Button to="#" onClick={own ? gotoCourseLearn : handleRegister} className="register-btn cs-btn--animated">
                            {isRegistering ? Constants.SPIN_ICON : own ? 'Đã đăng ký' : 'Đăng ký học'}
                        </Button>
                        <div className="course-info">
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
};

export default CourseDetailBanner