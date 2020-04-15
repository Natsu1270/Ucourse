import React, {lazy, Suspense, useEffect} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {createStructuredSelector} from 'reselect'

import LoginAndRegisterPage from "./pages/LoginAndRegisterPage/login-register.page";
import Header from "./components/Header/header.component";
import Footer from "./components/Footer/footer.component";
import HomePage from "./pages/HomePage/home.page";
import ProfilePage from "./pages/ProfilePage/profile.page";
import {tokenSelector, currentUserSelector} from './redux/Auth/auth.selects'


import 'antd/dist/antd.css'
import './App.scss';
import {Spin} from 'antd';
import PrivateRoute from "./components/Common/private-route.component";
import AuthRoute from "./components/Common/auth-route.component";
import {getProfileStart} from "./redux/Profile/profile.actions";
import AbilityTest from "./components/AbilityTest/ability-test.component";

const AboutPage = lazy(() => import('./pages/AboutPage/about.page'));
const SearchPage = lazy(() => import('./pages/SearchPage/search.page'));
const FieldPage = lazy(() => import('./pages/FieldPage/field.page'));
const FieldDetailPage = lazy(() => import('./pages/FieldPage/field-detail.page'));
const ProgramDetail = lazy(() => import ('./pages/ProgramDetail/program-detail.page'));
const CourseDetail = lazy(() => import('./pages/CourseDetail/course-detail.page'));
const AbilityTestPage = lazy(() => import('./pages/AbilityTestPage/ability-tests.page'));

function App() {

    const dispatch = useDispatch();
    const {token, currentUser} = useSelector(createStructuredSelector({
        token: tokenSelector,
        currentUser: currentUserSelector,
    }));

    useEffect(() => {
        if (currentUser && token) {
            dispatch(getProfileStart(token))
        }
    }, [dispatch, currentUser, token]);


    return (
        <Router>
            <div className="App">
                <Header token={token} currentUser={currentUser}/>
                <Switch>
                    <Route exact path="/">
                        <HomePage currentUser={currentUser}/>
                    </Route>
                    <Suspense fallback={<Spin />}>
                        <Route exact path="/about" component={AboutPage}/>
                        <AuthRoute exact path="/auth" component={LoginAndRegisterPage} redirectTo="/profile"/>
                        <PrivateRoute path="/profile" component={ProfilePage}/>
                        <Route path="/search" component={SearchPage}/>
                        <Route exact path="/field" component={FieldPage}/>
                        <Route path="/field/:slug" component={FieldDetailPage}/>
                        <Route path="/programs/:slug" component={ProgramDetail} />
                        <Route path="/courses/:slug" component={CourseDetail} />
                        <Route exact path="/ability-tests" component={AbilityTestPage} />
                    </Suspense>
                </Switch>
                <Footer/>
            </div>
        </Router>

    );
}

export default App;
