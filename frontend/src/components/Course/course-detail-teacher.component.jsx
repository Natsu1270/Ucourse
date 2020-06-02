import React from 'react'

const CourseDetailTeacher = ({ teachers }) => {

    // const style = {
    //     backgroundImage: `linear-gradient(105deg, rgba(255,255,255,0.95) 0%,
	// 			    rgba(255,255,255,0.95) 60%, rgba(0,0,0, 0.3) 60%),
	// 		        url(${teachers[0] ? teachers[0].avatar : ''})`
    // };
    return (
        <section className="mt-10 section-course-tutors" id="cs-course-tutors">
            <h2 className="text--main section-header" id="cs-course-overview">
                Thông tin giảng viên
            </h2>
            <div className="section-course-tutors--content">
                <div className="section-course-tutors--content__main" >
                    <figure className="section-course-tutors--content__avatar">
                        <img src={teachers[0] ? teachers[0].avatar : ''} alt=""
                            className="section-course-tutors--content__img" />
                    </figure>
                    <div className="section-course-tutors--content__info">
                        <span className="tutor-name mb-2"><a
                            href="#">{teachers[0] ? teachers[0].fullname : ''}</a></span>
                        <span className="tutor-email">{teachers[0] ? teachers[0].email : ''}</span>
                    </div>
                </div>
            </div>

        </section>

    )
};

export default CourseDetailTeacher