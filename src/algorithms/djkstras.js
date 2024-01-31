export function dijkstra(grid,startNode,finishNode){
 // visited nodes array
 const visitedNodesInOrder=[];
 // startnode distance set to 0
 startNode.distance=0;
 // all nodes will be set as unvisited
 const unvisitedNodes=getAllNodes(grid)
 console.log("unvi",unvisitedNodes.length)
 // until unvisited nodes length becomes 0
 while(unvisitedNodes.length>0){
    console.log("log1")
    // nodes will be sorted according to their distance
    sortNodesByDistance(unvisitedNodes)
 
    //console.log("unvisited nodes",unvisitedNodes)
    // closest node will be the first element of the unvisited nodes
    const closestNode=unvisitedNodes.shift()
    if(closestNode.isWall) continue
   // if(closestNode.distance===Infinity) return visitedNodesInOrder
    console.log("entered loop")
    // mark the closest node as visited
    closestNode.isVisited=true
    // add the closestnode to the visitedNode array
    visitedNodesInOrder.push(closestNode)
    
   // console.log("vi-order",visitedNodesInOrder)
    // if it reaches the finishing node return all visited nodes in order
    if(closestNode===finishNode){
    console.log("vi-order",visitedNodesInOrder)
    return visitedNodesInOrder
    console.log("finished")
    } 
    updateUnvisitedNeighbors(closestNode,grid)
 }

}

export function sortNodesByDistance(unvisitedNodes){
    //this function sorts the nodes by their distance
    unvisitedNodes.sort((nodeA,nodeB)=>nodeA.distance-nodeB.distance)
}

export function updateUnvisitedNeighbors(node,grid){
    // get the unvisited neighbors of the current node
    const unvisitedNeighbors=getUnvisitedNeighbors(node,grid)
    for(const neighbor of unvisitedNeighbors){
        // add the distance of the neighbor such that is is 1 unit greater than the currentNode 
        neighbor.distance=node.distance+1;
        // sets the previous node of the neighbor to the currentNode 
        neighbor.previousNode=node
    }
}

export function getUnvisitedNeighbors(node,grid){
    // initialize the empty neighbors array
    const neighbors=[]
    const {col,row}=node
    //add the nodes around the current node to the neighbors array
    if(row>0) neighbors.push(grid[row-1][col])
    if(row<grid.length-1) neighbors.push(grid[row+1][col])
    if(col>0) neighbors.push(grid[row][col-1])
    if(col<grid[0].length-1) neighbors.push(grid[row][col+1])
    // this will return all unvisited neighbors 
    return neighbors.filter((neighbor)=>!neighbor.isVisited)
}

export function getAllNodes(grid){
    // this function returns all the nodes 
    const nodes=[]
    for(const row of grid){
        for(const node of row){
            nodes.push(node)
        }
    }
    return nodes
}

export function getNodesInShortestPathOrder(finishNode){
    const NodesInShortestPathOrder=[]
    let currentNode=finishNode
    while(currentNode !== null){
        NodesInShortestPathOrder.unshift(currentNode)
        currentNode=currentNode.previousNode
    }
    return NodesInShortestPathOrder
}
