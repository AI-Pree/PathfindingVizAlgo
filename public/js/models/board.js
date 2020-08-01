import Node from './node.js';

/**
 * @class Board
 * Class for creating a board
 * Board is used as a grid for the nodes 
 * Node is identified with each cell in the grid
 */
export default class Board{
    //private fields
    #height 
    #width 
    #nodes 
    #grid 
    #start
    #destination

    /**
     * @constructor 
     * @param height 
     * determines the number of rows in the table
     * @param width 
     * determines the number of cols in the table
     */
    constructor(height, width){
        this.#height = height;
        this.#width = width;
        this.#nodes = {}; // stores the nodes with its node id  as a key value pair where node is the value and node_id is the pair in a dict
        this.#grid = [];
        this.#start = ''; // holds the cell address of the start node in the table
        this.#destination = ''; // holds the cell address of the destination node in the table
    }

    //getter and setters

    get height(){
        return this.#height;
    }

    set height(height){
        this.#height = height;
    }

    get width(){
        return this.#width;
    }

    set width(width){
        this.#width = width;
    }

    get grid(){
        return this.#grid;
    }

    set grid(grid){
        this.#grid = grid;
    }

    /**
     * @function CreateBoard
     * creates a new board
     * creates a table with rows and cols from the provided width and height in the index html 
     * It does not return any value
     */
    createBoard(){
        var html_grid = ""; // creating a table for the html to visualise the board        
        for(var row = 0; row < this.height; row++){
            var curr_html_row = '<tr id=' + '"' + "row_" + row + '"' + '>'; // creating a table row for the html
            var curr_row = [];
            for(var col = 0; col < this.width; col++){
                let node_id = row + ":" + col, node_status, new_node;                
                node_status = "unvisited";
                new_node = new Node(node_id, node_status); //creating node for each cell in the grid
                this.#nodes[node_id]=new_node; // adding all the nodes to a dict for easier use of accessing the value
                curr_html_row += '<td id=col_'+ '"' + node_id + '"' + " class= " + '"' + node_status +'"' + '></td>';
                curr_row.push(new_node);
            };
            this.#grid.push(curr_row);
            html_grid += curr_html_row + '</tr>';
        };
        document.getElementById('board').innerHTML = html_grid; // adding the grid inside the div tag to table with id board
        console.log("creating.....")
    }

    /**
     * @function getNodes
     * access the node in the grid using node_id
     * @param node_id
     * @return the node of the passed node_id param
     */
    getNodes(node_id){
        let rowxcol = node_id.split(":");
        let row = parseInt(rowxcol[0]);
        let col = parseInt(rowxcol[1]);
        return this.#grid[row][col];
    }
}