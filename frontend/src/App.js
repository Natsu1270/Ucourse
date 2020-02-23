import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import AboutPage from "./pages/AboutPage/about.page";
import LoginAndRegisterPage from "./pages/LoginAndRegisterPage/login-register.page";
import Header from "./components/Header/header.component";

import './App.scss';

function App() {
  return (
      <Router>
        <div className="App">
          <Header />
          <Switch>
              <Route exact path="/about" component={AboutPage} />
              <Route exact path="/auth" component={LoginAndRegisterPage} />
          </Switch>
        </div>
      </Router>

  );
}

export default App;
