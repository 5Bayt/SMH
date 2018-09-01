import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Footer from "./Footer";

class TweetDetails extends Component{

  constructor(props){
    super(props);
    this.state = {
      details: ''
    }
  }

  componentWillMount(){
    this.getTweetDetails();
  }
  getTweetDetails(){
    let tweetId = this.props.match.params.id;
    axios.get(`http://localhost:3000/api/tweetStorages/${tweetId}`)
      .then(response => {
        this.setState({details: response.data}, () =>{
          console.log(this.state);
        })
      })
      .catch(err => console.log(err)) ;
  }

  render(){
    return(
      <div>
        <br />
        <div className="col s12">
          <Link className = "btn grey left-small" to = "/">
            <i className="large material-icons">arrow_back</i>
          </Link>
          <div className="row">
          <div className="input-field col s5">
          <img className="responsive-img" data-caption="Profil Resmi" width="250" src={this.state.details.profilePic}/>
          </div>
          <div className="input-field col s6">
            <h4>{this.state.details.userDescr}</h4>
          </div>
          </div>
        </div>
        <h1>
          <a href={`http://www.twitter.com/${this.state.details.username}`}>{this.state.details.screenname}</a>
        </h1>
        <ul className="collection">
          <li className="collection-item">Tweet: {this.state.details.tweettext}</li>
          <li className="collection-item">Kullanıcı Adı: {this.state.details.username}</li>
          <li className="collection-item">Tarih: {this.state.details.createdAt}</li>
        </ul>
        <button className="btn red right">Profili Sil</button>
      <div>
        <br /><br />
        <Footer />
      </div>
      </div>

    )
  }
}

export default TweetDetails;
