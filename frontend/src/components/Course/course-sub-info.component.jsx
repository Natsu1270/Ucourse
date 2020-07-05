import React from 'react'
import Constants from "../../constants";

const CourseSubInfo = ({class_count, level, open_date, rate}) => {


    return (
        <ul className="search-course-card__body--content--info">
            <li className="search-course-card__body--content--info__item item-author">
                <span className="text--const">
                    Số lượng: {class_count} lớp
                </span>
            </li>
            <li className="search-course-card__body--content--info__item">
                <span className="text--const">
                    Cấp độ: {Constants.COURSE_LEVEL_TYPES[level]}
                </span>
            </li>
            <li className="search-course-card__body--content--info__item">
                <span className="text--const">
                    {open_date}
                </span>
            </li>
            <li className="search-course-card__body--content--info__item">
                <span className="text--const">
                    {rate}
                </span>
            </li>
        </ul>
    )
}

export default CourseSubInfo