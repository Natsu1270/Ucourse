import React from 'react'
import {useSelector} from "react-redux";
import {isSearchingSelector} from "../../redux/Search/search.selects";
import Constants from "../../constants";
import HashLoader from "react-spinners/HashLoader";

const SearchContainer = ({component: Component, ...others}) => {
    const isSearching = useSelector(state => isSearchingSelector(state))
    if (isSearching) {
        return <HashLoader
            css={Constants.SPINNER_STYLE}
            size={40}
            color={"#01C9F5"}
            loading={true}
        />
    } else {
        return <Component {...others}/>
    }
}

export default SearchContainer