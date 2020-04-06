import React from 'react'

const CourseSubInfo = ({author, level, open_date, rate}) => {

    return (
        <ul className="search-course-card__body--content--info">
            <li className="search-course-card__body--content--info__item item-author">
                <span className="text--const">
                    by {author}
                </span>
            </li>
            <li className="search-course-card__body--content--info__item">
                <span className="text--const">
                    {level}
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