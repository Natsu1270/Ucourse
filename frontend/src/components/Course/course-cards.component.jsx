import React from 'react'
import { useHistory } from 'react-router-dom'
import CourseCard from "./course-card.component";


const CourseCards = ({courses}) => {

    const history = useHistory()

    return (
        <div className="course-cards">
            <h1 className='search-result--title'>Courses </h1>
            <div className="course-card-items dis-flex-between">
                {
                    courses.map(course => <CourseCard
                        onClick={() => history.push(`/courses/${course.slug}`)}
                        course={course} />)
                }
            </div>
        </div>
    )
}

export default CourseCards