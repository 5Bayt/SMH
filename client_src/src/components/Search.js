import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import SearchedItems from "./SearchedItems";
import SearchStorage from "./SearchStorage"

class Search extends Component{
  // onSubmit(e){
  //   axios.post("http://localhost:3000/api/tweetStorages/getUserTweet", {
  //       user: this.ref.username
  //   })
  //     .then(response => {
  //     this.setState({tweets: response.data.result}, ()=>{});
  //       console.log(response.data.result)
  //   });
  //   e.preventDefault();
  // }
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    axios.post("http://localhost:3000/api/tweetStorages/getUserTweet", {
      user: this.state.value
    }).then(response => {
      console.log(this.state.value);
    });
    event.preventDefault();
  }

  render(){
    return(
      <div className="row">
        <form className="col s12" onSubmit={this.handleSubmit}>
          <input placeholder="Kullancı Ara" className="validate col s10" type="text" value={this.state.value} onChange={this.handleChange}>
          </input>
            {/*<Link to={'SearchStorage'}>*/}
            <input type="submit" value="ARA" className="btn col s2"/>
          {/*</Link>*/}
        </form>
      </div>
      )
  }
}

export default Search;
