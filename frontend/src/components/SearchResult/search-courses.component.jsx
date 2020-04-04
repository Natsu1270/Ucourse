import React from "react";
import {useHistory} from 'react-router-dom'
import SearchCourseItem from "./search-course-item.component";


const SearchCourses = ({courses}) => {
    const history = useHistory();
    return (
        <div className="search-result--c">
            {
                courses.length ? (
                    <div className="search-result--c">
                        <h1 className="search-result--title">Courses <span
                            className="search-result--title__small">  {courses.length} results </span>
                        </h1>
                        <div className="search-result--courses">
                            {
                                courses.map(course => {
                                    return (
                                        <SearchCourseItem
                                            key={course.code}
                                            title={course.title}
                                            img={course.icon}
                                            slug={course.slug}
                                            author={course.teacher[0].fullname}
                                            level={course.level}
                                            open_date={1}
                                            rate={1}
                                        />
                                    )
                                })
                            }
                        </div>
                    </div>
                ) : <span/>
            }
        </div>)
};


export default SearchCourses