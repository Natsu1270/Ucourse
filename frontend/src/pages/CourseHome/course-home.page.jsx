import React, {useEffect, Suspense, lazy} from 'react'
import {useSelector, useDispatch} from "react-redux";
import {createStructuredSelector} from "reselect";
import {useParams, Route, BrowserRouter as Router, Switch} from 'react-router-dom'
import {Layout, Menu, Skeleton} from 'antd'
import {UserOutlined, LaptopOutlined} from "@ant-design/icons";
import {getCourseHomeDetailStart} from "../../redux/CourseHome/course-home.actions";
import {tokenSelector} from "../../redux/Auth/auth.selects";
import {
    courseHomeDetailSelector, courseInfoSelector,
    isLoadingSelector,
    ofCourseSelector
} from "../../redux/CourseHome/course-home.selects";
import CourseHomeSider from "../../components/CourseHome/course-home-sider.component";
import CourseHomeInfo from "../../components/CourseHome/course-home-info.component";
import CourseHomeSchedule from "../../components/CourseHome/course-home-schedule.component";
import CourseHomeGrades from "../../components/CourseHome/course-home-grades.component";
import CourseHomeForums from "../../components/CourseHome/course-home-forums.component";


const CourseHomePage = ({match}) => {

    const dispatch = useDispatch();
    const {slug} = useParams();

    const {
        token,
        courseHomeDetail,
        isLoading,
        course,
        courseInfo,
    } = useSelector(createStructuredSelector({
        token: tokenSelector,
        courseHomeDetail: courseHomeDetailSelector,
        isLoading: isLoadingSelector,
        course: ofCourseSelector,
        courseInfo: courseInfoSelector
    }))

    useEffect(() => {
        dispatch(getCourseHomeDetailStart({token, slug}))
    }, [])


    return (
        <Layout className="course-home page-2">
            <Router>
                <CourseHomeSider course={course} isLoading={isLoading} match={match}/>
                <Route exact path={match.url}>
                    <CourseHomeInfo courseInfo={courseInfo} isLoading={isLoading}/>
                </Route>
                <Route exact path={`${match.url}/schedule`}>
                    <CourseHomeSchedule/>
                </Route>
                <Route exact path={`${match.url}/grades`}>
                    <CourseHomeGrades/>
                </Route>
                <Route exact path={`${match.url}/forums`}>
                    <CourseHomeForums/>
                </Route>
            </Router>
        </Layout>
    )
};

export default CourseHomePage