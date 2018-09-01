import React, {Component} from 'react';
import axios from 'axios';
import TweetItem from './TweetItem';
import Search from './Search'
import Footer from "./Footer";

class tweetStorage extends Component {

  constructor() {
    super();
    this.state = {
      tweets: []
    }
  }

  componentWillMount() {
    this.getTweets();
  }

  getTweets() {
    axios.get('http://localhost:3000/api/tweetStorages')
      .then(response => {
        this.setState({tweets: response.data.slice(Math.max(response.data.length - 5, 1))}, () => {
          // console.log(this.state);
        })
      })
      .catch(err => console.log(err));
  }
  render() {
    const tweetItems = this.state.tweets.map((tweet, i) => {
      return (
        <TweetItem key={tweet.id} item={tweet}/>
      )
    });
    return (
      <div>
        <div>
          <Search/>
          <ul className="collection">
            {tweetItems}
          </ul>
        </div>
        <Footer/>
      </div>
    )
  }
}

export default tweetStorage;

