import React from 'react'
import { Card } from 'antd'
import CourseCardSub from "./course-card-sub.component";

const CourseCard = ({course, onClick}) => {
    const coverStyle = {
        width: '100%',
        height: '14rem',
        backgroundImage : `url(${course.icon})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover'
    }
    const {Meta} = Card
    return (
        <div className="course-card mb-5">
            <Card
                onClick={onClick}
                hoverable
                style={{width: 240}}
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