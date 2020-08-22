
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
export default function Algorithms(board) {
    this.allPath = new PriorityQueue();
    this.board = board;
    this.previous_node = {};
    this.previous_node_stack = [];
    this.goal = "";
    this.delay = 0;
    this.path = [];
    this.path_delay = 0;
    this.current_cost = {};
    this.visitpoint_previous_node = {}
    this.destination_points = board.checkpoints.show_all();
    this.colors = {
        0:{
            "start_color":"#2D00F7",
            "mid_color":"#A100F2",
            "last_color":"#F20089",
        },
        1:{
            "start_color":"#0466c8",
            "mid_color":"#0353a4",
            "last_color":"#001845",
        },
        2:{
            "start_color":"#da1e37",
            "mid_color":"#b21e35",
            "last_color":"#641220",
        },
        3:{
            "start_color":"#80ed99",
            "mid_color":"#38a3a5",
            "last_color":"#22577a",
        },
        4:{
            "start_color":"#91f291",
            "mid_color":"#61f2c2",
            "last_color":"#30f2f2",
        },
        5:{
            "start_color":"#d5aca9",
            "mid_color":"#b38d97",
            "last_color":"#424b54",
        },

    };
    this.colorPicked="";
}

/**
 * @function dijikstra
 * is implementing Dijiskstra algorithm to find the optimal path
 * its uses uniform cost search method
 */
Algorithms.prototype.dijikstra = function () {
    console.log(this.board);
    let checkpoints_pos = this.board.checkpoints.copy();
    let start = this.board.start;    
    this.colorPicked = this.colors[0];
    let path_counter = 1; // later use for revarsal of path for visualisation
    //Run the algorithm until it finds all the checkpoint and reaches the goal
    while (!checkpoints_pos.isEmpty()) {
        let frontier_queue = new PriorityQueue();  // using prirority queue
        this.previous_node[start] = ""; // start node doesnt have any previous node it came from

        frontier_queue.enqueue(start, 0) // adding a start point for the frontier to run
        let current_node = ""; // frontier of the node that needs to be determined
        //this.current_cost = {};
        this.current_cost = {};
        this.current_cost[start] = 0;
        this.goal = checkpoints_pos.dequeue();
        //let goal_path = {};
        // when frontier has covered all the cell in the this.board or early
        // exit implemented when the frontier finds the destination 
        // point on the this.board
        while (!(frontier_queue.length == 0)) {
            current_node = frontier_queue.dequeue().element;
            console.log("current node:", current_node);
            //breaks when meets the goal
            if (current_node == this.goal.element) {
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
        this.visitpoint_previous_node[this.goal.element] = JSON.parse(JSON.stringify(this.previous_node))
        this.delay = visualiser.visualise["dijikstra"](this.current_cost, this.colorPicked, this.delay); //for algorithm visualisation  
        start = this.goal.element;  
        //adding each destinations path to a priority queue
        this.allPath.enqueue(start, path_counter)
        this.colorPicked = this.colors[this.goal.priority]; // choose color scheme for the animation based on their checkpoint priority number          
        
        path_counter++;   // subtracting the counter each iteration
        if(start == this.board.destination){
            break;
        }
        
    }
    console.log(this.visitpoint_previous_node)
    console.log("all the paths are : ", this.allPath)
}

/**
 * @function pathVis
 * add all the paths node address from start to point
 */
Algorithms.prototype.pathVis = function () {
    let destination_point = "";
    let previous_destination = "";
    let checkpoint_path = "";
    while (!this.allPath.isEmpty()) {
        // make the starting point to be the checkpoint
        let current_path_node = this.allPath.dequeue(); // started with destination
        checkpoint_path = this.visitpoint_previous_node[current_path_node.element][current_path_node.element]
        if (current_path_node.priority == 1){
           destination_point = this.board.start;
        }
        else{
            destination_point = previous_destination
        }
        this.path.push(current_path_node.element);
        //for showing path 
        while (checkpoint_path != destination_point) {
            this.path.push(checkpoint_path);
            checkpoint_path = this.visitpoint_previous_node[current_path_node.element][checkpoint_path]
        }

        this.path.push(destination_point);
        this.path.reverse();
        console.log("path has:", this.path);  
        visualiser.visualise["pathVis"].apply(this)          
        previous_destination = current_path_node.element;
        this.path = [] 
    }
    
}
