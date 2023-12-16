import { Slider, Stack } from "@mui/material";
import { Component } from "react";
import GlobalContext from "../../context/GlobalProvider";

import TextIncreaseIcon from '@mui/icons-material/TextIncrease';
import TextDecreaseIcon from '@mui/icons-material/TextDecrease';

class SizeBox extends Component{
    constructor(props){
        super(props);
        this.handleChange=this.handleChange.bind(this);
    }
    handleChange(e,v){
        this.context.set({size:v});
        console.log(v)
    }
    render(){
        return <>
             <Stack spacing={2} direction="row" sx={{ mb: 1,minWidth:'250px' }} alignItems="center">
                <TextDecreaseIcon />
                <Slider aria-label="Font Size" min={1} step={0.01} max={2} value={this.context.state.size} onChange={this.handleChange} />
                <TextIncreaseIcon />
            </Stack>
        </>
    }
}
SizeBox.contextType= GlobalContext;

export default SizeBox;