import React, { Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import LoginAndRegisterPage from "./pages/LoginAndRegisterPage/login-register.page";
import Header from "./components/Header/header.component";
import Footer from "./components/Footer/footer.component";
import HomePage from "./pages/HomePage/home.page";
import ProfilePage from "./pages/ProfilePage/profile.page";


import 'antd/dist/antd.css'
import './App.scss';
import { Spin } from 'antd';
import PrivateRoute from "./components/Common/private-route.component";
import AuthRoute from "./components/Common/auth-route.component";

const AboutPage = React.lazy(() => import('./pages/AboutPage/about.page'))

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Suspense fallback={Spin}>
            <Route exact path="/about" component={AboutPage} />
            <AuthRoute exact path="/auth" component={LoginAndRegisterPage} redirectTo="/profile" />
            <PrivateRoute exact path="/profile" component={ProfilePage} />
          </Suspense>
        </Switch>
        <Footer />
      </div>
    </Router>

  );
}

export default App;
