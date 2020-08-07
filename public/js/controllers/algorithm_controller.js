
/**
 * frontier controller
 * Deals with the flood fill algorithm
 */

 //imports
import Visualiser from './visualiser_controller.js';

//visualiser object for animation
let visualiser = new Visualiser();

/**
 * @@constructor algorithm
 * Uses flood fill algorithm
 */
export default function Algorithms(board){
    this.board = board;
    this.previous_node = {};
    this.previous_node_stack = [];
    this.goal = board.destination;
    this.delay = 0;
    this.path = [];
    this.path_delay = 0;
}

/**
 * @function frontier
 * is implementing flood-fill algorithm to find the destination
 */
Algorithms.prototype.frontier = function(){
    console.log(this.board);
    let frontier_queue = [];  // queue implementation by using array
    this.previous_node[this.board.start] = ""; // start node doesnt have any previous node it came from
    let goal = this.board.destination;
    frontier_queue.push(this.board.start) // adding a start point for the frontier to run
    let current_node = ""; // frontier of the node that needs to be determined
    
    // when frontier has covered all the cell in the this.board or early
    // exit implemented when the frontier finds the destination 
    // point on the this.board   
    while (!(frontier_queue.length == 0) && !(frontier_queue.includes(goal))) {
        current_node = frontier_queue.shift();
        console.log("current node:", current_node);
        this.board.getNeighbours(current_node).forEach(next_node => {
            if (!(next_node in this.previous_node)) {
                console.log("next-node is: ", next_node);                          
                this.previous_node_stack.push(next_node);
                this.previous_node[next_node] = current_node;
                frontier_queue.push(next_node);
                console.log("current node neighbouts: ", next_node);
            }              
        });        
        console.log("frontier has: ", frontier_queue);
    }
}
/**
 * @function dijikstra
 */
Algorithms.prototype.dijikstra = function(){
    console.log("Hey u listened me ayee");
}

/**
 * @function pathVis
 * add all the paths node address from start to point
 */
Algorithms.prototype.pathVis = function(){    
    let current_path_node = this.board.destination; // started with destination
    //for showing path 
    while(current_path_node != this.board.start){
        this.path.push(current_path_node);
        current_path_node = this.previous_node[current_path_node]
    }
    this.path.push(this.board.start);
    this.path.reverse();
    console.log("path has:", this.path);
}