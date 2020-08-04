import weight from '../models/weight.js'
import checkpoint from '../models/checkpoint.js'
import Weight from '../models/weight.js';
import Checkpoint from '../models/checkpoint.js';
/**
 * @function draw
 * create a wall in the grid
 * changes the class name of the cell with unvisited and the status of the node
 * to wall after clicked
 * @param node_id
 * cell address in the table
 */
export function draw(node_id){
    //create a new event for the draw


    // adding a event listener for draw 
    const draw_el = document.getElementById("draw");
    draw_el.addEventListener("click", ()=>{
        //clicked node
        let node_cl = clicked_address();
        console.log(node_cl);
    });
};

/**
 * @function add
 * lets the user add the weights and checkpoints in the grid
 */
export const add = {
    options: {
        /**
         * @function weight
         * Add weight to the node selected by the user in real-time
         * creates a box where you can add the weights based on their priority level
         */
        weight:function(){
            const weight_el = document.getElementById("add_weight");
            weight_el.addEventListener("click", () => {
                console.log("this function adds weight in the cell")
                //creates a new weight instance
                let cost_of_weight = 5;
                let node_address = "2:3";
                let new_weight = new Weight(cost_of_weight, node_address);
                console.log(new_weight);

                //trigger a new event after clicked on the add weight button
                /* Add code here */
            });
        },
        /**
         * @function checkpoint
         * Add checkpoint to the node selected by the user in real-time
         * creates a window box where you can add the checkpoints based on their priority level
         */
        checkpoint:function(){
            const checkpoint_el = document.getElementById("add_checkpoint");
            checkpoint_el.addEventListener("click", () => {
                console.log("this function adds checkpoint in the cell")

                let node_address = "2:3";
                //trigger a new event after clicked on the add checkpoint button
                /* Add code here */

                //creates a new checkpoint instance
                let new_checkpoint = new Checkpoint(node_address);
                console.log(new_checkpoint)
            });
        },
    },
};

/**
 * @function stop
 * stops the running algorithm when clicked on the stop button
 */
export const stop = () => { 
    let stop_el = document.getElementById("stop");
    stop_el.addEventListener("click",()=>{
        console.log("stop");
    });
};

/**
 * @function clear
 * clears all the wall, weights and checkpoint created by the user
 */
export const clear = () => {
    let clear_el = document.getElementById("clear");
    clear_el.addEventListener("click", () => {
        console.log("clear");
    });
};

/**
 * @function pathfinding
 * select the pathfinding algorithm
 */
export const algorithm = () => {
    let algorithm_el = document.getElementById('algorithm_list');
    algorithm_el.addEventListener("click",(event)=>{     
        let name = event.target.text; //getting the choosen algorithm by the user
        let algoName = document.getElementById("algorithm_name"); // dom of the button name that needs to be changed with the picked algorithm
        // doesnt change if its the same algorithm and the name is empty
        if(algoName.innerHTML != name && name){
            algoName.innerHTML = name; // replacing the name with the new picked name
            console.log(name);
            algoName.removeAttribute("disabled"); //enabling user to click the button when algorithm is picked
        }        
    });
};

/**
 * @function run
 * runs the algorithm selected by the user
 */
export function run(){
    const run_el = document.getElementById("run");
    run_el.addEventListener("click", ()=>{
        console.log("running....");
    });
};

/**
 * @function clicked_address
 * gets the address of the cell addresss in the table that has been clicked
 */
export function clicked_address(){
    document.querySelectorAll('.unvisited').forEach(cell=>{
        cell.addEventListener("click", event => {
            console.log("cell-address: ", event.target.id);
            return event.target.id;
        });
    });
};