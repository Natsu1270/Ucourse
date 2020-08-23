import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import queryString from 'query-string'
import { Skeleton, Form, Input, Row, Col, Button, Switch, DatePicker, Space, message } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import moment from 'moment'
import { simpleSearchStart } from '../../redux/Search/search.actions'
import { advancedSearchAPI } from '../../api/search.services'
import {
    isSearchingSelector,
    searchCoursesSelector,
    searchProgramsSelector,
    searchFieldSelector,
    searchLevelSelector,
    searchRatingSelector,
    searchTeacherSelector,
} from '../../redux/Search/search.selects'
import { Empty, Tabs } from 'antd'
import SearchCourses from "../../components/SearchResult/search-courses.component";
import SearchPrograms from "../../components/SearchResult/search-programs.component";
import SearchInput from "../../components/SearchInput/search-input.component";
import SearchContainer from "../../components/Common/search-container.component";
import SearchFilter from "../../components/SearchResult/search-filter.component";
import { slugifyString } from "../../utils/text.utils";
import { disabledDate } from '../../utils/date.utils'
import Constants from '../../constants';

const { RangePicker } = DatePicker
const { Search } = Input


const CourseSearchPage = ({ location }) => {
    const dispatch = useDispatch();

    const queryValues = queryString.parse(location.search);
    const query = queryValues.query;
    const [keyword, setKeyword] = useState(null)
    const [loading, setLoading] = useState(false)

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
    const [form] = Form.useForm()

    useEffect(() => {
        if (!isSearching) {
            setCourses(searchCourses);
            setPrograms(searchPrograms)
        }
    }, [isSearching]);

    useEffect(() => {
        let filterCourses = [];
        let filterPrograms = [];
        if (filterField && filterField.length) {
            filterCourses = searchCourses.filter(course => filterField.includes(slugifyString(course.field)));
            filterPrograms = searchPrograms.filter(program => filterField.includes(slugifyString(program.field)))
        } else {
            filterCourses = searchCourses;
            filterPrograms = searchPrograms
        }
        if (filterLevel && filterLevel.length) {
            filterCourses = filterCourses.filter(course => filterLevel.includes(course.level))
        }
        if (filterTeacher && filterTeacher.length) {
            filterCourses = searchCourses.filter(course =>
                course.course_teachers.some(
                    teacher => filterTeacher.includes(teacher)
                )
            )
        }
        setCourses(filterCourses);
        setPrograms(filterPrograms)
    }, [filterField]);

    useEffect(() => {
        let filterCourses = [];
        if (filterLevel && filterLevel.length) {
            filterCourses = searchCourses.filter(course => filterLevel.includes(course.level))
        } else {
            filterCourses = searchCourses
        }
        if (filterField && filterField.length) {
            filterCourses = filterCourses.filter(course => filterField.includes(course.field))
        }
        if (filterTeacher && filterTeacher.length) {
            filterCourses = searchCourses.filter(course =>
                course.course_teachers.some(
                    teacher => filterTeacher.includes(teacher)
                )
            )
        }
        setCourses(filterCourses)
    }, [filterLevel]);

    useEffect(() => {
        let filterCourses = [];

        if (filterTeacher && filterTeacher.length) {
            filterCourses = searchCourses.filter(course =>
                course.course_teachers.some(
                    teacher => filterTeacher.includes(teacher)
                )
            )
        } else {
            filterCourses = searchCourses
        }
        if (filterLevel && filterLevel.length) {
            filterCourses = filterCourses.filter(course => filterLevel.includes(course.level))
        }
        if (filterField && filterField.length) {
            filterCourses = filterCourses.filter(course => filterField.includes(course.field))
        }
        setCourses(filterCourses)
    }, [filterTeacher]);

    const { TabPane } = Tabs;

    const advancedSearch = async (values) => {
        setLoading(true)
        const { keyword, canRegister, date } = values

        try {
            const { data } = await advancedSearchAPI({
                keyword, canRegister,
                fromDate: date ? date[0].format(Constants.YYYY_MM_DD) : null,
                toDate: date ? date[1].format(Constants.YYYY_MM_DD) : null
            })
            setCourses(data.courses)
            setPrograms(data.programs)
        } catch (err) {
            message.error("Có lỗi xảy ra: " + err.message)
        }
        setLoading(false)
    }

    return (
        <div className="section-5 section-filter-course dis-flex-start-start mb-5">
            <div className="search-filter">
                <h3 className="mb-5">Lọc kết quả</h3>
                <SearchFilter />
            </div>
            <div className="search-result">
                <span className='text--main'>Kết quả tìm kiếm cho từ khóa: </span>
                <span className='search-result__title--query'><q>{query}</q></span>
                <div className="search-result__title">
                    <span className="text--main">Tìm kiếm nâng cao</span>
                    <Form onFinish={advancedSearch} form={form}>
                        <Row gutter={16} justify="center">
                            <Col span={24}>
                                <Form.Item name="keyword">
                                    <Search
                                        loading={loading}
                                        style={{ width: "80%" }}
                                        placeholder="Nhập từ khóa tìm kiếm"
                                        enterButton={<Space><SearchOutlined /> Tìm</Space>}
                                        size="large"
                                        onSearch={value => form.submit()}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16} justify="center">
                            <Col span={6}>
                                <Form.Item name="canRegister" label="Có lớp đang mở đăng ký" valuePropName="checked">
                                    <Switch />
                                </Form.Item>
                            </Col>
                            <Col>
                                <Form.Item name="date" label="Có lớp dự kiến mở vào">
                                    <RangePicker
                                        disabledDate={disabledDate}
                                        format="DD-MM-YYYY"
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </div>

                <Tabs defaultActiveKey="1">
                    <TabPane tab="Tất cả" key="1">
                        <Skeleton loading={isSearching || loading} active paragraph={{ rows: 4 }}>
                            {
                                !programs.length && !courses.length ? <Empty className="white-bg p-5" /> :
                                    <div>
                                        <SearchContainer component={SearchPrograms} programs={programs} />
                                        <SearchContainer component={SearchCourses} courses={courses} />
                                    </div>
                            }
                        </Skeleton>
                    </TabPane>

                    <TabPane tab="Chương trình học" key="2">
                        {
                            !programs.length ? <Empty className="white-bg p-5" /> :
                                <SearchContainer component={SearchPrograms} programs={programs} />
                        }
                    </TabPane>

                    <TabPane tab="Khoá học" key="3">
                        {
                            !courses.length ? <Empty className="white-bg p-5" /> :
                                <SearchContainer component={SearchCourses} courses={courses} />
                        }
                    </TabPane>
                </Tabs>
            </div>
        </div>
    )
};

export default CourseSearchPage