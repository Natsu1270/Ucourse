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
                    <p className="course-description text--sub text--sub__bigger mt-4">
                        {isLoading ? <Skeleton active />:courseDetail.short_description}
                    </p>
                    <div className="d-flex enroll-area mt-5">
                        <Button to="#" onClick={own ? gotoCourseLearn : handleRegister} className="register-btn cs-btn--animated">
                            {isRegistering ? Constants.SPIN_ICON : own ? 'Tiếp tục học' : 'Đăng ký học'}
                        </Button>
                        <div className="course-info">
                            <p className="text-white text--sub">
                                Khoá học bắt đầu vào : {formatDate(course.open_date, Constants.MMM_Do_YYYY)}
                            </p>
                            <p className="text-white text--sub">
                                Giảng viên : {teachers[0] ? teachers[0].fullname : ''}
                            </p>
                            <p className="text-white text--sub">
                                Điểm đánh giá: {course.rate_score}
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
};

export default CourseDetailBanner