import { Component } from "react";
import "./index.css";
import GlobalContext from "../../context/GlobalProvider";

class ColorBox extends Component{
    constructor(props){
        super(props);
        this.setColor=this.setColor.bind(this);
    }

    setColor(c){
     this.context.set({color:c})   
     //console.log("Event", c);
    }
    render(){
        const selectedColor= this.context.state.color;
        return <>
            <div >
                <button onClick={()=>this.setColor('red')}  className={"circle red"+ (selectedColor=='red'?" selected":'')}></button>
                <button onClick={()=>this.setColor('green')}  className={"circle green"+ (selectedColor=='green'?" selected":'')}></button>
                <button onClick={()=>this.setColor('blue')}   className={"circle blue"+ (selectedColor=='blue'?" selected":'')}></button>
            </div>
        </>
    }
}
ColorBox.contextType=GlobalContext;

export default ColorBox;