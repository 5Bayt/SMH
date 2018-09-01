import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import MainPage from '../components/MainPage';
import About from '../components/About';
import Login from '../components/Login'

const MyRouter = () => (
  <Router>
    <div>
      <Route exact path="/" component={MainPage}/>
      <Route path="/about" component={About}/>
      <Route path="/login" component={Login}/>
    </div>
  </Router>
);

export default MyRouter;

