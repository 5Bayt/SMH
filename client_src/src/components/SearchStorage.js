import React, {Component} from 'react';
import SearchedItems from "./SearchedItems";
import Search from './Search'

class searchstorage extends Component{

  constructor(){
    super();
    this.state = {
      tweet: []
    }
  }

 render(){
   return(
     <div>
       <Search/>
     </div>
   );
 }
}

export default searchstorage;
