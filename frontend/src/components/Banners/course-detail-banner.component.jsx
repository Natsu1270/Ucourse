import React from 'react'
import {Link} from "react-router-dom";

const CourseDetailBanner = ({course}) => {

    return (
        <section className="section-10 section-course-banner" id="cs-course-banner">
            <div className="course-banner d-flex justify-content-start">
                <div className="course-detail">
                    <h1 className="text--main text--main__bigger text-white">
                        {course.course_detail.verbose_name}
                    </h1>
                    <p className="course-description text--sub text--sub__bigger mt-4">
                        {course.course_detail.short_description}
                    </p>
                    <div className="d-flex enroll-area mt-5">
                        <Link to="" className="cs-btn cs-btn--animated cs-btn--banner cs-btn--white">
                            Đăng ký học
                        </Link>
                        <div className="course-info">
                            <p className="text-white text--sub">
                                Khoá học bắt đầu vào : {course.course_detail.open_date}
                            </p>
                            <p className="text-white text--sub">
                                Giảng viên : {course.teacher[0].fullname}
                            </p>
                            <p className="text-white text--sub">
                                Điểm đánh giá: {course.rate_score}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="course-avatar">
                    <img src={course.icon} className="img-thumbnail rounded" alt=""/>
                </div>
            </div>
        </section>
    )
};

export default CourseDetailBanner