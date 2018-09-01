import React, {Component} from "react";
import axios from 'axios';
import TweetItem from './TweetItem';


import List from '@material-ui/core/List';
const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});


export default class Timeline extends Component {

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
          console.log(this.state.tweets);
        })
      })
      .catch(err => console.log(err));
  }

  render() {
    const { classes } = this.props;
    const tweetItems = this.state.tweets.map((tweet, i) => {
      return (
        <TweetItem key={tweet.id} item={tweet}/>
      )
    });
    return (
      <div className={classes.root}>
        <List>
          <ul>
            {tweetItems}
          </ul>
        </List>
      </div>
    )
  }
}
