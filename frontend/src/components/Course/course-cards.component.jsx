import { Col, Row } from 'antd';
import React from 'react'
import { useHistory } from 'react-router-dom'
import CourseCard from "./course-card.component";


const CourseCards = ({ courses }) => {

    const history = useHistory()

    return (
        <div className="course-cards">
            <Row gutter={[32, 32]}>
                {
                    courses.map(course => <Col key={course.id} span={6}>
                        <CourseCard
                            onClick={() => history.push(`/courses/${course.slug}`)}
                            course={course} />
                    </Col>)
                }
            </Row>
        </div>
    )
}

export default CourseCards