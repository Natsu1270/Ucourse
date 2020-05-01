import React, {useEffect} from 'react'
import {useSelector} from "react-redux";
import {createStructuredSelector} from "reselect";
import {useHistory, Link} from 'react-router-dom';
import {isLoadingSelector} from "../../redux/CourseHome/course-home.selects";
import {Avatar, Card, Carousel, Skeleton} from "antd";
import CourseCard from "../../components/Course/course-card.component";
import {homeCoursesSelector, homeProgramsSelector, isGettingSelector} from "../../redux/Home/home.selects";
import SearchProgramItem from "../../components/SearchResult/search-program-item.component";


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


    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true
    };

    return (
        <main className="private-home page section-10">
            <h3 className="text--main private-home--title">
                Trong tiến trình
            </h3>
            <section className="private-home__learning">

                {
                    isLoadingLearnings ?
                        <Skeleton active avatar paragraph={{rows: 4}}/> :
                        programs.length ?
                            (<div className="private-home__learning--programs">
                                <h3 className="text--main private-home__learning--header">
                                    Chương trình học
                                </h3>
                                <div className="private-home__learning--programs--items">
                                    {
                                        ownPrograms.map(program => (
                                            <div key={program.id} className="mini-program">
                                                {program.name}
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>) : null
                }
                {
                    isLoadingLearnings ?
                        <Skeleton active avatar paragraph={{rows: 4}}/> :
                        (<div className="private-home__learning--courses">
                            <h3 className="text--main private-home__learning--header">
                                Khóa học
                            </h3>
                            <div className="private-home__learning--courses--items">
                                {
                                    ownCourses.map(course => (
                                        <Card className="private-home__learning--item"
                                              onClick={() => history.push(`learn/${course.course.slug}`)}
                                              style={{width: 400, marginTop: 16}}
                                              hoverable>
                                            <Meta
                                                avatar={
                                                    <Avatar
                                                        size={48}
                                                        src={course.course.icon}/>
                                                }
                                                title={course.course.title}
                                                description={course.course.status}
                                            />
                                        </Card>
                                    ))
                                }
                            </div>
                        </div>)
                }
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