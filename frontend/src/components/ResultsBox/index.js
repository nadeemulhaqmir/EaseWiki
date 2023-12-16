import { Component, createRef } from "react";
import GlobalContext from "../../context/GlobalProvider";
import { CircularProgress, IconButton, Stack, Typography } from "@mui/material";
import { Campaign } from "@mui/icons-material";

class ResultsBox extends Component{
     constructor(props){
        super(props);
        this.sourceLanguage=createRef();
        this.targetLanguage=createRef();
        this.playAudio=this.playAudio.bind(this);
        this.translate=this.translate.bind(this);
        this.languages=[{title:"English",code:"en"},{title:"Hindi",code:"hi"},{title:'Tamil',code:'ta'}, {title:"Urdu",code:"ur"}];
     }
     playAudio(){
      
     }

     translate(){
          const sL= this.sourceLanguage.current.value;
          const tL= this.targetLanguage.current.value;
           console.log(sL,tL);
           
     }

     render(){
          const relatedArticles =  this.context.state.relatedArticles;
          const results= this.context.state.results;
          return <>
              {
                 this.context.state.loading ? <Stack sx={{alignItems:'center',marginTop:'20px'}}><CircularProgress /></Stack> 
                 :
                 <Stack>
                 <div style={{fontSize: this.context.state.size+'rem'}}>
                    {results}     
                 </div>
                 {
                     results && <Stack sx={{alignItems:'end', flexDirection:'row'}}> 
                        <select ref={this.sourceLanguage} onChange={this.translate}>
                          {
                          this.languages.map((l,k)=>{ return  <option key={k} value={l.code}>{l.title}</option>})
                          }
                        </select>
                        <select ref={this.targetLanguage} onChange={this.translate}>
                        {
                          this.languages.map((l,k)=>{ return  <option key={k} value={l.code}>{l.title}</option>})
                          }
                        </select>
                        <IconButton onClick={this.playAudio} ><Campaign /></IconButton>
                     </Stack>
                 }
                  {
                     Array.isArray(relatedArticles) && relatedArticles.length>0 && <>
                     <Typography>Related Articles:</Typography>
                     <ul>
                        {
                         relatedArticles.map((article,k)=>{
                         return <li key={k}><a href={article.link}>{article.title}</a></li>
                          }) 
                        }
                     </ul> 
                     </>
                  }
                 </Stack>
                
              }
              
          </>
         
     }
}

ResultsBox.contextType= GlobalContext;
export default ResultsBox;