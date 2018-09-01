import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class TweetItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      item: props.item
    }
  }

  render() {
    return (
      <li className="collection-item avatar">
        <Link to={`/tweetStorages/${this.state.item.id}`}>
          <img src={this.state.item.profilePic} alt="" className="circle"/>
          <span className="title">{this.state.item.screenname}</span>
          <p>Tweet: {this.state.item.tweettext}<br/>
            Tarih: {this.state.item.createdAt}</p>
        </Link>
      </li>
    )
  }
}

export default TweetItem;
