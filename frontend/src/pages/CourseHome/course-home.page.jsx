import React, {useEffect, Suspense, lazy} from 'react'
import {useSelector, useDispatch} from "react-redux";
import {createStructuredSelector} from "reselect";
import {useParams, Route, BrowserRouter as Router,
    Switch, useRouteMatch, useLocation, useHistory, Redirect} from 'react-router-dom'
import {Layout, Menu, Skeleton} from 'antd'
import {UserOutlined, LaptopOutlined} from "@ant-design/icons";
import {getCourseHomeDetailStart} from "../../redux/CourseHome/course-home.actions";
import {tokenSelector} from "../../redux/Auth/auth.selects";
import {
    courseHomeDetailSelector, courseInfoSelector,
    isLoadingSelector,
    ofCourseSelector,
    courseHomeTopicsSelector,
} from "../../redux/CourseHome/course-home.selects";
import CourseHomeSider from "../../components/CourseHome/course-home-sider.component";
import CourseHomeInfo from "../../components/CourseHome/course-home-info.component";
import CourseHomeSchedule from "../../components/CourseHome/course-home-schedule.component";
import CourseHomeGrades from "../../components/CourseHome/course-home-grades.component";
import CourseHomeForums from "../../components/CourseHome/course-home-forums.component";
import Constants from "../../constants";
import CourseHomeLecture from "../../components/CourseHome/course-home-lecture.component";


const CourseHomePage = ({myCourses}) => {

    const dispatch = useDispatch();
    const {slug} = useParams();
    const match = useRouteMatch();
    const history = useHistory();

    const isMyCourse = () => {
        return myCourses.find(course => course.course.slug === slug)
    }

    const {
        token,
        courseHomeDetail,
        isLoading,
        course,
        courseInfo,
        topics,
    } = useSelector(createStructuredSelector({
        token: tokenSelector,
        courseHomeDetail: courseHomeDetailSelector,
        isLoading: isLoadingSelector,
        course: ofCourseSelector,
        courseInfo: courseInfoSelector,
        topics: courseHomeTopicsSelector,
    }))

    useEffect(() => {
        dispatch(getCourseHomeDetailStart({token, slug}))
    }, [])

    if (!isMyCourse()) {
        return <Redirect to={`${Constants.COURSES_DETAIL_LINK}/${slug}`} />
    }
    return (
        <Layout className="course-home">
            <Router>
                <CourseHomeSider course={course} isLoading={isLoading} match={match}/>
                <Route exact path={match.url}>
                    <CourseHomeInfo courseInfo={courseInfo} isLoading={isLoading}/>
                </Route>
                <Route exact path={`${match.url}/schedule`}>
                    <CourseHomeSchedule topics={topics} isLoading={isLoading}/>
                </Route>
                <Route exact path={`${match.url}/grades`}>
                    <CourseHomeGrades/>
                </Route>
                <Route exact path={`${match.url}/forums`}>
                    <CourseHomeForums/>
                </Route>
                <Route exact path={`${match.url}/lecture/:topic/:assetId`}>
                    <CourseHomeLecture topics={topics} isLoading={isLoading} />
                </Route>
            </Router>
        </Layout>
    )
};

export default CourseHomePage