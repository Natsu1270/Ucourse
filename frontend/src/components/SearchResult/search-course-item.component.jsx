import React from 'react'
import {Avatar} from "antd";


const SearchCourseItem = ({img, title, author, level, open_date, rate}) => {
    return (
        <div className="search-course-card">
            <div className="search-course-card__body">
                <div className="search-course-card__body--img">
                    <Avatar shape="square" size={100} src={img} alt=""/>
                </div>
                <div className="search-course-card__body--content">
                    <div className="search-course-card__body--content--title">
                        {title}
                    </div>
                    <ul className="search-course-card__body--content--info">
                        <li className="search-course-card__body--content--info__item">by {author} </li>
                        <li className="search-course-card__body--content--info__item">{level}</li>
                        <li className="search-course-card__body--content--info__item">{open_date}</li>
                        <li className="search-course-card__body--content--info__item">{rate}</li>
                    </ul>
                </div>


            </div>
        </div>
    )
};

export default SearchCourseItem