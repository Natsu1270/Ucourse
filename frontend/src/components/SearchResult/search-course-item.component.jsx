import React from 'react'
import {Avatar} from "antd";


const SearchCourseItem = ({img, title, author, level, open_date, rate, slug}) => {
    return (
        <div className="search-course-card" onClick={() => window.location.href=`/courses/${slug}`}>
            <div className="search-course-card__body">
                <div className="search-course-card__body--img">
                    <Avatar shape="square" size={100} src={img} alt=""/>
                </div>
                <div className="search-course-card__body--content">
                    <div className="search-course-card__body--content--title">
                        {title}
                    </div>
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
                </div>


            </div>
        </div>
    )
};

export default SearchCourseItem