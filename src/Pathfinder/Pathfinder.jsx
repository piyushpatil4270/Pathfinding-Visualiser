import { Component } from "react";
import Node from "./Node/Node";
import {dijkstra, getNodesInShortestPathOrder} from "../algorithms/djkstras"

const startCol=5;
const startRow=10;
const finishCol=40;
const finishRow=10

export default class Pathfinder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [],
      mouseisPressed:false
    };
  }

  componentDidMount() {
    const grid=getInitialGrid()
    this.setState({grid})
  }
  handleMouseDown(row,col){
    console.log("handle mouse down called")
    const newGrid=getNewGridWithWallToggeled(this.state.grid,row,col)
    this.setState({grid:newGrid,mouseisPressed:true})
  }
  handleMouseEnter(row,col){
   // console.log("handle mouse enter called")
  if(!this.state.mouseisPressed) return;
  const newGrid=getNewGridWithWallToggeled(this.state.grid,row,col)
  this.setState({grid:newGrid})
  }  
  handleMouseUp(){
    console.log("handle mouse up called")
    this.setState({mouseisPressed:false})
  }

  animateDijkstra(visitedNodesInOrder,nodesInShortestPathOrder){
    console.log("function called")
  for(let i=0;i<visitedNodesInOrder.length;i++){
    if(i===visitedNodesInOrder.length){
     
      setTimeout(() => {
        this.animateShortestPath(nodesInShortestPathOrder)
      }, 10*i);
      return
    }
    setTimeout(() => {
      const node=visitedNodesInOrder[i];
     // console.log("node",document.getElementById(`node-${node.row}-${node.col}`))
      document.getElementById(`node-${node.row}-${node.col}`).className =
      'node node-visited';
    }, 10*i);
  }
  }
  animateShortestPath=(nodesInShortestPathOrder)=>{
    for(let i=0;i<nodesInShortestPathOrder.length;i++){
      setTimeout(() => {
        const node=nodesInShortestPathOrder[i]
        document.getElementById(`node-${node.row}-${node.col}`).className='node node-shortest-path';
        // console.log("node",document.getElementById(`node-${node.row}-${node.col}`))
      }, 50*i);
    }
  }


  visualiseDijkstra(){
    console.log("function called")
    // get the current grid
    const {grid}=this.state
    const startNode=grid[startRow][startCol]
    const finishNode=grid[finishRow][finishCol]
    const visitedNodesInOrder=dijkstra(grid,startNode,finishNode)
    console.log(visitedNodesInOrder)
    const nodesInShortestPathOrder=getNodesInShortestPathOrder(finishNode)
    this.animateDijkstra(visitedNodesInOrder,nodesInShortestPathOrder)
  }

  render() {
    const { grid } = this.state;
    //console.log(grid);
    return (
      <>
      <button onClick={()=>this.visualiseDijkstra()} className="outline-1 bg-slate-500">
        Find Path using Dijkstras
      </button>
      <div className="w-[95%] mt-[50px] justify-center items-center">
        {grid.map((row, rowIdx) => (
          <div className="flex justify-center items-center" key={rowIdx}>
            {row.map((node, nodeIdx) => {
               const {row, col, isFinish, isStart,isWall} = node;
              return <Node key={nodeIdx} isStart={isStart} isWall={isWall} isFinish={isFinish} row={row} col={col} mouseisPressed={this.state.mouseisPressed} onMouseDown={(row,col)=>this.handleMouseDown(row,col)} onMouseEnter={(row,col)=>this.handleMouseEnter(row,col)} onMouseUp={()=>this.handleMouseUp(row,col)}  ></Node>;
            })}
          </div>
        ))}
      </div>
      </>
    );
  }
}


const getInitialGrid=(col,row)=>{
  const grid=[]
  for(let row=0;row<20;row++){
    const currentRow=[];
    for(let col=0;col<45;col++){
      currentRow.push(createNode(row,col))
    }
    grid.push(currentRow)
  }
  return grid;
}

const createNode=(row,col)=>{
  return{
    row,
    col,
    isStart:row===startRow && col===startCol,
    isFinish:row===finishRow && col===finishCol,
    distance:Infinity,
    isVisited:false,
    isWall:false,
    previousNode:null

  }
}

const getNewGridWithWallToggeled=(grid,row,col)=>{
 const newGrid=grid.slice()
 const node=newGrid[row][col]
 const newNode={
  ...node,
  isWall:!node.isWall

 }
 newGrid[row][col]=newNode
 return newGrid
}