
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
    console.log(board);
    let frontier_queue = [];  // queue implementation by using array  
    let previous_node = {};
    previous_node[board.start] = "";
    let goal = board.destination;
    frontier_queue.push(board.start)
    let current_node = "";
    let delay = 0;
    let path = []
    let current_node_path = goal;
    // when frontier has covered all the cell in the board or early
    // exit implemented when the frontier finds the destination 
    // point on the board   
    while (!(frontier_queue.length == 0) && !(frontier_queue.includes(goal))) {
        current_node = frontier_queue.shift();
        console.log("current node:", current_node);
        board.getNeighbours(current_node).forEach(next_node => {
            if (!(next_node in previous_node)) {
                console.log("next-node is: ", next_node);
                //animation for the frontier
                if(next_node != goal){
                    document.getElementById(next_node).animate([
                        //keyframes
                        {
                            opacity: 0.1,
                            backgroundColor: "#404788FF",
                        },
                        {
                            opacity: 0.3,
                            backgroundColor: "#238A8DFF",
                        },
                        {
                            opacity: 0.6,
                            backgroundColor: "#55C667FF",
                            
                        },
                        {
                            backgroundColor: "#FDE725FF",
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
    while(current_node_path != board.start){
        path.push(current_node_path);
        current_node_path = previous_node[current_node_path]
    }
    path.push(board.start);
    path.reverse();
    let path_delay = 0;
    path.forEach(cell=>{
        
        console.log(cell)
        document.getElementById(cell).animate([
            //keyframes
            {
                opacity: 0,
                backgroundColor: "#2D00F7",
                height:"0px",
                width:"0px",
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
        path_delay += 50;
    })
}
