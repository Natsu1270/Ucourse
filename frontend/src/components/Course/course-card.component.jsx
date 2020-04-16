import React from 'react'
import { Card } from 'antd'
import CourseCardSub from "./course-card-sub.component";

const CourseCard = ({course, onClick}) => {
    const coverStyle = {
        width: '100%',
        height: '17rem',
        backgroundImage : `url(${course.icon})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover'
    };
    const {Meta} = Card;
    return (
        <div className="mb-5">
            <Card
                className="course-card"
                onClick={onClick}
                hoverable
                style={{width: 280, borderRadius:'1.3rem', overflow:'hidden'}}
                cover={<div style={coverStyle} />}
            >
                <Meta title={course.title} description={
                    <CourseCardSub
                        teacher={course.teacher[0].fullname}
                        level={course.level}
                        open_date={course.open_date}
                    /> }
                />
            </Card>
        </div>
    )
}

export default CourseCard