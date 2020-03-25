import React from 'react'
import SearchCard from "../Custom/SearchCard/search-card.component";


const SearchCourse = ({img, title, ...others}) => {

    return (
        <SearchCard img={img} title={title} isProgram={false} {...others} />
    )
};

export default SearchCourse