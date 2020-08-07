
/**
 * frontier controller
 * Deals with the flood fill algorithm
 */

 //imports
import Visualiser from '../controllers/visualiser_controller.js';

//visualiser object for animation
let visualiser = new Visualiser();

/**
 * @function frontier
 * Uses flood fill algorithm
 */
export function frontier(board){

    let height = board.height;
    let width = board.width;
    console.log(board);
    let frontier_queue = [];  // queue implementation by using array  
    let previous_node = {};
    previous_node[board.start] = "";
    let goal = board.destination;
    frontier_queue.push(board.start)
    let current_node = "";
    let delay = 0;
    while (!(frontier_queue.length == 0) && !(frontier_queue.includes(goal))) {
        current_node = frontier_queue.shift();
        console.log("current node:", current_node);
        board.getNeighbours(current_node).forEach(next_node => {
            if (!(next_node in previous_node)) {
                console.log("next-node is: ", next_node);
                //animation for the frontier
                document.getElementById(next_node).animate([
                        //keyframes
                        {
                            opacity:0.1,
                            backgroundColor:"#2D00F7",
                        },
                        {
                            opacity:0.4,
                            backgroundColor:"#A100F2",
                        },
                        {
                            backgroundColor:"#F20089",
                            opacity:1,
                        }
                    ],
                    {
                        //timing options
                        duration:2500,
                        delay:delay,
                        fill:"forwards",
                    }
                )
                previous_node[next_node] = current_node;
                frontier_queue.push(next_node);
                console.log("current node neighbouts: ", next_node);
            }              
        });
        delay += 10; // delay for each animation to get generated after getting current node and its neighbour
        console.log("frontier has: ", frontier_queue);
    }    
}
