import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import queryString from 'query-string'

import {simpleSearchStart} from '../../redux/Search/search.actions'
import {isSearchingSelector, searchResultSelector} from '../../redux/Search/search.selects'
import {css} from "@emotion/core";
import HashLoader from "react-spinners/HashLoader";

import SearchProgramItem from "../../components/SearchResult/search-program-item.component";
import SearchCourseItem from "../../components/SearchResult/search-course-item.component";


const CourseSearchPage = ({location}) => {
    const dispatch = useDispatch()
    const queryValues = queryString.parse(location.search)
    const query = queryValues.query
    const {isSearching, searchResult} = useSelector(createStructuredSelector({
        isSearching: isSearchingSelector,
        searchResult: searchResultSelector
    }))
    useEffect(() => {
        dispatch(simpleSearchStart(query))
    }, [dispatch, query])


    const override = css`
        display: block;
        margin: 5rem auto;
        border-color: red;
    `;
    return (
        <div className="section section-filter-course mb-5">
            <div className="search-result">
                {!isSearching && searchResult ?
                    (<div className="search-result--p">
                        {
                            searchResult.programs.length ? (
                                <div className="search-result--p">
                                    <h1 className="search-result--title">Programs <span
                                        className="search-result--title__small">  {searchResult.programs.length} results </span>
                                    </h1>
                                    <div className="search-result--programs">

                                        {
                                            searchResult.programs.map(program => {
                                                return (
                                                    <SearchProgramItem
                                                        key={program.code}
                                                        img={program.icon}
                                                        title={program.name}
                                                        num_course={0}
                                                        level={program.level}
                                                    />
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            ) : <span/>
                        }
                    </div>) : <HashLoader
                        css={override}
                        size={40}
                        color={"#01C9F5"}
                        loading={true}
                    />
                }
                {!isSearching && searchResult ?
                    (<div className="search-result--c">
                        {
                            searchResult.courses.length ? (
                                <div className="search-result--c">
                                    <h1 className="search-result--title">Courses <span
                                        className="search-result--title__small">  {searchResult.courses.length} results </span>
                                    </h1>
                                    <div className="search-result--courses">
                                        {
                                            searchResult.courses.map(course => {
                                                return (
                                                    <SearchCourseItem
                                                        key={course.code}
                                                        title={course.title}
                                                        img={course.icon}
                                                        author={"natsu"}
                                                        level={course.level}
                                                        open_date={1}
                                                        rate={1}
                                                    />
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            ) : <span/>
                        }
                    </div>) : <HashLoader
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