import React from 'react'

import './search-card.styles.scss'
import SearchProgramInfo from "./search-program-info.component";
import SearchCourseInfo from "./search-course-info.component";

const SearchCard = ({img,title,isProgram, ...others}) => {
    return (
        <div className="seach-card">
            <div className="search-card__body">
                <div className="search-card__body--img">
                    <img src={img} alt=""/>
                </div>
                <div className="search-card__body--title">
                    {title}
                </div>
                {
                    isProgram ? <SearchProgramInfo {...others} /> : <SearchCourseInfo {...others} />
                }
            </div>
        </div>
    )
};

export default SearchCard