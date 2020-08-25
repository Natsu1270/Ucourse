import React, { useState, useEffect } from 'react'
import { getAllMyCoursesAndProgramsAPI } from '../../api/home.services'
import { message, Skeleton, Timeline, Tree, Tabs, Tag } from 'antd'
import { dayDiff, formatDate } from '../../utils/text.utils'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { tokenSelector } from '../../redux/Auth/auth.selects'
import SearchProgramItem from '../../components/SearchResult/search-program-item.component'
import SearchCourseItem from '../../components/SearchResult/search-course-item.component'
import { DownOutlined } from '@ant-design/icons'
import Constants from '../../constants'
const { TabPane } = Tabs

const MyCoursePage = () => {

    const history = useHistory()

    const [loading, setLoading] = useState(false)
    const [courses, setCourses] = useState([])
    const [programs, setPrograms] = useState([])

    const token = useSelector(state => tokenSelector(state))

    const getAllMy = async () => {
        setLoading(true)
        try {
            const { data } = await getAllMyCoursesAndProgramsAPI(token)
            const mCourses = data.courses.sort((a, b) => dayDiff(b, a))
            const mPrograms = data.programs.sort((a, b) => dayDiff(b, a))
            setCourses(mCourses)
            setPrograms(mPrograms)
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
                <h2 className="title--big text-center">Lịch sử đăng ký</h2>
                <Tabs defaultActiveKey="1">
                    <TabPane key="1" tab="Lịch sử">
                        <Timeline>
                            <Timeline.Item>
                                <h3 className="text--main">Chương trình học</h3>
                            </Timeline.Item>
                            <Skeleton loading={loading} active>
                                {programs.map(program => (
                                    <Timeline.Item>
                                        <SearchProgramItem
                                            onClick={() => history.push(`/programs/${program.slug}`)}
                                            key={program.code}
                                            img={program.icon}
                                            title={program.name}
                                            slug={program.slug}
                                            num_course={program.courses_count}
                                        /> -
                                        <Tag color="green">
                                            {formatDate(program.bought_date, Constants.MMM_Do_YYYY)}
                                        </Tag>
                                    </Timeline.Item>
                                ))}
                            </Skeleton>
                        </Timeline>
                        <Timeline>
                            <Timeline.Item>
                                <h3 className="text--main">Khóa học</h3>
                            </Timeline.Item>
                            <Skeleton loading={loading} active>
                                {
                                    courses.map(course => {
                                        return (
                                            <Timeline.Item>
                                                <SearchCourseItem
                                                    course={course}
                                                    onClick={() => { history.push(`/courses/${course.slug}`) }}
                                                /> -
                                                <Tag color="green">
                                                    {formatDate(course.bought_date, Constants.MMM_Do_YYYY)}
                                                </Tag>
                                            </Timeline.Item>
                                        )
                                    })
                                }

                            </Skeleton>
                        </Timeline>
                    </TabPane>
                    <TabPane key="2" tab="Khóa học">
                    </TabPane>
                </Tabs>

            </div>
        </section>
    )
}

export default MyCoursePage