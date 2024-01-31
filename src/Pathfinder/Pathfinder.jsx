import { Component } from "react";
import Node from "./Node/Node";
import { dijkstra, getNodesInShortestPathOrder } from "../algorithms/djkstras";

export default class Pathfinder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [],
      mouseisPressed: false,
      startCol: 5,
      startRow: 10,
      finishCol: 40,
      finishRow: 10,
    };
  }

  getInitialGrid = (col, row) => {
    const grid = [];
    for (let row = 0; row < 20; row++) {
      const currentRow = [];
      for (let col = 0; col < 45; col++) {
        currentRow.push(this.createNode(row, col));
      }
      grid.push(currentRow);
    }
    return grid;
  };

  componentDidMount() {
    const grid = this.getInitialGrid();
    this.setState({ grid });
  }

  chooseStart = false;
  chooseFinish = false;

  createNode = (row, col) => {
    return {
      row,
      col,
      isStart: row === this.state.startRow && col === this.state.startCol,
      isFinish: row === this.state.finishRow && col === this.state.finishCol,
      distance: Infinity,
      isVisited: false,
      isWall: false,
      previousNode: null,
    };
  };
  getNewGridWithStart = (grid, row, col, startRow, startCol) => {
    /*const newGrid=grid.slice()
    const node=newGrid[startRow][startCol]
    const newNode={
     ...node,
     isStart:false
   
    }
    newGrid[startRow][startCol]=newNode
  
    const stNode=newGrid[row][col]
    const newFinNode={
      ...stNode,
      isStart:true
    }
    newGrid[row][col]=newFinNode
    return newGrid */
    this.startRow = row;
    this.startCol = col;
  };
  setStart(row, col) {
   const newGrid = getNewGridWithStart(
      this.state.grid,
      row,
      col,
      this.state.startRow,
      this.state.startCol
    );
    this.setState({ grid:newGrid , mouseisPressed: false,startRow:row,startCol:col,finishRow:this.state.finishRow,finishCol:this.state.finishCol });
    this.chooseStart = !this.chooseStart;
  }

  setFinish(row, col) {
    const newGrid = getNewGridWithFinish(
      this.state.grid,
      row,
      col,
      this.state.finishRow,
      this.state.finishCol
    );
    this.setState({ grid:newGrid , mouseisPressed: false,startRow:this.state.startRow,startCol:this.state.startCol,finishRow:row,finishCol:col });
    this.chooseFinish = !this.chooseFinish;
  }
  handleMouseDown(row, col) {
    console.log("handle mouse down called");
    const newGrid = getNewGridWithWallToggeled(this.state.grid, row, col);
    this.setState({ grid: newGrid, mouseisPressed: true });
  }

  handleMouseEnter(row, col) {
    // console.log("handle mouse enter called")
    if (!this.state.mouseisPressed) return;
    const newGrid = getNewGridWithWallToggeled(this.state.grid, row, col);
    this.setState({ grid: newGrid });
  }
  handleMouseUp() {
    console.log("handle mouse up called");
    this.setState({ mouseisPressed: false });
  }

  animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
    console.log("function called");
    for (let i = 0; i < visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length - 1) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 7 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        // console.log("node",document.getElementById(`node-${node.row}-${node.col}`))
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-visited";
      }, 5 * i);
    }
  }
  animateShortestPath = (nodesInShortestPathOrder) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        console.log("shortest path calculating");
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-shortest-path";
        // console.log("node-path",document.getElementById(`node-${node.row}-${node.col}`))
      }, 50 * i);
    }
  };

  visualiseDijkstra() {
    console.log("function called");
    // get the current grid
    const { grid } = this.state;
    //console.log("grid",grid)
    const startNode = grid[this.state.startRow][this.state.startCol];
    const finishNode = grid[this.state.finishRow][this.state.finishCol];
    console.log("start",startNode)
    console.log("end",finishNode)
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    //console.log(visitedNodesInOrder);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  render() {
    const { grid } = this.state;
    //console.log(grid);
    return (
      <>
        <div className="flex justify-between gap-4">
          <button
            className="outline-1 bg-slate-500"
            onClick={() => {
              this.chooseStart = !this.chooseStart;
            }}
          >
            Choose Start Node
          </button>
          <button
            className="outline-1 bg-slate-500"
            onClick={() => {
              this.chooseFinish = !this.chooseFinish;
            }}
          >
            Choose Finish Node
          </button>
          <button
            onClick={() => this.visualiseDijkstra()}
            className="outline-1 bg-slate-500"
          >
            Find Path using Dijkstras
          </button>
        </div>

        <div className="w-[95%] mt-[50px] justify-center items-center">
          {grid.map((row, rowIdx) => (
            <div className="flex justify-center items-center" key={rowIdx}>
              {row.map((node, nodeIdx) => {
                const { row, col, isFinish, isStart, isWall } = node;
                return (
                  <Node
                    key={nodeIdx}
                    isStart={isStart}
                    isWall={isWall}
                    isFinish={isFinish}
                    row={row}
                    col={col}
                    mouseisPressed={this.state.mouseisPressed}
                    onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                    onMouseEnter={(row, col) => this.handleMouseEnter(row, col)}
                    setStart={() => {
                      this.setStart(row, col);
                    }}
                    setFinish={() => {
                      this.setFinish(row, col);
                    }}
                    st={this.chooseStart}
                    fin={this.chooseFinish}
                    onMouseUp={() => this.handleMouseUp(row, col)}
                  ></Node>
                );
              })}
            </div>
          ))}
        </div>
      </>
    );
  }
}

/*const getInitialGrid=(col,row)=>{
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
}*/

const getNewGridWithWallToggeled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

const getNewGridWithStart = (grid, row, col, startRow, startCol) => {
  const newGrid = grid.slice();
  const node = newGrid[startRow][startCol];
  const newNode = {
    ...node,
    isStart: false,
  };
  newGrid[startRow][startCol] = newNode;

  const stNode = newGrid[row][col];
  const newFinNode = {
    ...stNode,
    isStart: true,
  };
  newGrid[row][col] = newFinNode;
  return newGrid;
};

const getNewGridWithFinish = (grid, row, col, endRow, endCol) => {
  const newGrid = grid.slice();
  const node = newGrid[endRow][endCol];
  const newNode = {
    ...node,
    isFinish: false,
  };
  newGrid[endRow][endCol] = newNode;

  const finNode = newGrid[row][col];
  const newFinNode = {
    ...finNode,
    isFinish: true,
  };
  newGrid[row][col] = newFinNode;
  return newGrid;
};
