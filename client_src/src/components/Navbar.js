import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Navbar extends Component{
  render(){
    return(
      <div>
        <nav className="blue darken">
          <div className="nav-wrapper">
            <a href="/" className="brand-logo center">SMH</a>
            <a data-activates="main-menu" className="button-collapse show-on-large">
              <i className="fa fa-bars"/>
            </a>
            <ul className="right hide-on-small-only">
              <li><Link to="/"><i className="fa fa-users"/> SMH </Link></li>
            </ul>
            <ul className="side-nav" id="main-menu">
              <li><Link to="/"><i className="fa fa-users"/>Tweets</Link></li>
              <li><Link to="/TweetStorage/add"><i className="fa fa-plus"/>Add Tweets</Link></li>
            </ul>
          </div>
        </nav>
      </div>
    )
  }
}

export default Navbar;
