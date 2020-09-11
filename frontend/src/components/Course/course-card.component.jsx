import React from 'react'
import { Card } from 'antd'
import CourseCardSub from "./course-card-sub.component";

const CourseCard = ({ course, onClick, isBought }) => {
    
    const { Meta } = Card;
    return (
        <div
            className="course-card"
            onClick={onClick}
            style={{ borderRadius: '1.3rem', overflow: 'hidden' }}
        >
            <img src={course.icon} alt="course-icon"></img>

            <CourseCardSub
                title={course.title}
                homeNum={course.course_home_count}
                level={course.level}
                open_date={course.open_date}
                isBought={isBought}
            />

        </div>
    )
}

export default CourseCard