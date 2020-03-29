import React from 'react'
import {Avatar} from "antd";


const SearchProgramItem = ({img, title, num_course, level}) => {
    return (
        <div className="search-program-card">
            <div className="search-program-card__body">
                <Avatar size={64} src={img} />
                <div className="search-program-card__body--content">
                    <div className="search-program-card__body--content--title">
                        {title}
                    </div>
                    <ul className="search-program-card__body--content--info">
                        <li className="search-program-card__body--content--info__item">{num_course} Courses</li>
                        <li className="search-program-card__body--content--info__item">{level} Level</li>
                    </ul>
                </div>

            </div>
        </div>
    )
};

export default SearchProgramItem