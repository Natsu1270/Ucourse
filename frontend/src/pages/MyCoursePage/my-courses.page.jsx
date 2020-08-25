import React, { useState, useEffect } from 'react'
import { getAllMyCoursesAndProgramsAPI } from '../../api/home.services'
import { message, Skeleton, Timeline, Tree, Tabs, Tag, Button, List } from 'antd'
import { dayDiff, formatDate } from '../../utils/text.utils'
import { useSelector } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'
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
    const [courseHome, setCourseHome] = useState([])

    const token = useSelector(state => tokenSelector(state))

    const getAllMy = async () => {
        setLoading(true)
        try {
            const { data } = await getAllMyCoursesAndProgramsAPI(token)
            const mCourses = data.courses.sort((a, b) => dayDiff(b.bought_date, a.bought_date))
            const mPrograms = data.programs.sort((a, b) => dayDiff(b.bought_date, a.bought_date))
            setCourseHome(data.courseHomes)
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

    const data = [
        {
            title: 'Ant Design Title 1',
        },
        {
            title: 'Ant Design Title 2',
        },
        {
            title: 'Ant Design Title 3',
        },
        {
            title: 'Ant Design Title 4',
        },
    ];

    return (
        <section className="section-10 page">
            <div className="page-card">
                <h2 className="title--big text-center">Lớp học của tôi</h2>

                <Tabs defaultActiveKey="1">
                    <TabPane key="1" tab="Lịch sử đăng ký">
                        <Timeline>
                            <Timeline.Item>
                                <h3 className="text--main">Chương trình học</h3>
                            </Timeline.Item>
                            <Skeleton loading={loading} active>
                                {programs.map(program => (
                                    <Timeline.Item>
                                        <Tag color="#108ee9" className="mb-4" style={{ fontSize: '1.8rem', padding: '0.4rem' }}>
                                            {formatDate(program.bought_date, Constants.MMM_Do_YYYY)}
                                        </Tag>
                                        <SearchProgramItem
                                            onClick={() => history.push(`/programs/${program.slug}`)}
                                            key={program.code}
                                            img={program.icon}
                                            title={program.name}
                                            slug={program.slug}
                                            num_course={program.courses_count}
                                        />

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
                                                <Tag color="#108ee9" className="mb-4" style={{ fontSize: '1.8rem', padding: '0.4rem' }}>
                                                    {formatDate(course.bought_date, Constants.MMM_Do_YYYY)}
                                                </Tag>
                                                <SearchCourseItem
                                                    course={course}
                                                    onClick={() => { history.push(`/courses/${course.slug}`) }}
                                                />
                                            </Timeline.Item>
                                        )
                                    })
                                }

                            </Skeleton>
                        </Timeline>
                    </TabPane>
                    <TabPane key="2" tab="Lớp học">
                        <List
                            bordered
                            loading={loading}
                            itemLayout="horizontal"
                            dataSource={courseHome}
                            style={{}}
                            renderItem={item => (
                                <List.Item
                                    actions={[<Button type="primary" key="1" onClick={() => window.open(`/learn/${item.slug}`, '_self')}>Truy cập</Button>]}
                                >
                                    <List.Item.Meta
                                        title={<Link style={{ fontSize: '2rem', fontWeight: '500' }} to={`/learn/${item.slug}`}>{item.full_name}</Link>}
                                        description={`Giảng viên: ${item.teacher}`}
                                    />

                                </List.Item>
                            )}
                        />
                    </TabPane>
                </Tabs>

            </div>
        </section>
    )
}

export default MyCoursePage