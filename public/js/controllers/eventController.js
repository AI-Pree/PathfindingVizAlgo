import weight from 'models/weight.js'
import checkpoint from 'models/checkpoint.js'
/**
 * @function draw
 *  create a wall in the grid
 * @param node_id
 *  cell address in the table
 * 
 */
export function draw(node_id){
    //create a new event for the draw


    // adding a event listener for draw 
    const draw_el = document.getElementById("draw");
    draw_el.addEventListener("click", ()=>{
        console.log("draw");
    })
}

/**
 * @function add
 * lets the user add the weights and checkpoints in the grid
 */
export var add = {
    options: {
        /**
         * @function weight
         * Add weight to the node selected by the user in real-time
         * creates a box where you can add the weights based on their priority level
         */
        weight:function(){
            let weight_el = document.getElementById("add_weight");
            weight_el.addEventListener("click", () => {
                console.log("this function add weight in the cell");
            });
        },
        /**
         * @function checkpoint
         * Add checkpoint to the node selected by the user in real-time
         * creates a window box where you can add the checkpoints based on their priority level
         */
        checkpoint:function(){
            let weight_el = document.getElementById("add_checkpoint");
            weight_el.addEventListener("click", () => {
                console.log("this function adds checkpoint in the cell")
            });
        }
    }
}

/**
 * @function run
 * runs the algorithm selected by the user
 */
export function run(){
    const run_el = document.getElementById("run");
    run_el.addEventListener("click", ()=>{
        console.log("run")
    })
}

/**
 * @function stop
 * stops the running algorithm when clicked on the stop button
 */
export var stop = () => { 
    let stop_el = document.getElementById("stop");
    stop_el.addEventListener("click",()=>{
        console.log("stop")
    })
}

/**
 * @function clear
 * clears all the wall, weights and checkpoint created by the user
 */
export var clear = () => {
    let clear_el = document.getElementById("clear");
    clear_el.addEventListener("click", () => {
        console.log("clear")
    })
}