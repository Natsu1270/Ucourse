import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import AboutPage from "./pages/AboutPage/about.page";
import LoginAndRegisterPage from "./pages/LoginAndRegisterPage/login-register.page";
import Header from "./components/Header/header.component";
import Footer from "./components/Footer/footer.component";

import './App.scss';
import 'antd/dist/antd.css'
import HomePage from "./pages/HomePage/home.page";

function App() {
  return (
      <Router>
        <div className="App">
          <Header />
          <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/about" component={AboutPage} />
              <Route exact path="/auth" component={LoginAndRegisterPage} />
          </Switch>
          <Footer />
        </div>
      </Router>

  );
}

export default App;
