import React from 'react'
import { Avatar } from "antd";
import CourseSubInfo from "../Course/course-sub-info.component";



const SearchCourseItem = ({ course, onClick, isBought }) => {
    return (
        <div className="search-course-card" onClick={onClick}>
            <div className="search-course-card__body">
                <div className="search-course-card__body--img">
                    <Avatar shape="square" size={100} src={course.icon} alt="" />
                </div>
                <div className="search-course-card__body--content">
                    <div className="search-course-card__body--content--title">
                        {course.title}
                    </div>
                    <CourseSubInfo
                        level={course.level}
                        class_count={course.course_home_count}
                        viewCount={course.view_count}
                        isBought={isBought}
                    />
                </div>
            </div>
        </div>
    )
};

export default SearchCourseItem