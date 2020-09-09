import React, { useState, useEffect } from 'react'
import { getAllMyCoursesAndProgramsAPI } from '../../api/home.services'
import { message, Skeleton, Timeline, Tree, Tabs, Tag, Button, List } from 'antd'
import { dayDiff, formatDate, renderPrice } from '../../utils/text.utils'
import { useSelector } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'
import { tokenSelector } from '../../redux/Auth/auth.selects'
import SearchCourseItem from '../../components/SearchResult/search-course-item.component'
import { DownOutlined } from '@ant-design/icons'
import Constants from '../../constants'
import { getFavoriteCourse } from '../../api/course.services'
const { TabPane } = Tabs

const MyFavoriteCoursePage = () => {

    const history = useHistory()

    const [loading, setLoading] = useState(false)
    const [courses, setCourses] = useState([])
  
    const token = useSelector(state => tokenSelector(state))

    const getAllMy = async () => {
        setLoading(true)
        try {
            const { data } = await getFavoriteCourse(token)
            console.log(data);
            const mCourses = data.courses.sort((a, b) => dayDiff(b.add_date, a.add_date))
            setCourses(mCourses)
        } catch (err) {
            message.error("Có lỗi xảy ra: " + err.message)
        }
        setLoading(false)
    }

    useEffect(() => {
        if (token) {
            getAllMy()
        }
    }, [token])


    return (
        <section className="section-10 page">
            <div className="page-card">
                <h2 className="title--big text-center">Các khóa học yêu thích</h2>

                <Tabs defaultActiveKey="1">
                    <TabPane key="1" tab="Danh sách các khóa học yêu thích">
                        <Timeline>
                            <Timeline.Item>
                                <h3 className="text--main">Khóa học</h3>
                            </Timeline.Item>
                            <Skeleton loading={loading} active>
                                {
                                    courses.map(course => {
                                        return (
                                            <Timeline.Item key={course.is}>
                                                <Tag color="#108ee9" className="mb-4" style={{ fontSize: '1.8rem', padding: '0.4rem' }}>
                                                    {formatDate(course.add_date, Constants.MMM_Do_YYYY)}
                                                </Tag>
                                                <SearchCourseItem
                                                    course={course}
                                                    onClick={() => { history.push(`/courses/${course.slug}`) }}
                                                />
                                                <p className="search-course-card__body--content--title">Giá: {renderPrice(course.price)}</p>
                                            </Timeline.Item>
                                        )
                                    })
                                }

                            </Skeleton>
                        </Timeline>
                    </TabPane>
                </Tabs>

            </div>
        </section>
    )
}

export default MyFavoriteCoursePage