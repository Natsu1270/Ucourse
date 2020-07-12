import React, { useEffect } from 'react'
import { useSelector } from "react-redux";
import { createStructuredSelector } from "reselect";
import { useHistory, Link } from 'react-router-dom';
import { isLoadingSelector } from "../../redux/CourseHome/course-home.selects";
import { Avatar, Card, Carousel, Skeleton, Collapse, Empty, List } from "antd";
import CourseCard from "../../components/Course/course-card.component";
import { homeCoursesSelector, homeProgramsSelector, isGettingSelector } from "../../redux/Home/home.selects";
import SearchProgramItem from "../../components/SearchResult/search-program-item.component";
import HomeCourseCard from "./home-course-card"
import MyCourseTable from './my-courses-table'

const { Panel } = Collapse;

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
            <h3 className="text--main private-home--title">
                Trong tiến trình
            </h3>
            <section className="private-home__learning">

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
                                                            actions={[<a key="detail">Chi tiết</a>]}
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

                <div className="private-home__learning--link">
                    <Link to='/my-courses'>
                        Xem tất cả &rarr;
                    </Link>
                </div>

            </section>
            <h3 className="text--main private-home--title mt-5">
                Gợi ý cho bạn
            </h3>
            <section className="private-home__suggest mb-5">
                {
                    isGetting ? <Skeleton active avatar /> :
                        suggestCourses.map(course => (
                            <CourseCard
                                course={course}
                                onClick={() => history.push(`/courses/${course.slug}`)} />
                        ))
                }
            </section>
            <section className="private-home__suggest">
                {
                    isGetting ? <Skeleton active avatar /> :
                        suggestPrograms.map(program => (
                            <SearchProgramItem
                                img={program.icon}
                                title={program.name}
                                num_course={program.courses_count}
                                onClick={() => history.push(`/programs/${program.slug}`)} />
                        ))
                }
            </section>
        </main>
    )
};


export default PrivateHomePage