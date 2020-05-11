import React, {useEffect} from 'react'
import {useSelector} from "react-redux";
import {createStructuredSelector} from "reselect";
import {useHistory, Link} from 'react-router-dom';
import {isLoadingSelector} from "../../redux/CourseHome/course-home.selects";
import {Avatar, Card, Carousel, Skeleton} from "antd";
import CourseCard from "../../components/Course/course-card.component";
import {homeCoursesSelector, homeProgramsSelector, isGettingSelector} from "../../redux/Home/home.selects";
import SearchProgramItem from "../../components/SearchResult/search-program-item.component";
import HomeCourseCard from "./home-course-card"

const PrivateHomePage = ({ownCourses, ownPrograms}) => {

    const history = useHistory();
    const {isLoadingLearnings, isGetting, courses, programs} = useSelector(createStructuredSelector({
        isLoadingLearnings: isLoadingSelector,
        isGetting: isGettingSelector,
        courses: homeCoursesSelector,
        programs: homeProgramsSelector,
    }))

    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);
    const ownCourseIds = ownCourses.map(course=>course.course.id)

    const {Meta} = Card;
    const suggestCourses = courses.filter(course => !ownCourseIds.includes(course.id))
    const suggestPrograms = programs.filter(program => !ownPrograms.includes(program))

    return (
        <main className="private-home page section-10">
            <h3 className="text--main private-home--title">
                Trong tiến trình
            </h3>
            <section className="private-home__learning">
            <h3 className="text--main private-home__learning--header">
                                    Chương trình học
                                </h3>
                {
                    isLoadingLearnings ?
                        <Skeleton active avatar paragraph={{rows: 2}}/> :
                        programs.length ?
                            <div className="private-home__learning--programs">
                                
                                <div className="private-home__learning--programs--items">
                                    {
                                        ownPrograms.map(program => (
                                            <div key={program.id} className="mini-program">
                                                {program.name}
                                            </div>
                                        ))
                                    }
                                </div>
                            </div> : null
                }
                
                        <div className="private-home__learning--courses">
                            <h3 className="text--main private-home__learning--header">
                                Khóa học
                            </h3>
                    {
                        isLoadingLearnings ?
                            <div className="d-flex">
                                <Skeleton active avatar />
                                <Skeleton active avatar />
                                <Skeleton active avatar />
                            </div> : <div className="private-home__learning--courses--items">
                                {
                                    ownCourses.map(course => (
                                        <HomeCourseCard course={course} onClick={() => history.push(`learn/${course.course.slug}`)} />
                                    ))
                                }
                            </div>
                    }
                            
                        </div>
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
                    isGetting ? <Skeleton active avatar/> :
                        suggestCourses.map(course => (
                            <CourseCard
                                course={course}
                                onClick={() => history.push(`/courses/${course.slug}`)}/>
                        ))
                }
            </section>
            <section className="private-home__suggest">
                {
                    isGetting ? <Skeleton active avatar/> :
                        suggestPrograms.map(program => (
                            <SearchProgramItem
                                img={program.icon}
                                title={program.name}
                                num_course={program.courses_count}
                                onClick={() => history.push(`/programs/${program.slug}`)}/>
                        ))
                }
            </section>
        </main>
    )
};


export default PrivateHomePage