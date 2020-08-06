
/**
 * frontier controller
 * Deals with the flood fill algorithm
 */


/**
 * @function frontier
 * Uses flood fill algorithm
 */
export function frontier(board){
    console.log(board);
    let frontier_queue =[];  // queue implementation by using array  
    let previous_node = {};
    previous_node[board.start] = "";
    let goal = board.destination;
    frontier_queue.push(board.start)
    let current_node = "";
    while (!(frontier_queue.length == 0) && (current_node != goal)){        
        current_node = frontier_queue.shift();
        console.log("current node:", current_node);
        board.getNeighbours(current_node).forEach(next_node=>{            
            if (!(next_node in previous_node)){
                previous_node[next_node] = current_node;
                frontier_queue.push(next_node);
                console.log("current node neighbouts: ", next_node);
            }            
        })
        console.log("frontier has: ", frontier_queue);
    }

}
