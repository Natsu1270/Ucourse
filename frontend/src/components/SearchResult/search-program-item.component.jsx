import React from 'react'
import { Avatar, Tag } from "antd";


const SearchProgramItem = ({ img, title, num_course, onClick, isBought }) => {
    return (
        <div className="search-program-card" onClick={onClick}>
            <div className="search-program-card__body">
                <Avatar size={64} src={img} />
                <div className="search-program-card__body--content">
                    <div className="search-program-card__body--content--title">
                        {title}
                    </div>
                    <ul className="search-program-card__body--content--info">
                        <li className="search-program-card__body--content--info__item">
                            <span className="text--variable">{num_course}</span> <span className="text--const">Courses</span>
                        </li>
                        <li className="search-program-card__body--content--info__item">
                            {
                                isBought ? <Tag color="#f50">Đã sở hữu</Tag> : null
                            }
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    )
};

export default SearchProgramItem