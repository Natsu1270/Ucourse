import React from "react";
import { useHistory } from 'react-router-dom'
import SearchCourseItem from "./search-course-item.component";


const SearchCourses = ({ courses, myCourses }) => {
    const history = useHistory();
    return (
        <div>
            {
                courses.length ? (
                    <div className="search-result--c">
                        <h1 className="search-result--title">Khóa học <span
                            className="search-result--title__small">  {courses.length} Kết quả </span>
                        </h1>
                        <div className="search-result--courses">
                            {
                                courses.map(course => {
                                    // const isBought = myCourses ? myCourses.some(c => c.id == course.id) : false
                                    return (
                                        <SearchCourseItem
                                            onClick={() => {
                                                history.push(`/courses/${course.slug}`)
                                            }}
                                            course={course}
                                            isBought={course.is_my_course}
                                        />
                                    )
                                })
                            }
                        </div>
                    </div>
                ) : <span />
            }
        </div>)
};


export default SearchCourses