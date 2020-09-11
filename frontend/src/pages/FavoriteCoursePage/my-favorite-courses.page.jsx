import React, { useState, useEffect } from 'react'
import { message, Skeleton, Timeline, Tag, Card, Avatar } from 'antd'
import { formatDate, renderPrice } from '../../utils/text.utils'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { tokenSelector } from '../../redux/Auth/auth.selects'
import Constants from '../../constants'
import { getFavoriteCourse } from '../../api/course.services'

const { Meta } = Card

const MyFavoriteCoursePage = () => {

    const history = useHistory()

    const [loading, setLoading] = useState(false)
    const [courses, setCourses] = useState([])

    const token = useSelector(state => tokenSelector(state))

    const getFavoriteCourses = async () => {
        setLoading(true)
        try {
            const { data } = await getFavoriteCourse(token)
            setCourses(data.data)
        } catch (err) {
            message.error("Có lỗi xảy ra: " + err.message)
        }
        setLoading(false)
    }

    useEffect(() => {
        if (token) {
            getFavoriteCourses()
        }
    }, [token])


    return (
        <section className="section-10 page">
            <div className="page-card">
                <h2 className="title--big text-center">Các khóa học yêu thích</h2>

                <Timeline>
                    <Skeleton loading={loading} active>
                        {
                            courses.map(item => {
                                return (
                                    <Timeline.Item key={item.id}>
                                        <Tag color="#108ee9" className="mb-4" style={{ fontSize: '1.8rem', padding: '0.4rem' }}>
                                            {formatDate(item.add_date, Constants.MMM_Do_YYYY)}
                                        </Tag>

                                        <Card
                                            hoverable
                                            className="program-card"
                                            style={{ width: 300 }}
                                            onClick={() => { history.push(`/courses/${item.course.slug}`) }}
                                        >
                                            <Meta
                                                avatar={<Avatar size={48} src={item.course.icon} />}
                                                title={item.course.title}
                                                description={renderPrice(item.course.price)}
                                            />
                                        </Card>
                                        {/* <p className="search-course-card__body--content--title">Giá: {renderPrice(course.price)}</p> */}
                                    </Timeline.Item>
                                )
                            })
                        }

                    </Skeleton>
                </Timeline>

            </div>
        </section>
    )
}

export default MyFavoriteCoursePage