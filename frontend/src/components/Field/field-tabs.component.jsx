import React, { useState, useEffect } from 'react'
import { Tabs, message, Skeleton, Carousel, Row, Col } from 'antd'
import { useHistory, Link } from 'react-router-dom';

import SearchProgramItem from "../SearchResult/search-program-item.component";
import CourseCard from "../Course/course-card.component";

import { getListFieldWithCourse } from '../../api/field.services'


const { TabPane } = Tabs


const FieldTabs = ({ fields, isLoading }) => {

    const history = useHistory()

    return (
        <section className="section-10 mt-5 mb-5">
            <h3 className="text--main private-home--title mt-5">
                Lĩnh vực đa dạng
            </h3>
            <Tabs>
                {
                    fields.map(field => (
                        <TabPane tab={field.name} key={field.id}>
                            <Skeleton loading={isLoading}>
                                <Carousel className="mb-5">
                                    {
                                        field.field_programs.map(program => (
                                            <SearchProgramItem
                                                key={program.id}
                                                img={program.icon}
                                                title={program.name}
                                                num_course={program.courses_count}
                                                onClick={() => history.push(`/programs/${program.slug}`)} />
                                        ))
                                    }
                                </Carousel>
                                <Row gutter={[30, 25]}>
                                    {
                                        field.field_courses.map(course => (
                                            <Col>
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
        </section>
    )
}

export default FieldTabs