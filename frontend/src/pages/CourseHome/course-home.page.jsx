import React, {useEffect, Suspense, lazy} from 'react'
import {useSelector, useDispatch} from "react-redux";
import {createStructuredSelector} from "reselect";
import {
    useParams, Route, BrowserRouter as Router,
    Switch, useRouteMatch, useLocation, useHistory, Redirect
} from 'react-router-dom'
import {Layout, Menu, Skeleton} from 'antd'
import {UserOutlined, LaptopOutlined} from "@ant-design/icons";
import {getCourseHomeDetailStart} from "../../redux/CourseHome/course-home.actions";
import {tokenSelector} from "../../redux/Auth/auth.selects";
import {
    courseHomeDetailSelector, courseInfoSelector,
    isLoadingSelector,
    ofCourseSelector,
    courseHomeTopicsSelector, forumsSelector,
} from "../../redux/CourseHome/course-home.selects";
import CourseHomeSider from "../../components/CourseHome/course-home-sider.component";
import CourseHomeInfo from "../../components/CourseHome/course-home-info.component";
import Constants from "../../constants"

const CourseHomeSchedule = lazy(() => import("../../components/CourseHome/course-home-schedule.component"))
const CourseHomeGrades = lazy(() => import("../../components/CourseHome/course-home-grades.component"))
const CourseHomeForums = lazy(() => import("../../components/CourseHome/course-home-forums.component"))
const CourseHomeLecture = lazy(() => import("../../components/CourseHome/course-home-lecture.component"))
const PrivateExamList = lazy(() => import("../../components/Exam/private-exam-list.component"))

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
        forums
    } = useSelector(createStructuredSelector({
        token: tokenSelector,
        courseHomeDetail: courseHomeDetailSelector,
        isLoading: isLoadingSelector,
        course: ofCourseSelector,
        courseInfo: courseInfoSelector,
        topics: courseHomeTopicsSelector,
        forums: forumsSelector
    }))

    useEffect(() => {
        dispatch(getCourseHomeDetailStart({token, slug}))
    }, [])

    if (!isMyCourse()) {
        return <Redirect to={`${Constants.COURSES_DETAIL_LINK}/${slug}`}/>
    }
    return (
        <Layout className="course-home">
            <Router>
                <CourseHomeSider course={course} isLoading={isLoading} match={match}/>
                <Route exact path={match.url}>
                    <CourseHomeInfo courseInfo={courseInfo} isLoading={isLoading}/>
                </Route>
                <Suspense fallback={Constants.SPIN_ICON}>
                    <Route exact path={`${match.url}/schedule`}>
                        <CourseHomeSchedule topics={topics} isLoading={isLoading}/>
                    </Route>
                    <Route exact path={`${match.url}/grades`}>
                        <CourseHomeGrades/>
                    </Route>
                    <Route exact path={`${match.url}/forums`}>
                        <CourseHomeForums forums={forums} isLoading={isLoading}/>
                    </Route>

                </Suspense>
                <Route exact path={`${match.url}/lecture/:topic/:assetId`}>
                    <CourseHomeLecture topics={topics} isLoading={isLoading}/>
                </Route>
                <Route exact path={`${match.url}/exams/:exam_id`}>
                    <PrivateExamList token={token}/>
                </Route>
            </Router>
        </Layout>
    )
};

export default CourseHomePage