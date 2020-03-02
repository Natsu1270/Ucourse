import React, { Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import LoginAndRegisterPage from "./pages/LoginAndRegisterPage/login-register.page";
import Header from "./components/Header/header.component";
import Footer from "./components/Footer/footer.component";
import HomePage from "./pages/HomePage/home.page";


import './App.scss';
import 'antd/dist/antd.css'
import { Spin } from 'antd';

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
            <Route exact path="/auth" component={LoginAndRegisterPage} />
          </Suspense>
        </Switch>
        <Footer />
      </div>
    </Router>

  );
}

export default App;
