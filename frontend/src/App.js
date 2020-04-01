import React, {Suspense, useEffect} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {createStructuredSelector} from 'reselect'

import LoginAndRegisterPage from "./pages/LoginAndRegisterPage/login-register.page";
import Header from "./components/Header/header.component";
import Footer from "./components/Footer/footer.component";
import HomePage from "./pages/HomePage/home.page";
import ProfilePage from "./pages/ProfilePage/profile.page";
import {tokenSelector, currentUserSelector, isLoadUserLoadingSelector} from './redux/Auth/auth.selects'


import 'antd/dist/antd.css'
import './App.scss';
import {Spin} from 'antd';
import PrivateRoute from "./components/Common/private-route.component";
import AuthRoute from "./components/Common/auth-route.component";
import {getProfileStart} from "./redux/Profile/profile.actions";

const AboutPage = React.lazy(() => import('./pages/AboutPage/about.page'))
const SearchPage = React.lazy(() => import('./pages/SearchPage/search.page'))

function App() {
    const dispatch = useDispatch()
    const {token, currentUser} = useSelector(createStructuredSelector({
        token: tokenSelector,
        currentUser: currentUserSelector,
    }))
    useEffect(() => {
        if (currentUser && token) {
            dispatch(getProfileStart(token))
        }
    }, [dispatch, currentUser, token])
    return (
        <Router>
            <div className="App">
                <Header token={token} currentUser={currentUser} />
                <Switch>
                    <Route exact path="/">
                        <HomePage currentUser={currentUser}/>
                    </Route>
                    <Suspense fallback={Spin}>
                        <Route exact path="/about" component={AboutPage}/>
                        <AuthRoute exact path="/auth" component={LoginAndRegisterPage} redirectTo="/profile"/>
                        <PrivateRoute path="/profile" component={ProfilePage}/>
                        <Route path="/search" component={SearchPage} />
                        <Route path="/field" component={}
                    </Suspense>
                </Switch>
                <Footer/>
            </div>
        </Router>

    );
}

export default App;
