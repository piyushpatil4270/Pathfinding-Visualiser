import { Component } from "react";
import "./Node.css"
export default class Node extends Component{
    constructor(props){
        super(props)
        this.state={}
    }
    render(){

        const {
            col,
            isFinish,
            isStart,
            isWall,
            mouseisPressed,
            onMouseDown,
            onMouseEnter,
            onMouseUp,
            row,
            st,fin,
            setStart,
            setFinish
          } = this.props;
          const extraClassName = isFinish
          ? 'node-finish'
          : isStart
          ? 'node-start'
          : isWall
          ? 'node-wall'
          : '';
        
        return(
            <div   id={`node-${row}-${col}`} className={`node ${extraClassName}`} onMouseDown={ ()=>{
                if(isStart || isFinish) return
                else if(st || fin) return
                onMouseDown(row,col)
                }} onMouseEnter={()=>onMouseEnter(row,col)} onMouseUp={()=>onMouseUp()} 
                st={st}
                fin={fin}
                onClick={()=>{
                    st && setStart(row,col) || fin && setFinish(row,col)
                    
                }}
                >
                
            </div>
        )
    }
}