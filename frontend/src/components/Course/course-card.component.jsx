import React from 'react'

const CourseCard = ({course}) => {

    return (
        <div className="course-card">
            <div className="course-card--side course-card--side__front">
                <div className="card-avatar">
                    <img src={course.icon} alt=""/>
                </div>
                <div className="card-body">
                    <div className="card-title">
                        <a href="" className="text--sub__bigger">
                            {course.title}
                        </a>
                    </div>
                    <hr/>
                    <p className="text--sub">{course.level}</p>
                    <div className="row course-rating-score">
                        <div className="col-lg-12">
                            <div className="star-rating">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseCard