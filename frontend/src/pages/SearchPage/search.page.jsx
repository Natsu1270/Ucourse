import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import queryString from 'query-string'

import {simpleSearchStart} from '../../redux/Search/search.actions'
import {isSearchingSelector, searchResultSelector} from '../../redux/Search/search.selects'
import {css} from "@emotion/core";
import HashLoader from "react-spinners/HashLoader";

import SearchCourses from "../../components/SearchResult/search-courses.component";
import SearchPrograms from "../../components/SearchResult/search-programs.component";
import SearchInput from "../../components/SearchInput/search-input.component";


const CourseSearchPage = ({location}) => {
    const dispatch = useDispatch();
    const queryValues = queryString.parse(location.search);
    const query = queryValues.query;
    const {isSearching, searchResult} = useSelector(createStructuredSelector({
        isSearching: isSearchingSelector,
        searchResult: searchResultSelector
    }));
    useEffect(() => {
        dispatch(simpleSearchStart(query))
    }, [dispatch, query]);


    const override = css`
        display: block;
        margin: 5rem auto;
        border-color: red;
    `;
    return (
        <div className="section section-filter-course mb-5">
            <div className="search-filter">

            </div>
            <div className="search-result">
                <div className="search-result--search-bar">
                    <SearchInput width={'100%'} value={query} />
                </div>
                {!isSearching && searchResult ?
                    <SearchPrograms programs={searchResult.programs} /> : <HashLoader
                        css={override}
                        size={40}
                        color={"#01C9F5"}
                        loading={true}
                    />
                }
                {!isSearching && searchResult ?
                    <SearchCourses courses={searchResult.courses} /> : <HashLoader
                        css={override}
                        size={40}
                        color={"#01C9F5"}
                        loading={true}
                    />
                }
            </div>

        </div>
    )
}

export default CourseSearchPage