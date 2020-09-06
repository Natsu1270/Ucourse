import React, { useEffect } from 'react'
import { useSelector } from "react-redux";
import { createStructuredSelector } from "reselect";
import { useHistory, Link } from 'react-router-dom';
import { isLoadingSelector } from "../../redux/CourseHome/course-home.selects";
import { Avatar, Skeleton, Collapse, Empty, List, Space, Button, Col, Row, Card, Divider } from "antd";
import CourseCard from "../../components/Course/course-card.component";
import { homeCoursesSelector, homeProgramsSelector, isGettingSelector } from "../../redux/Home/home.selects";
import SearchProgramItem from "../../components/SearchResult/search-program-item.component";
import MyCourseTable from './my-courses-table'

const { Panel } = Collapse;
const { Meta } = Card

const PrivateHomePage = ({ ownCourses, ownPrograms }) => {

    const history = useHistory();
    const { isLoadingLearnings, isGetting, courses, programs } = useSelector(createStructuredSelector({
        isLoadingLearnings: isLoadingSelector,
        isGetting: isGettingSelector,
        courses: homeCoursesSelector,
        programs: homeProgramsSelector,
    }))

    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);
    const ownCourseIds = ownCourses.map(course => course.course.id)

    const suggestCourses = courses.filter(course => !ownCourseIds.includes(course.id))
    const suggestPrograms = programs.filter(program => !ownPrograms.includes(program))

    return (
        <main className="private-home page section-10">

            <section className="private-home__learning mb-5">

                <h3 className="text--main private-home--title">
                    Trong tiến trình
            </h3>

                <Collapse>
                    <Panel header={<h4 className="text--main text--main__smaller private-home__learning--header">Chương trình học</h4>} key="1">

                        {
                            ownPrograms.length ?

                                <Collapse >
                                    {
                                        ownPrograms.map(program => (
                                            <Panel key={program.id} header={program.name}>
                                                <List
                                                    className="demo-loadmore-list"
                                                    itemLayout="horizontal"
                                                    dataSource={program.program_course}
                                                    renderItem={item => (
                                                        <List.Item
                                                            actions={[<Link to={`courses/${item.slug}`} key="detail">Chi tiết</Link>]}
                                                        >
                                                            <List.Item.Meta
                                                                avatar={
                                                                    <Avatar src={item.icon} />
                                                                }
                                                                title={<a href="https://ant.design">{item.title}</a>}
                                                            // description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                                                            />
                                                        </List.Item>
                                                    )}
                                                />
                                            </Panel>
                                        ))
                                    }

                                </Collapse>
                                : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                        }
                    </Panel>

                    <Panel header={<h4 className="text--main text--main__smaller private-home__learning--header">Khóa học</h4>} key="2">
                        {
                            isLoadingLearnings ?
                                <div className="d-flex">
                                    <Skeleton active avatar />
                                    <Skeleton active avatar />
                                    <Skeleton active avatar />
                                </div> : <div className="private-home__learning--courses--items">
                                    <MyCourseTable courses={ownCourses} />
                                </div>
                        }
                    </Panel>

                </Collapse>

                <div className="mt-4">
                    <Space>
                        <Button size="large" type="primary" onClick={() => history.push('/my-courses')}>
                            Xem tất cả &rarr;
                        </Button>
                        <Button type="primary"
                            style={{ background: '#ff6f69', border: 'none' }}
                            size="large" onClick={() => history.push('/program-process')}>
                            Tiến độ chương trình học &rarr;
                        </Button>
                    </Space>
                </div>


            </section>

            <section className="private-home__suggest mb-5">
                <h3 className="text--main private-home--title mt-5">
                    Gợi ý cho bạn
                </h3>
                <Row gutter={[32, 32]} className="mt-5">
                    {
                        suggestCourses.map(course => (
                            <Col span={6}>
                                <CourseCard
                                    key={course.id}
                                    course={course}
                                    onClick={() => history.push(`/courses/${course.slug}`)} />
                            </Col>
                        ))
                    }
                </Row>

                <Divider />


                <Row gutter={[16, 16]}>
                    {
                        suggestPrograms.map(program => (
                            <Col key={program.id} span={6}>
                                <Card
                                    hoverable onClick={() => history.push(`/programs/${program.slug}`)} loading={isGetting}>
                                    <Meta
                                        avatar={<Avatar size={48} src={program.icon} />}
                                        title={program.name}
                                        description={<Row><Col>Số lớp: {program.courses_count}</Col></Row>}
                                    />
                                </Card>
                            </Col>
                        )
                        )
                    }
                </Row>
            </section>

        </main>
    )
};


export default PrivateHomePage