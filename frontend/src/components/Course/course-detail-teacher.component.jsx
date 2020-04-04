import React from 'react'

const CourseDetailTeacher = ({course}) => {

    return (
        <section className="mt-10 section-course-tutors" id="cs-course-tutors">
            <h2 className="text--main section-course-tutors__header" id="cs-course-overview">
                Instructors
            </h2>
            <div className="section-course-tutors--content">
                <div className="section-course-tutors--content__main">
                    <figure className="section-course-tutors--content__avatar">
                        <img src={course.teacher[0].avatar} alt=""
                             className="section-course-tutors--content__img"/>
                    </figure>
                    <div className="section-course-tutors--content__info">
                                    <span className="tutor-name mb-2"><a
                                        href="#">{course.teacher[0].fullname}</a></span>
                        <span className="tutor-email">{course.teacher[0].email}</span>
                    </div>
                </div>
            </div>

        </section>

    )
};

export default CourseDetailTeacher