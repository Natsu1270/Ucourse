import React from 'react'
import { Card } from 'antd'
import CourseCardSub from "./course-card-sub.component";

const CourseCard = ({ course, onClick }) => {
    // const coverStyle = {
    //     width: '100%',
    //     height: '17rem',
    //     minWidth: '25rem',
    //     // backgroundImage: `url(${course.icon})`,
    //     backgroundRepeat: 'no-repeat',
    //     backgroundPosition: 'center',
    //     backgroundSize: 'cover'
    // };
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
            />

        </div>
    )
}

export default CourseCard