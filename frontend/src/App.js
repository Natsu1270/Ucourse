import React, {lazy, Suspense, useEffect} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {createStructuredSelector} from 'reselect'

import LoginAndRegisterPage from "./pages/LoginAndRegisterPage/login-register.page";
import Header from "./components/Header/header.component";
// import Footer from "./components/Footer/footer.component";
import HomePage from "./pages/HomePage/home.page";
import ProfilePage from "./pages/ProfilePage/profile.page";
import {tokenSelector, currentUserSelector} from './redux/Auth/auth.selects'


import 'antd/dist/antd.css'
import './App.scss';
import {Spin, Layout} from 'antd';
import PrivateRoute from "./components/Common/private-route.component";
import AuthRoute from "./components/Common/auth-route.component";
import {getProfileStart} from "./redux/Profile/profile.actions";
import {fetchMyCoursesStart} from "./redux/CourseHome/course-home.actions";
import {myCourseHomesSelector} from "./redux/CourseHome/course-home.selects";
import PrivateCourseRoute from "./components/Common/private-course-route.component";
import PrivateHomePage from "./pages/HomePage/private-home.page";
import {getAllStart} from "./redux/Home/home.actions";

const Page404NotFound = lazy(() => import("./pages/404.page"));
const AboutPage = lazy(() => import('./pages/AboutPage/about.page'));
const SearchPage = lazy(() => import('./pages/SearchPage/search.page'));
const FieldPage = lazy(() => import('./pages/FieldPage/field.page'));
const FieldDetailPage = lazy(() => import('./pages/FieldPage/field-detail.page'));
const ProgramDetail = lazy(() => import ('./pages/ProgramDetail/program-detail.page'));
const CourseDetail = lazy(() => import('./pages/CourseDetail/course-detail.page'));
const AbilityTestPage = lazy(() => import('./pages/AbilityTestPage/ability-tests.page'));
const CourseHomePage = lazy(() => import('./pages/CourseHome/course-home.page'));

function App() {

    const dispatch = useDispatch();
    const {token, currentUser, myCourses} = useSelector(createStructuredSelector({
        token: tokenSelector,
        currentUser: currentUserSelector,
        myCourses: myCourseHomesSelector
    }));

    useEffect(() => {
        if (currentUser && token) {
            dispatch(getProfileStart(token));
            dispatch(fetchMyCoursesStart(token));
            dispatch(getAllStart());
        }
    }, [dispatch, currentUser, token]);

    const {Content} = Layout;

    return (
        <Router>
            <div className="App">
                <Layout>
                    <Header token={token} currentUser={currentUser}/>
                    <Switch>
                        <Route exact path="/">
                            {
                                currentUser ?
                                    <PrivateHomePage ownCourses={myCourses} ownPrograms={[]} /> :
                                    <HomePage currentUser={currentUser}/>
                            }
                        </Route>
                        <Content className="content">
                            <Suspense fallback={<Spin/>}>
                                <Switch>
                                    <Route exact path="/about" component={AboutPage}/>
                                    <AuthRoute exact path="/auth" component={LoginAndRegisterPage}
                                               redirectTo="/profile"/>
                                    <PrivateRoute path="/profile" component={ProfilePage}/>
                                    <Route exact path="/search" component={SearchPage}/>
                                    <Route exact path="/field" component={FieldPage}/>
                                    <Route path="/field/:slug" component={FieldDetailPage}/>
                                    <Route path="/programs/:slug" component={ProgramDetail}/>
                                    <Route path="/courses/:slug" component={CourseDetail}/>
                                    <Route exact path="/ability-tests" component={AbilityTestPage}/>
                                    <Route path="/learn/:slug">
                                        <CourseHomePage myCourses={myCourses} />
                                    </Route>
                                    <Route component={Page404NotFound}/>

                                </Switch>
                            </Suspense>
                        </Content>
                    </Switch>
                    {/*<Footer/>*/}
                </Layout>
            </div>
        </Router>

    );
}

export default App;
