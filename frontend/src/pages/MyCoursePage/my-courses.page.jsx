import React, { useState, useEffect } from 'react'
import { getTransactionHistory } from '../../api/home.services'
import { message, Skeleton, Timeline, Tabs, Tag, Row, Col, Card, Avatar, Divider } from 'antd'
import { dayDiff, formatDate, renderPrice } from '../../utils/text.utils'
import { useSelector } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'
import { tokenSelector } from '../../redux/Auth/auth.selects'
import Constants from '../../constants'
const { TabPane } = Tabs

const { Meta } = Card

const MyCoursePage = () => {

    const history = useHistory()

    const [loading, setLoading] = useState(false)
    const [courses, setCourses] = useState([])
    const [programs, setPrograms] = useState([])

    const token = useSelector(state => tokenSelector(state))

    const getAllMy = async () => {
        setLoading(true)
        try {
            const { data } = await getTransactionHistory(token)
            setCourses(data.data.courses)
            setPrograms(data.data.programs)
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
                    <TabPane key="1" tab="Lịch sử giao dịch">
                        <Timeline>
                            <Timeline.Item>
                                <h3 className="text--main">Chương trình học</h3>
                            </Timeline.Item>
                            <Skeleton loading={loading} active>
                                {programs.map(item => (
                                    <Timeline.Item>
                                        <Row gutter={32} align="middle">
                                            <Col span={5}>
                                                {/* <Tag color="#4a4e4d" className="mb-4" style={{ fontSize: '1.8rem', padding: '0.4rem', width: '100%' }}>
                                                    
                                                </Tag> */}
                                                {formatDate(item.bought_date, Constants.MMM_Do_YYYY)}
                                                <p className="text--sub__bigger text-black">Giá mua: {renderPrice(item.money)}</p>
                                            </Col>
                                            <Col span={8}>
                                                <Card
                                                    className="box-shadow-light"
                                                    size={480}
                                                    hoverable onClick={() => history.push(`/programs/${item.program.slug}`)} loading={loading}>
                                                    <Meta
                                                        avatar={<Avatar size={48} src={item.program.icon} />}
                                                        title={item.program.name}
                                                        description={<Row><Col>Giá hiện tại: {renderPrice(item.program.price)}</Col></Row>}
                                                    />
                                                </Card>
                                            </Col>

                                        </Row>
                                        <Divider />
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
                                    courses.map(item => {
                                        return (
                                            <Timeline.Item key={item.id}>
                                                <Row gutter={32} align="middle">
                                                    <Col span={5}>
                                                        {/* <Tag color="#4a4e4d" className="mb-4" style={{ fontSize: '1.8rem', padding: '0.4rem', width: '100%' }}>
                                                            {formatDate(item.bought_date, Constants.MMM_Do_YYYY)}
                                                        </Tag> */}
                                                        {formatDate(item.bought_date, Constants.MMM_Do_YYYY)}
                                                        <p className="text--sub__bigger text-black">Giá mua: {renderPrice(item.money)}</p>
                                                        {item.in_program ? <p className="text--sub text-black">Đăng ký từ khóa học</p> : null}
                                                    </Col>
                                                    <Col span={8}>
                                                        <Card
                                                            className="box-shadow-light"
                                                            size={480}
                                                            hoverable onClick={() => history.push(`/courses/${item.course.slug}`)} loading={loading}>
                                                            <Meta
                                                                avatar={<Avatar size={48} src={item.course.icon} />}
                                                                title={item.course.title}
                                                                description={<Row><Col>Giá hiện tại: {renderPrice(item.course.price)}</Col></Row>}
                                                            />
                                                        </Card>
                                                    </Col>

                                                </Row>

                                                <Divider />



                                            </Timeline.Item>
                                        )
                                    })
                                }

                            </Skeleton>
                        </Timeline>
                    </TabPane>
                    {/* <TabPane key="2" tab="Lớp học">
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
                    </TabPane> */}

                </Tabs>

            </div>
        </section>
    )
}

export default MyCoursePage