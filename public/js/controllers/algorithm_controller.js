
/**
 * frontier controller
 * Deals with the flood fill algorithm
 */

 //imports
import Visualiser from './visualiser_controller.js';
import PriorityQueue from '../models/priorityQueue.js';

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
    this.goal = "";
    this.delay = 0;
    this.path = [];
    this.path_delay = 0;
    this.current_cost = {};
    this.destination_points = board.checkpoints.show_all();
}

/**
 * @function dijikstra
 * is implementing Dijiskstra algorithm to find the optimal path
 * its uses uniform cost search method
 */
Algorithms.prototype.dijikstra = function(){
    console.log(this.board);      
    let checkpoints_pos = this.board.checkpoints.copy();
    //Run the algorithm until it finds all the checkpoint and reaches the goal
    while(!checkpoints_pos.isEmpty()){
        let frontier_queue = new PriorityQueue();  // using prirority queue
        this.previous_node[this.board.start] = ""; // start node doesnt have any previous node it came from
        
        frontier_queue.enqueue(this.board.start,0) // adding a start point for the frontier to run
        let current_node = ""; // frontier of the node that needs to be determined
        this.current_cost = {};
        this.current_cost[this.board.start] = 0;        
        this.goal = checkpoints_pos.dequeue().element;
        
        // when frontier has covered all the cell in the this.board or early
        // exit implemented when the frontier finds the destination 
        // point on the this.board
        while (!(frontier_queue.length == 0)) {
            current_node = frontier_queue.dequeue().element;
            console.log("current node:", current_node);
            //breaks when meets the goal
            if (current_node == this.goal) {
                break;
            }
            this.board.getNeighbours(current_node).forEach(next_node => {
                let new_cost = this.current_cost[current_node] + this.board.nodes[next_node].weight; // new cost after adding the weight of the node           
                if (!(next_node in this.current_cost) || new_cost < this.current_cost[next_node]) {
                    this.current_cost[next_node] = new_cost;
                    let priority = new_cost
                    console.log("next-node is: ", next_node);
                    this.previous_node_stack.push(next_node);
                    this.previous_node[next_node] = current_node;
                    frontier_queue.enqueue(next_node, priority);
                    console.log("current node neighbouts: ", next_node);
                }
            });
            console.log("cost so far: ", this.current_cost);
            console.log("frontier has: ", frontier_queue);
        }
        visualiser.visualise["dijikstra"].apply(this);
    }
    console.log("path is ", this.path)
}

/**
 * @function pathVis
 * add all the paths node address from start to point
 */
Algorithms.prototype.pathVis = function(){
    let checkpoints_path = this.board.checkpoints.copy();
    while(!checkpoints_path.isEmpty()){
        // make the starting point to be the checkpoint
        let next_node_path = "";
        let current_path_node = checkpoints_path.dequeue().element; // started with destination
        if (!checkpoints_path.isEmpty()){
            next_node_path = checkpoints_path.peek().element;
        }
        else{
            next_node_path = this.board.start;
        }
        //for showing path 
        while(current_path_node != next_node_path){
            this.path.push(current_path_node);
            current_path_node = this.previous_node[current_path_node]
        }
        this.path.push(next_node_path);
        this.path.reverse();
        console.log("path has:", this.path);
        visualiser.visualise["pathVis"].apply(this)
    }
}