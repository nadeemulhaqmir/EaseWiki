import { Component } from "react";
import GlobalContext from "../../context/GlobalProvider";

class ResultsBox extends Component{
     constructor(props){
        super(props);
     }
     render(){
          return <div style={{fontSize: this.context.state.size+'rem'}}>
              
               {this.context.state.results}     
          </div>
     }
}

ResultsBox.contextType= GlobalContext;
export default ResultsBox;