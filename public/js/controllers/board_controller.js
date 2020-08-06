/**
 * board controller
 * This controller handles all the event for the board in the views
 */

//imports 
import Visualiser from '../controllers/visualiser_controller.js';

//visualiser object for animation
let visualiser = new Visualiser();

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

//mode at which board is running
const mode = {
    is_drawing:{'0':false,'1':"black"},  //check if the user still in drawing mode
    is_adding_start:{'0':false,'1':"green"},
    is_adding_weight:{'0':false,'1':"orange"},
    is_adding_checkpoint:{'0':false,'1':"yellow"},
    is_adding_destination:{'0':false,'1': "red"},
}

/**
 * @function draw
 * create a wall in the grid
 * create a start point in the grid
 * create a end point in the grid
 * create a weight point in the grid
 * create a checkpoint point in the grid
 * changes the class name of the cell with unvisited and the status of the node
 * to wall, start, destination, weight and checkpoint after clicked
 * @param board
 * new board instance created in main 
 */
export function draw(board){
    let cellHTML = document.querySelectorAll('.unvisited'); // DOM elements of the element that has classs unviisted
    let start_el= document.getElementById("add_start"); // DOM element of the start button
    let destination_el= document.getElementById("add_destination"); // DOM element of the destination button
    let weight_el= document.getElementById("add_weight"); // DOM element of the weight button
    let checkpoint_el= document.getElementById("add_checkpoint"); // DOM element of the checkpoint button
    let cell_pressed = ""; // address of the cell that has been clicked
    let weight_points = {}; // all the address of the node that has weights
    let checkpoint_points = {}; // all the address of the node that has checkpoints

    //when user clicks the add_start button
    start_el.addEventListener("click", () => {
        mode["is_adding_start"]['0'] = true;              
    });

    //when user clicks the add_destination button
    destination_el.addEventListener("click", () => {
        mode["is_adding_destination"]['0'] = true;            
    });

    //when user clicks the add_weights button
    weight_el.addEventListener("click", () => {
        mode["is_adding_weight"]['0'] = true;            
    });

    //when user clicks the add_checkpoints button
    checkpoint_el.addEventListener("click", () => {
        mode["is_adding_checkpoint"]['0'] = true;            
    });

    //when user hovers around the cell
    cellHTML.forEach((cell) => {
        cell.addEventListener("mouseover", (event) =>{
            if(!obstacles[event.target.className] && !(mode["is_adding_start"]['0'] || mode["is_adding_destination"]['0'] || mode["is_adding_weight"]['0'] || mode["is_adding_checkpoint"]['0'])){
                cell.style.backgroundColor = "#000";
                cell.style.opacity = 0.3;
            }
            if(!obstacles[event.target.className]){
                Object.entries(mode).forEach(([key,value])=>{
                    if(value['0'] && key != "is_drawing"){
                        visualiser.items_transition(cell,{backgroundColor:value['1'],transitionDuration:"2s",opacity:0.3}); // colors of the added node types
                    }                
                });
            }                
        });
        cell.addEventListener("mouseout", (event) =>{            
            visualiser.items_transition(cell, {});
        });

        //when user clicked the mouse
        cell.addEventListener("mousedown", (event) => {     
            //adding pressed nodes
            cell_pressed = board.getNodes(event.target.id);
            board.pressedCell[event.target.id] = cell_pressed;

            //when visited the same wall node it doesnt need to set class as wall  
            if(!obstacles[event.target.className] && !(mode["is_adding_start"]['0'] || mode["is_adding_destination"]['0'] || mode["is_adding_weight"]['0'] || mode["is_adding_checkpoint"]['0'])){   
                console.log("cell-address: ", event.target.id);
                cell_pressed.status = "wall";
                board.walls.push(cell_pressed);
                cell.setAttribute("class", "wall");
                //changing the cell color to black
                visualiser.items_transition(cell,{backgroundColor:"#000",transitionDuration:"2s",opacity:0.3});                  
            }  

            // adding start point in the board
            if(mode["is_adding_start"]['0']){                
                // cannot add more than one start point and cell that has already got obstables
                if (board.start === "" && !obstacles[event.target.className]) {
                    let start_point = event.target.id;
                    board.start = start_point;
                    cell_pressed.status = "start";
                    cell_pressed.pressedMode = "moveable";
                    cell.setAttribute("class", "start")
                    console.log("start point has been added: ", event.target.id);
                    //user is unable to click the button after the start point has been added
                    if (board.start !== "") {
                        start_el.setAttribute("class", "dropdown-item disabled")
                    }
                    //changing the cell color to green
                    visualiser.items_transition(cell, {backgroundColor:"green",transitionDuration:"2s"});
                }
                else {
                    console.log("start point cannnot be added")
                }
            }

            //adding destination in the board
            if(mode["is_adding_destination"]['0']){                              
                // cannot add more than one destination point
                if (board.destination === "" && !obstacles[event.target.className]) {
                    let destinaiton_point = event.target.id;
                    cell_pressed.pressedMode = "moveable";
                    cell_pressed.status = "destination";
                    board.destination = destinaiton_point;
                    cell.setAttribute("class", "destination")
                    console.log("destination point has been added: ", event.target.id);
                    //user is unable to click the button after the destination point has been added
                    if (board.destination !== "") {
                        destination_el.setAttribute("class", "dropdown-item disabled")
                    }
                    //changing the cell color to red
                    visualiser.items_transition(cell, {backgroundColor:"red",transitionDuration:"2s"});
                }
                else {
                    console.log("destination point cannnot be added")
                }
            }
            
            //adding weights in the board
            if (mode["is_adding_weight"]['0']){
                if(!obstacles[event.target.className]){
                    cell_pressed.weight += 10;
                    cell_pressed.status = "weight";
                    weight_points[event.target.id] = cell_pressed;
                    board.weights[event.target.id] = cell_pressed;
                    cell.setAttribute("class", "weight")
                    console.log("weight point has been added: ", event.target.id);
                    
                    //changing the cell color to orange
                    visualiser.items_transition(cell, {backgroundColor:"orange",transitionDuration:"2s"});                  
                }
                else{
                    console.log("weight point cannnot be added")
                }                
            }

            //adding checkpoints in the board
            if(mode["is_adding_checkpoint"]['0']){
                if (!obstacles[event.target.className]) {   
                    cell_pressed.status = "checkpoint";                
                    checkpoint_points[event.target.id] = cell_pressed;
                    board.checkpoints[event.target.id] = cell_pressed;
                    cell_pressed.pressedMode = "moveable";
                    cell.setAttribute("class", "checkpoint")
                    console.log("checkpoint point has been added: ", event.target.id);

                    //changing the cell color to yellow
                    visualiser.items_transition(cell, {backgroundColor:"yellow",transitionDuration:"2s"});
                }
                else {
                    console.log("checkpoint point cannnot be added")
                }
            }

            mode["is_drawing"]["0"] = true;
        });

        //when user is moving the mouse in clicked position
        cell.addEventListener("mousemove", (event) =>{
            cell_pressed = board.getNodes(event.target.id);
            board.pressedCell[event.target.id] = cell_pressed;
            //when visited the same wall node it doesnt need to set class as wall  
            if (mode["is_drawing"]['0'] && !obstacles[event.target.className] && !(mode["is_adding_start"]['0'] || mode["is_adding_destination"]['0'] || mode["is_adding_weight"]['0'] || mode["is_adding_checkpoint"]['0'])){
                console.log("cell-address: ", event.target.id);                
                cell_pressed.status = "wall";
                board.walls.push(cell_pressed);
                cell.setAttribute("class", "wall");
                //css styling for walls
                visualiser.items_transition(cell, {backgroundColor:"black",transitionDuration:"2s"});
            }
            
            //when visited the same weight node it doesnt need to set status
            if(mode["is_drawing"]['0'] && mode["is_adding_weight"]['0'] && !obstacles[event.target.className]){
                console.log("weight point has been added: ", event.target.id);
                cell_pressed.status = "weight";
                cell_pressed.weight += 10;
                weight_points[event.target.id] = cell_pressed;
                board.weights[event.target.id] = cell_pressed;
                cell.setAttribute("class", "weight")
                visualiser.items_transition(cell, {backgroundColor:"orange",transitionDuration:"2s"});
            }
        });
        //when user released the mouse click
        cell.addEventListener("mouseup", ()=>{  
            console.log("show walls:", board.walls); 
            console.log("show weights: ", board.weights);
            console.log("show start: ", board.start);
            console.log("show destination: ", board.destination);
            console.log("show checkpoints: ", board.checkpoints);        
            Object.keys(mode).forEach((key) =>{
                mode[key]['0'] = false;
            })
        });
    });
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
            console.log("clear grid for walls: ", board.grid);
            console.log(board.walls)    
        },
        /**
         * @function clear_start
         * clear the start point in the grid
         */  
        clear_start: function(board){
            //check if there is any start point added in the board
            if(board.start !== ""){
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
                console.log("clear grid for start: ", board.grid);
                console.log(board.start);
            }            
        },
        /**
         * @function clear_destination
         * clear all the walls in the grid
         */  
        clear_destination: function(board){
            if(board.destination != ""){
                //changing the class the cell from walls to unvisited
                document.querySelectorAll('.destination').forEach((cell) => {
                    cell.setAttribute("class", "unvisited");
                });

                //changing the status of the node back to unvisited in the board object 
                board.getNodes(board.destination).status = "unvisited";
                console.log("destination", board.destination);

                //clearing the destination
                board.destination = "";

                //make add start point button clickable
                document.getElementById("add_destination").setAttribute("class","dropdown-item");
                console.log("clear grid for destination: ", board.grid);
                console.log(board.destination);
            }                
        },
        /**
         * @function clear_weights
         * clear all the weights in the grid
         */  
        clear_weights: function(board){
            //clear weights only if there is any in the board
            if(Object.keys(board.weights).length > 0){
                //changing the class the cell from weight to unvisited
                document.querySelectorAll('.weight').forEach((cell) => {
                    cell.setAttribute("class", "unvisited");
                });
                //changing the status of the node back to unvisited in the board object        
                Object.keys(board.weights).forEach((cell) => {
                    board.weights[cell].status = "unvisited";
                    board.weights[cell].weight -= 10;
                })
                //clearing all the weights
                board.weights = {};
                console.log("clear grid for weights: ", board.grid);
                console.log(board.weights);
            }                
        },
        /**
         * @function clear_checkpoints
         * clear all the checkpoints in the grid
         */  
        clear_checkpoints: function(board){
            //clear only when there is checkpoints in the board
            if(Object.keys(board.checkpoints).length > 0){
                //changing the class the cell from checkpoints to unvisited
                document.querySelectorAll('.checkpoint').forEach((cell) => {
                    cell.setAttribute("class", "unvisited");
                });
                //changing the status of the node back to unvisited in the board object        
                Object.keys(board.checkpoints).forEach((cell) => {
                    board.checkpoints[cell].status = "unvisited";
                })
                //clearing all the walls
                board.checkpoints = {};
                console.log("clear grid for checkpoints: ", board.grid);
                console.log(board.checkpoints);
            }              
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

        //ccondition for clearing all the item in the cell
        if(value != "All"){          
            clear.options[clear_items[value]](board);
        }
        //runs only selected clear options
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