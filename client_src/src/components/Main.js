import React from 'react';
import {
  Switch, Route
} from
  'react-router-dom';
import TweetStorage from './TweetStorage';
import About from './About';
import TweetDetails from "./TweetDetails";
import SearchStorage from "./SearchStorage";

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={TweetStorage}/>
      <Route exact path="/about" component={About}/>
      <Route exact path="/tweetStorages/:id" component={TweetDetails}/>
      <Route exact path="/SearchStorage" component={SearchStorage}/>
    </Switch>
  </main>
);

export default Main;

