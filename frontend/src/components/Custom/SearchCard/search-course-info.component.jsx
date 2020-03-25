import React from 'react'

const SearchCourseInfo = ({author, level, open_date, rate}) => {
    return (
        <div className="search-program-info">
            <span className="search-program-info--item">by {author} </span>
            <span className="search-program-info--item">{level}</span>
            <span className="search-program-info--item">{open_date}</span>
            <span className="search-program-info--item">{rate}</span>

        </div>
    )
};

export default SearchCourseInfo