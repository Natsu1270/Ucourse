import React from 'react'
import {Avatar} from "antd";
import CourseSubInfo from "../Course/course-sub-info.component";


const SearchCourseItem = ({img, title, class_count, level, open_date, rate, onClick}) => {
    return (
        <div className="search-course-card" onClick={onClick}>
            <div className="search-course-card__body">
                <div className="search-course-card__body--img">
                    <Avatar shape="square" size={100} src={img} alt=""/>
                </div>
                <div className="search-course-card__body--content">
                    <div className="search-course-card__body--content--title">
                        {title}
                    </div>
                    <CourseSubInfo level={level} class_count={class_count} open_date={open_date} rate={rate} />
                </div>


            </div>
        </div>
    )
};

export default SearchCourseItem