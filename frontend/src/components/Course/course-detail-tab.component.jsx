import React from 'react'

const CourseDetailTab = ({course}) => {
    return (
        <section className="section-10 section-course-tab" id="cs-course-tab">
            <ul className="course-tab">
                <li className="course-tab__address" id="tab-overview">
                    <a href="#cs-course-overview"
                       className="course-tab__address--link">Overview</a>
                </li>
                <li className="course-tab__address" id="tab-components">
                    <a href="#cs-course-components"
                       className="course-tab__address--link">Components</a>
                </li>
                <li className="course-tab__address" id="tab-tutors">
                    <a href="#cs-course-tutors"
                       className="course-tab__address--link">Instructors</a>
                </li>
                <li className="course-tab__address" id="tab-review">
                    <a href="#cs-course-review"
                       className="course-tab__address--link">Reviews</a>
                </li>
                <li className="course-tab__address" id="tab-related">
                    <a href="#cs-course-related"
                       className="course-tab__address--link">Related
                        courses</a></li>
                <li className="course-tab__btn">
                    <a href="#" className="cs-btn cs-btn--animated">Đăng ký ngay</a>
                    <a href="#"
                       className="cs-btn cs-btn--animated"> Test năng lực</a>
                </li>
            </ul>
        </section>
    )
};

export default CourseDetailTab