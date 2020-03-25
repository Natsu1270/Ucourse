import React from 'react'

const SearchProgramInfo = ({ncourse, level}) => {
    return (
        <div className="search-program-info">
            <span className="search-program-info--item">{ncourse} Courses</span>
            <span className="search-program-info--item">{level} Level</span>
        </div>
    )
};

export default SearchProgramInfo