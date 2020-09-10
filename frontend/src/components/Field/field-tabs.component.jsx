import React, { useState, useEffect } from 'react'
import { Tabs, message, Skeleton, Carousel, Row, Col, Card, Avatar } from 'antd'
import { useHistory, Link } from 'react-router-dom';

import SearchProgramItem from "../SearchResult/search-program-item.component";
import CourseCard from "../Course/course-card.component";

import { getListFieldWithCourse } from '../../api/field.services'

const { Meta } = Card
const { TabPane } = Tabs


const FieldTabs = ({ fields, isLoading }) => {

    const history = useHistory()

    return (
        <section className="section-10 mt-5 mb-5">
            <div className="page-card-2">
                <Skeleton loading={isLoading} active paragraph={{ rows: 5 }}>
                    <h3 className="text--main private-home--title mt-5">
                        Lĩnh vực đa dạng
                </h3>
                    <Tabs>
                        {
                            fields.map(field => (
                                <TabPane tab={field.name} key={field.id}>
                                    <Skeleton loading={isLoading}>
                                        <Row gutter={[16, 16]}>
                                            <Skeleton loading={isLoading}>
                                                {
                                                    field.field_programs.map(program => (
                                                        <Col>
                                                            <Card
                                                                hoverable
                                                                className="program-card"
                                                                style={{ width: 300 }}
                                                                onClick={() => history.push(`/programs/${program.slug}`)}
                                                            >
                                                                <Meta
                                                                    avatar={<Avatar size={48} src={program.icon} />}
                                                                    title={program.name}
                                                                    description={`Số khóa học: ${program.courses_count}`}
                                                                />
                                                            </Card>,
                                                        </Col>
                                                    ))
                                                }
                                            </Skeleton>
                                        </Row>
                                        <Row gutter={[28, 28]}>
                                            {
                                                field.field_courses.map(course => (
                                                    <Col span={6}>
                                                        <CourseCard
                                                            course={course}
                                                            onClick={() => history.push(`/courses/${course.slug}`)} />
                                                    </Col>
                                                ))
                                            }
                                        </Row>
                                    </Skeleton>
                                </TabPane>
                            ))
                        }
                    </Tabs>
                </Skeleton>
            </div>
        </section>
    )
}

export default FieldTabs