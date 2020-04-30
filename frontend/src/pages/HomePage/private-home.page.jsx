import React, {useEffect} from 'react'
import {useSelector} from "react-redux";
import {createStructuredSelector} from "reselect";
import {useHistory, Link} from 'react-router-dom';
import {isLoadingSelector} from "../../redux/CourseHome/course-home.selects";
import {Avatar, Card, Skeleton} from "antd";
import CourseCard from "../../components/Course/course-card.component";

const PrivateHomePage = ({courses, programs}) => {

    const history = useHistory();
    const {isLoadingLearnings} = useSelector(createStructuredSelector({
        isLoadingLearnings: isLoadingSelector
    }))

    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    const {Meta} = Card;

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
                                    programs.map(program => (
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
                                    courses.map(course => (
                                        <Card
                                            onClick={()=>history.push(`learn/${course.course.slug}`)}
                                            style={{width: 400, marginTop: 16}}
                                            hoverable>
                                            <Meta
                                                avatar={
                                                    <Avatar
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
        </main>
    )
};


export default PrivateHomePage