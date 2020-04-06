import React from 'react'

const CourseCardSub = ({teacher,level, open_date }) => {

    return (
        <div className="course-card-sub">
            <div className="course-card-sub__teacher">
                by {teacher}
            </div>
            <div className="course-card-sub__others dis-flex-start">
                <span className="course-card-sub__others--item">
                    {level}
                </span>
                <span className="course-card-sub__others--item">
                    {open_date}
                </span>
            </div>
        </div>
    )
}

export default CourseCardSub