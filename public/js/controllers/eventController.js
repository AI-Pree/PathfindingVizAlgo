
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
         */
        weight:function(){

            console.log("this function add weight in the cell");
        },
        /**
         * @function checkpoint
         * Add checkpoint to the node selected by the user in real-time
         */
        checkpoint:function(){
            console.log("this function adds checkpoint in the cell")
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