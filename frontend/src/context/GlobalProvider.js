import { Component, createContext } from "react";


const GlobalContext = createContext();
export class GlobalProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
          color:'#212529bf',
          keywords:'',
          size:1,
          results:'',
          loading:false,
          relatedArticles:[],
          sourceLanguage:'en',
          targetLanguage:'en',
          fontFamily:'auto'  
        }
        this.set = this.set.bind(this);
    }
  
    set(obj) {
        this.setState(obj);
    }
    

    render() {
        const { set } = this;
        const state  = this.state;
        const ref=this;
        return <GlobalContext.Provider value={{ state, set,ref }}>
            {this.props.children}
        </GlobalContext.Provider>
    }
}


export default GlobalContext;
