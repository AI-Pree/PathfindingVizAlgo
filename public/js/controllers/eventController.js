import Weight from '../models/weight.js';
import Checkpoint from '../models/checkpoint.js';
import Board from '../models/board.js';
/**
 * @function draw
 * create a wall in the grid
 * changes the class name of the cell with unvisited and the status of the node
 * to wall after clicked
 * @param node_id
 * cell address in the table
 * @returns wall_nodes
 * it the address of all the node that has wall as a status
 */
export function drawWall(board){    
    let is_drawing = false; //check if the user still in drawing mode
    document.querySelectorAll('.unvisited').forEach((cell)=>{
        //when user clicked the mouse
        cell.addEventListener("mousedown", (event) => {
            //when visited the same wall node it doesnt need to set class as wall  
            if(event.target.className != "wall"){
                console.log("cell-address: ", event.target.id);
                let wall_node = board.getNodes(event.target.id);
                wall_node.status = "wall";
                board.walls.push(wall_node);
                cell.setAttribute("class", "wall");
            }  
            is_drawing = true;
        });
        //when user is moving the mouse in clicked position
        cell.addEventListener("mousemove", (event) =>{
            //when visited the same wall node it doesnt need to set class as wall  
            if (is_drawing && event.target.className != "wall"){
                console.log("cell-address: ", event.target.id);
                let wall_node = board.getNodes(event.target.id);
                wall_node.status = "wall";
                board.walls.push(wall_node);
                cell.setAttribute("class", "wall");
            }
        });
        //when user released the mouse click
        cell.addEventListener("mouseup", ()=>{
            is_drawing = false;
        });
    });
};

/**
 * @function add
 * lets the user add the weights and checkpoints in the grid
 */
export const add = {
    options: {
        /**@function start
         * Add start point in the grid
         */
        start:function(board){
            const start_el = document.getElementById("start")
            start_el.addEventListener("click",()=>{
                console.log("start");
            })
        },
        /**
         * @function destination
         * Add destination point in the grid
         */
        destination:function(board){
            const destination_el = document.getElementById("destination")
            destination_el.addEventListener("click", ()=>{
                console.log("destination")
            })
        },
        /**
         * @function weight
         * Add weight to the node selected by the user in real-time
         * creates a box where you can add the weights based on their priority level
         */
        weight:function(board){
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
        checkpoint:function(board){
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
 * @function run
 * runs the algorithm selected by the user
 */
export function run(board){
    const run_el = document.getElementById("run");    
    run_el.addEventListener("click", ()=>{
        board.run = true;
        board.stop = false;
        board.status = false;
        console.log("run: ",board.run);
        console.log("stop: ",board.stop);
        console.log("running....");
        // pass new upgraded grid after the run button is clicked
        console.log("Added info grid: ", board.grid);
        console.log("The wall node is:", board.walls)
    });
};

/**
 * @function stop
 * stops the running algorithm when clicked on the stop button
 */
export const stop = (board) => { 
    let stop_el = document.getElementById("stop");
    stop_el.addEventListener("click",()=>{
        board.stop = true;
        board.run = false;
        board.status = true;
        console.log("run: ",board.run);
        console.log("stop: ",board.stop);
    });
};

/**
 * @function clear
 * Main clear implementation function
 */
const clear={
    options:{
        /**
         * @function clear_walls
         * clear all the walls in the grid
         */  
        clear_walls: function(board){
            //changing the class the cell from walls to unvisited
            document.querySelectorAll('.wall').forEach((cell) => {
                cell.setAttribute("class", "unvisited");
            });
            //changing the status of the node back to unvisited in the board object        
            board.walls.forEach((cell) => {
                cell.status = "unvisited";
            })
            //clearing all the walls
            board.walls = [];
            console.log("clear grid: ", board.grid);
            console.log(board.walls)    
        },

    }     
}

/**
 * @function clear_el
 * clear event listener all the wall, weights and checkpoint created by the user
 */
export const clear_el = {
    options:{
        /**
         * @function clear_walls
         * clear all the walls in the grid when clicked on walls button
         */  
        clear_walls: function(board){
            document.getElementById("clear_walls").addEventListener("click",()=>{
                clear.options.clear_walls(board);
            });      
        },    
        /**
         * @function clear_all
         * clear all the added element in the grid when clicked on all button
         */
        clear_all:function(board){
            document.getElementById("clear_all").addEventListener("click", () => {
                clear.options.clear_walls(board);
            });
        }

    }        
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