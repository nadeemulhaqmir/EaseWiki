import { Component } from "react";
import GlobalContext from "../../context/GlobalProvider";
import { Button, IconButton, InputBase, Stack, TextField } from "@mui/material";
import { InputAdornment } from '@mui/material';
// import "./index.css";
import MicNoneIcon from '@mui/icons-material/MicNone';
import { Terminal } from "@mui/icons-material";

class SearchBox extends Component{
    constructor(props){
        super(props);
    }

    render(){
        console.log("ctx",this.context);
        return <>
            <Stack sx={{flexDirection:'row',gap:'5px', justifyContent:'center'}}>
            <TextField  size="small" placeholder="Search" variant="outlined"  
             onChange={(e)=>{ this.context.set({'keywords':e.target.value.trim()}); }}
            InputProps={{
               endAdornment:
               <IconButton onClick={()=>0} >
                <MicNoneIcon sx={{color:'blue'}} />
               </IconButton>,
               classes: {
                         // adornedEnd: classes.adornedEnd
                         }
               }} /><Button variant="filled"  sx={{backgroundColor:'#b0b4fd'}}  >Search</Button>
            </Stack>
        </>
    }
}
SearchBox.contextType= GlobalContext;
export default SearchBox;