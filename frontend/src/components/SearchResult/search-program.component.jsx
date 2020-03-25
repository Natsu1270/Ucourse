import React from 'react'
import SearchCard from "../Custom/SearchCard/search-card.component";


const SearchProgram = ({img, title, ...others}) => {

    return (
        <SearchCard img={img} title={title} isProgram={true} {...others} />
    )
};

export default SearchProgram