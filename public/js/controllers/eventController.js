import Weight from '../models/weight.js';
import Checkpoint from '../models/checkpoint.js';
import Board from '../models/board.js';


//obstacles dict
const obstacles = {
    "wall":"wall",
    "start":"start",
    "destination":"destination",
    "weight":"weight",
    "checkpoint":"checkpoint",
}

//clear dict
const clear_items = {
    "Walls":"clear_walls",
    "Start":"clear_start",
    "Destination":"clear_destination",
    "Weight":"clear_weights",
    "Checkpoint":"clear_checkpoints",
}
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
            if(!obstacles[event.target.className]){
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
            if (is_drawing && !obstacles[event.target.className]){
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
            const start_el = document.getElementById("add_start")
            let is_adding_start = false;
            let start_point = "";
                         
            start_el.addEventListener("click", () => {
                is_adding_start = true;
                document.querySelectorAll(".unvisited").forEach((cell) => {
                    cell.addEventListener("mousemove", (event) => {
                        let visited = "";
                        if (is_adding_start && visited != event.target.className) {
                            visited = event.target.className;
                            console.log("hovering around cell: ", event.target.id)
                        }
                    });
                    cell.addEventListener("mousedown", (event) => {
                        // cannot add more than one start point and cell that has already got obstables
                        if (board.start === "" ) {
                            start_point = event.target.id;
                            board.start = start_point;
                            cell.setAttribute("class","start")
                            console.log("start point has been added: ", event.target.id);
                            //user is unable to click the button after the start point has been added
                            if(board.start !== ""){                                
                                start_el.setAttribute("class","dropdown-item disabled")
                            }
                        }
                        else {
                            console.log("start point cannnot be added")
                        }
                    });
                    cell.addEventListener("mouseup", () => {
                        is_adding_start = false;

                        // need to remove event listener here
                    });                    
                });                
            });
        },
        /**
         * @function destination
         * Add destination point in the grid
         */
        destination:function(board){
            const destination_el = document.getElementById("add_destination")
            let is_adding_destination = false;
            let destinaiton_point = "";

            destination_el.addEventListener("click", ()=>{                
                is_adding_destination = true;
                document.querySelectorAll(".unvisited").forEach((cell) => {
                    cell.addEventListener("mousemove", (event) => {
                        let visited = "";
                        if (is_adding_destination) {
                            visited = event.target.className;
                            if(visited != event.target.className)
                                console.log("hovering around cell: ", event.target.id)
                        }
                    });
                    cell.addEventListener("mousedown", (event) => {
                        // cannot add more than one destination point
                        if (board.destination === "") {
                            destinaiton_point = event.target.id;
                            board.destination = destinaiton_point;
                            cell.setAttribute("class","destination")
                            console.log("destination point has been added: ", event.target.id);
                            //user is unable to click the button after the destination point has been added
                            if(board.destination !== ""){                                
                                destination_el.setAttribute("class","dropdown-item disabled")
                            }
                        }
                        else {
                            console.log("destination point cannnot be added")
                        }
                    });
                    cell.addEventListener("mouseup", () => {
                        is_adding_destination = false;
                    });
                });                
            })
        },
        /**
         * @function weight
         * Add weight to the node selected by the user in real-time
         * creates a box where you can add the weights based on their priority level
         */
        weight:function(board){
            const weight_el = document.getElementById("add_weight");
            let is_adding_weight = false;
            let weight_points = {};
            let weight_point = ""; // stores object Node

            weight_el.addEventListener("click", () => {
                is_adding_weight = true;
                document.querySelectorAll(".unvisited").forEach((cell) => {
                    cell.addEventListener("mousemove", (event) => {
                        let visited = "";
                        if (is_adding_weight) {
                            visited = event.target.className;
                            if(visited != event.target.className)
                                console.log("hovering around cell: ", event.target.id)
                        }
                    });
                    cell.addEventListener("mousedown", (event) => {
                        // cannot add more than one weight point for now
                        if (Object.keys(board.weights).length == 0) {
                            weight_point = board.getNodes(event.target.id);
                            weight_points[event.target.id] = weight_point;
                            board.weights[event.target.id] = weight_point;
                            cell.setAttribute("class","weight")
                            console.log("weight point has been added: ", event.target.id);
                            //user is unable to click the button after the destination point has been added
                            if(Object.keys(weight_points).length > 0){                                
                                weight_el.setAttribute("class","dropdown-item disabled")
                            }
                        }
                        else {
                            console.log("weight point cannnot be added")
                        }
                    });
                    cell.addEventListener("mouseup", () => {
                        is_adding_weight = false;
                    });
                });       
                // console.log("this function adds weight in the cell")
                // //creates a new weight instance
                // let cost_of_weight = 5;
                // let node_address = "2:3";
                // let new_weight = new Weight(cost_of_weight, node_address);
                // console.log(new_weight);

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
            let is_adding_checkpoint = false;
            let checkpoint_points = {};
            let checkpoint_point = ""; // stores object Node

            checkpoint_el.addEventListener("click", () => {
                is_adding_checkpoint = true;
                document.querySelectorAll(".unvisited").forEach((cell) => {
                    cell.addEventListener("mousemove", (event) => {
                        let visited = "";
                        if (is_adding_checkpoint) {
                            visited = event.target.className;
                            if(visited != event.target.className)
                                console.log("hovering around cell: ", event.target.id);
                        }
                    });
                    cell.addEventListener("mousedown", (event) => {
                        // cannot add more than one checkpoint point for now
                        if (Object.keys(board.checkpoints).length == 0) {
                            checkpoint_point = board.getNodes(event.target.id);
                            checkpoint_points[event.target.id] = checkpoint_point;
                            board.checkpoints[event.target.id] = checkpoint_point;
                            cell.setAttribute("class","checkpoint")
                            console.log("checkpoint point has been added: ", event.target.id);
                            //user is unable to click the button after the checkpoint point has been added
                            if(Object.keys(checkpoint_points).length > 0){                                
                                checkpoint_el.setAttribute("class","dropdown-item disabled")
                            }                            
                        }
                        else {
                            console.log("checkpoint point cannnot be added")
                        }
                    });
                    cell.addEventListener("mouseup", () => {
                        is_adding_checkpoint = false;
                    });
                });
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
        /**
         * @function clear_start
         * clear the start point in the grid
         */  
        clear_start: function(board){
            //changing the class the cell from walls to unvisited
            document.querySelectorAll('.start').forEach((cell)=>{
                cell.setAttribute("class", "unvisited");
            });

            //changing the status of the node back to unvisited in the board object 
            board.getNodes(board.start).status = "unvisited";
            console.log("start", board.start);

            //emptying the start field in board
            board.start = "";

            //make add start point button clickable
            document.getElementById("add_start").setAttribute("class","dropdown-item");
            console.log("clear grid: ", board.grid);
            console.log(board.start);
        },
        /**
         * @function clear_destination
         * clear all the walls in the grid
         */  
        clear_destination: function(board){
            //changing the class the cell from walls to unvisited
            document.querySelectorAll('.destination').forEach((cell) => {
                cell.setAttribute("class", "unvisited");
            });

            //changing the status of the node back to unvisited in the board object 
            board.getNodes(board.destination).status = "unvisited";
            console.log("start", board.destination);

            //clearing the destination
            board.destination = "";

            //make add start point button clickable
            document.getElementById("add_destination").setAttribute("class","dropdown-item");

            console.log("clear grid: ", board.grid);
            console.log(board.walls)    
        },
        /**
         * @function clear_weights
         * clear all the walls in the grid
         */  
        clear_weights: function(board){
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
        /**
         * @function clear_checkpoints
         * clear all the walls in the grid
         */  
        clear_checkpoints: function(board){
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
export function clear_el(board){
    document.getElementById("clear_items").addEventListener("click",(event)=>{
        let value = event.target.text;
        if(value != "All"){          
            clear.options[clear_items[value]](board);
        }
        else{
            Object.entries(clear.options).forEach(([key,value])=>{
                value(board);
            });
        };
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