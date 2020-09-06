import React, { useState, useEffect, Suspense, lazy } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
    useParams, Route, BrowserRouter as Router,
    Switch, useRouteMatch, useLocation, useHistory, Redirect
} from 'react-router-dom'
import { Layout, Menu, Skeleton } from 'antd'
import { UserOutlined, LaptopOutlined } from "@ant-design/icons";
import { getCourseHomeDetailStart } from "../../redux/CourseHome/course-home.actions";
import { tokenSelector } from "../../redux/Auth/auth.selects";
import { checkClassOwnership } from "../../api/courseHome.services"
import {
    courseHomeDetailSelector, courseInfoSelector,
    isLoadingSelector,
    ofCourseSelector,
    courseHomeTopicsSelector, forumsSelector, courseHomeDetailStudentSelector,
} from "../../redux/CourseHome/course-home.selects";
import CourseHomeSider from "../../components/CourseHome/course-home-sider.component";
import CourseHomeInfo from "../../components/CourseHome/course-home-info.component";
import Constants from "../../constants"
import Forums from "../../components/Forum/forums.component";
import ForumDetail from "../../components/Forum/forum-detail.component";
import ThreadDetail from "../../components/Forum/thread-detail.component";
import RoleComponent from "../../components/RoleComponent"
import QuestionBank from '../../components/CourseHome/Questions/course-home-questions.component';


const CourseHomeSchedule = lazy(() => import("../../components/CourseHome/course-home-schedule.component"))
const CourseHomeForums = lazy(() => import("../../components/CourseHome/course-home-forums.component"))
const CourseHomeLecture = lazy(() => import("../../components/CourseHome/course-home-lecture.component"))
const PrivateExamList = lazy(() => import("../../components/Exam/private-exam-list.component"))

const AssignmentStudent = lazy(() => import("../../components/Assignment/assignment-student.component"))
const AssignmentTeacher = lazy(() => import("../../components/Assignment/assignment-teacher.component"))

const CourseHomeGradesStudent = lazy(() => import("../../components/CourseHome/course-home-grades-student.component"))
const CourseHomeGradesTeacher = lazy(() => import("../../components/CourseHome/course-home-grades-teacher.component"))
const CourseHomeStudent = lazy(() => import("../../components/CourseHome/course-home-students.component"))
const CertificateTeacher = lazy(() => import("../../components/Certificate/certificate-teacher.component"))
const CertificateStudent = lazy(() => import("../../components/Certificate/certificate-student.component"))
const CourseHomeCalendar = lazy(() => import("../../components/CourseHome/course-home-calendar.component"))

const CourseHomePage = ({ myCourses, userRole }) => {

    const [own, setOwn] = useState(true)

    const dispatch = useDispatch();
    const { slug } = useParams();
    const match = useRouteMatch();

    const isMyCourse = () => {
        return myCourses.find(course => course.slug === slug)
    }

    const {
        token,
        courseHomeDetail,
        courseHomeStudents,
        isLoading,
        course,
        courseInfo,
        topics,
        forums,
    } = useSelector(createStructuredSelector({
        token: tokenSelector,
        courseHomeDetail: courseHomeDetailSelector,
        courseHomeStudents: courseHomeDetailStudentSelector,
        isLoading: isLoadingSelector,
        course: ofCourseSelector,
        courseInfo: courseInfoSelector,
        topics: courseHomeTopicsSelector,
        forums: forumsSelector
    }))

    useEffect(() => {
        dispatch(getCourseHomeDetailStart({ token, slug }))
    }, [])

    useEffect(() => {
        if (courseHomeDetail.is_my_class !== undefined) {
            setOwn(courseHomeDetail.is_my_class)
        }
    }, [courseHomeDetail])



    if ((!own || !token) && userRole.code != 'TC' && userRole.code != 'TA') {
        return <Redirect to='/' />
    }
    return (
        <Layout className="course-home">
            <Router>
                <CourseHomeSider course={course} isLoading={isLoading} match={match} userRole={userRole} />
                <Route exact path={match.url}>
                    <CourseHomeInfo
                        courseInfo={courseInfo}
                        isLoading={isLoading}
                        userRole={userRole}
                        token={token}
                        slug={slug}
                    />
                </Route>
                <Suspense fallback={Constants.SPIN_ICON}>
                    <Route exact path={`${match.url}/schedule`}>
                        <CourseHomeSchedule
                            topics={topics}
                            isLoading={isLoading}
                            userRole={userRole}
                            token={token}
                            courseHomeId={courseHomeDetail.id}
                            course={courseHomeDetail.id}
                        />
                    </Route>
                    <Route exact path={`${match.url}/grades`}>
                        <RoleComponent
                            roleCode={userRole.code}
                            StudentComponent={CourseHomeGradesStudent}
                            TeacherTAComponent={CourseHomeGradesTeacher}
                            token={token}
                            courseHomeId={courseHomeDetail.id}
                            students={courseHomeStudents}
                        />
                    </Route>
                    <Route exact path={`${match.url}/forums`}>
                        <Forums
                            token={token}
                            courseHome={courseHomeDetail}
                            forums={forums}
                            isLoading={isLoading}
                            userRole={userRole} />
                    </Route>
                    <Route exact path={`${match.url}/forums/:forum_id`}>
                        <ForumDetail token={token} courseHomeId={courseHomeDetail.id} />
                    </Route>
                    <Route exact path={`${match.url}/forums/:forum_id/threads/:thread_id`}>
                        <ThreadDetail token={token} />
                    </Route>
                </Suspense>
                <Route exact path={`${match.url}/lecture/:topic/:assetId`}>
                    <CourseHomeLecture topics={topics} isLoading={isLoading} token={token} />
                </Route>
                <Route exact path={`${match.url}/exams/:exam_id`}>
                    <PrivateExamList userRole={userRole} token={token} courseHomeDetail={courseHomeDetail} />
                </Route>

                <Route exact path={`${match.url}/:topicId/assignment/:assignmentId`}>
                    <RoleComponent
                        roleCode={userRole.code}
                        StudentComponent={AssignmentStudent}
                        TeacherTAComponent={AssignmentTeacher}
                        AdminComponent={null}
                        token={token}
                        courseHomeDetail={courseHomeDetail}
                    />
                </Route>

                <Route exact path={`${match.url}/students`}>
                    <CourseHomeStudent students={courseHomeDetail.students} isLoading={isLoading} />
                </Route>

                <Route exact path={`${match.url}/calendar`}>
                    <CourseHomeCalendar courseHome={courseHomeDetail} />
                </Route>

                <Route exact path={`${match.url}/questions`}>
                    <QuestionBank token={token} />
                </Route>

                <Route exact path={`${match.url}/certificate`}>
                    <RoleComponent
                        roleCode={userRole.code}
                        StudentComponent={CertificateStudent}
                        TeacherTAComponent={CertificateTeacher}
                        AdminComponent={null}
                        token={token}
                        courseHome={courseHomeDetail}
                        course={course}
                    />
                </Route>
            </Router>
        </Layout>
    )
};

export default CourseHomePage