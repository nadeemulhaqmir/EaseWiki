import { Component } from "react";
import GlobalContext from "../../context/GlobalProvider";

class ResultsBox extends Component{
     constructor(props){
        super(props);
     }
     render(){
          return <>

          </>
     }
}

ResultsBox.contextType= GlobalContext;
export default ResultsBox;