import React, {Component} from "react";
import Header from "../Header";
import Timeline from "../Timeline";

export default class MainPage extends Component{
  render(){
    return(
      <div>
        <Header/>
        <Timeline/>
      </div>
    );
  }
}
