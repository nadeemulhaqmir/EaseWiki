import { List, MenuItem, Select } from "@mui/material";
import { Component } from "react";
import GlobalContext from "../../context/GlobalProvider";

class FontFamilyBox extends Component{
    constructor(props){
        super(props);
        this.fontFamilies=["auto","cursive","OpenDyslexic"];
        this.handleChange=this.handleChange.bind(this);
    }
    handleChange(e){
         const ff= e.target.value;
        this.context.set({fontFamily:ff});
    }

    render(){
        return <>
             <Select size="small" value={this.context.state.fontFamily} onChange={this.handleChange}>
                {
                    this.fontFamilies.map((l, k) => { return <MenuItem key={k} value={l}>{l}</MenuItem> })
                }
             </Select>
        </>
    }
}

FontFamilyBox.contextType=GlobalContext;

export default FontFamilyBox;