import React from 'react'
import { useHistory } from 'react-router-dom'
import CourseCard from "./course-card.component";


const CourseCards = ({courses}) => {

    const history = useHistory()

    return (
        <div className="course-cards">
            <div className="course-cards__items">
                {
                    courses.map(course => <CourseCard key={course.code}
                        onClick={() => history.push(`/courses/${course.slug}`)}
                        course={course} />)
                }
            </div>
        </div>
    )
}

export default CourseCards