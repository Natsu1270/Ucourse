import React from 'react'
import { useHistory } from 'react-router-dom'
import { Collapse, Row, Col, Card, Avatar, Space, Tabs, Tag } from 'antd'
import CourseCard from "../Course/course-card.component";
import { renderPrice } from '../../utils/text.utils';

const { Meta } = Card;
const { TabPane } = Tabs;

const ProgramDetailComponents = ({ courses, boughtCourses, completedCourses }) => {

    const history = useHistory()

    const { Panel } = Collapse
    const bgCourses = courses.filter(course => course.level === 'Beginner')
    const mdCourses = courses.filter(course => course.level === 'Intermediate')
    const adCourses = courses.filter(course => course.level === 'Advanced')
    const allLvCourses = courses.filter(course => course.level == 'All level')

    const renderCourses = (courses) => {
        return (<Row gutter={[16, 16]}>
            {
                courses.map(course => {
                    const checkBought = boughtCourses.some(c => c.id == course.id)
                    const checkCompleted = completedCourses.some(c => c.id == course.id)
                    return (
                        <Col key={course.code}>
                            <Card
                                hoverable
                                className="program-card"
                                style={{ width: 350 }}
                                onClick={() => history.push(`/courses/${course.slug}`)}
                            >
                                <Meta
                                    avatar={<Avatar size={48} src={course.icon} />}
                                    title={<Row justify="space-between">
                                        <Col>{course.title}</Col>
                                        <Col>{
                                            checkBought ?
                                                <Col>
                                                    <Tag color="#f50">Đã sở hữu</Tag>

                                                </Col> : null
                                        }</Col>
                                    </Row>}
                                    description={<Row justify="space-between">
                                        <Col>
                                            <p className="text-sub__bigger text-black">Giá: {renderPrice(course.price)}</p>
                                        </Col>


                                        {
                                            checkCompleted ? <Col>
                                                <Tag color="#f50">Đã hoàn thành</Tag>
                                            </Col> : null
                                        }
                                    </Row>}
                                />
                            </Card>

                        </Col>
                    )
                })
            }
        </Row>)
    }

    return (
        <section className="mt-5 page-card" id="cs-course-components">
            <div className="section-course-components__content">
                <h2 className="text--main section-header" id="cs-course-overview">
                    Các khóa học của chương trình
                </h2>
                <Tabs defaultActiveKey="1">

                    {bgCourses.length ? <TabPane tab="Khóa cơ bản" key="1" style={{ fontSize: '2rem' }}>
                        {renderCourses(bgCourses)}
                    </TabPane> : null}
                    {
                        mdCourses.length ? <TabPane key="2" style={{ fontSize: '2rem' }} tab="Khóa trung cấp" >
                            {renderCourses(mdCourses)}
                        </TabPane> : null
                    }
                    {
                        adCourses.length ? <TabPane key="3" style={{ fontSize: '2rem' }} tab="Khóa nâng cao" >
                            {renderCourses(adCourses)}
                        </TabPane> : null
                    }

                    {allLvCourses.length ? <TabPane key="4" style={{ fontSize: '2rem' }} tab="Khóa tổng hợp" >
                        {renderCourses(allLvCourses)}
                    </TabPane> : null}
                </Tabs>
            </div>
        </section>
    )

}

export default ProgramDetailComponents