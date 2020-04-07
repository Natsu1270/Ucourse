import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import queryString from 'query-string'

import {simpleSearchStart} from '../../redux/Search/search.actions'
import {
    isSearchingSelector,
    searchCoursesSelector,
    searchProgramsSelector,
    searchFieldSelector,
    searchLevelSelector,
    searchRatingSelector,
    searchTeacherSelector,
} from '../../redux/Search/search.selects'
import {Tabs} from 'antd'
import SearchCourses from "../../components/SearchResult/search-courses.component";
import SearchPrograms from "../../components/SearchResult/search-programs.component";
import SearchInput from "../../components/SearchInput/search-input.component";
import SearchContainer from "../../components/Common/search-container.component";
import SearchFilter from "../../components/SearchResult/search-filter.component";
import {slugifyString} from "../../utils/text.utils";


const CourseSearchPage = ({location}) => {
    const dispatch = useDispatch();

    const queryValues = queryString.parse(location.search);
    const query = queryValues.query;

    useEffect(() => {
        dispatch(simpleSearchStart(query))
    }, [query]);

    const {
        searchCourses, searchPrograms,
        filterField, filterLevel,
        filterRating, filterTeacher,
        isSearching,
    } = useSelector(createStructuredSelector({
        searchCourses: searchCoursesSelector,
        searchPrograms: searchProgramsSelector,
        isSearching: isSearchingSelector,
        filterField: searchFieldSelector,
        filterLevel: searchLevelSelector,
        filterRating: searchRatingSelector,
        filterTeacher: searchTeacherSelector,
    }));

    const [courses, setCourses] = useState(searchCourses)
    const [programs, setPrograms] = useState(searchPrograms)

    useEffect(() => {
        if (!isSearching) {
            setCourses(searchCourses)
            setPrograms(searchPrograms)
        }
        if (filterField && filterField.length) {
            setCourses(courses.filter(course => filterField.includes(slugifyString(course.field))))
            setPrograms(programs.filter(program => filterField.includes(slugifyString(program.field))))
        }
        if (filterLevel && filterLevel.length) {
            setCourses(courses.filter(course => filterLevel.includes(course.level)))
        }
        if (filterTeacher && filterTeacher.length) {
            setCourses(courses.filter(course => filterTeacher.includes(course.teacher[0].email)))
        }
    }, [isSearching, filterField, filterLevel, filterTeacher])


    const {TabPane} = Tabs


    return (
        <div className="section-5 section-filter-course dis-flex-start mb-5">
            <div className="search-filter">
                <h3 className="mb-5 text-center">Lọc kết quả</h3>
                <SearchFilter/>
            </div>
            <div className="search-result">
                <div className="search-result--search-bar">

                    <SearchInput width={'100%'} value={query}/>
                </div>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="Tất cả" key="1">
                        <SearchContainer component={SearchPrograms} programs={programs}/>
                        <SearchContainer component={SearchCourses} courses={courses}/>
                    </TabPane>

                    <TabPane tab="Chương trình học" key="2">
                        <SearchContainer component={SearchPrograms} programs={programs}/>
                    </TabPane>

                    <TabPane tab="Khoá học" key="3">
                        <SearchContainer component={SearchCourses} courses={courses}/>
                    </TabPane>

                </Tabs>

            </div>

        </div>
    )
}

export default CourseSearchPage