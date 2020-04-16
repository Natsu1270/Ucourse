import React from 'react'
import {useSelector} from "react-redux";
import {isSearchingSelector} from "../../redux/Search/search.selects";
import Constants from "../../constants";
import HashLoader from "react-spinners/HashLoader";
import {Skeleton} from "antd";

const SearchContainer = ({component: Component, ...others}) => {
    const isSearching = useSelector(state => isSearchingSelector(state))
    if (isSearching) {
        return <Skeleton active avatar paragraph={{rows: 4}} />
    } else {
        return <Component {...others}/>
    }
};

export default SearchContainer