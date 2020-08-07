
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
export default function AlgorithmVis(board){
    this.board = board;
}

AlgorithmVis.prototype.frontier = function(){
    console.log(this.board);
    let frontier_queue = [];  // queue implementation by using array  
    let previous_node = {};
    previous_node[this.board.start] = "";
    let goal = this.board.destination;
    frontier_queue.push(this.board.start)
    let current_node = "";
    let delay = 0;
    let path = []
    let current_node_path = goal;
    // when frontier has covered all the cell in the this.board or early
    // exit implemented when the frontier finds the destination 
    // point on the this.board   
    while (!(frontier_queue.length == 0) && !(frontier_queue.includes(goal))) {
        current_node = frontier_queue.shift();
        console.log("current node:", current_node);
        this.board.getNeighbours(current_node).forEach(next_node => {
            if (!(next_node in previous_node)) {
                console.log("next-node is: ", next_node);
                //animation for the frontier
                if(next_node != goal){
                    document.getElementById(next_node).animate([
                        //keyframes
                        {
                            opacity: 0.1,
                            backgroundColor: "#2D00F7",
                        },
                        {
                            opacity: 0.4,
                            backgroundColor: "#A100F2",
                            
                        },
                        {
                            backgroundColor: "#F20089",
                            opacity: 1,
                        }
                    ],
                    {
                        //timing options
                        duration: 2000,
                        delay: delay,
                        fill: "forwards",
                    });
                }             
                previous_node[next_node] = current_node;
                frontier_queue.push(next_node);
                console.log("current node neighbouts: ", next_node);
            }              
        });
        delay += 10; // delay for each animation to get generated after getting current node and its neighbour
        console.log("frontier has: ", frontier_queue);
    }

    //for showing poth 
    while(current_node_path != this.board.start){
        path.push(current_node_path);
        current_node_path = previous_node[current_node_path]
    }
    path.push(this.board.start);
    path.reverse();
    let path_delay = 0;
    path.forEach(cell=>{        
        console.log(cell)
        document.getElementById(cell).animate([
            //keyframes
            {
                opacity: 0,
                backgroundColor: "#2D00F7",
            },
            {
                opacity: 1,
                easing:"linear",
                backgroundColor: "#A100F2",
                
            },            
        ],
        {
            //timing options
            duration: 500,
            delay: delay + path_delay,
            fill: "forwards",
        });
        
        /*uncomment if want to show start and destination point */
        // if(!(cell == this.board.start || cell == goal)){
            
        // }        
        path_delay += 50;
    })
}

AlgorithmVis.prototype.dijikstra = function(){
    console.log("Hey u listened me ayee");
}