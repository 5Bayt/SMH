import React, { Component } from 'react';

class SearchedItems extends Component{

  constructor(props){
    super(props);
    this.state = {
      item: props.item
    }
  }
  render(){
    return(
      <li className="collection-item avatar">
          <img src={this.state.item.profilePic} alt="" className="circle" />
          <span className="title">{this.state.item.screenname}</span>
          <p>Tweet: {this.state.item.tweettext}<br />
            Tarih: {this.state.item.createdAt}</p>
      </li>
    )
  }
}

export default SearchedItems;
