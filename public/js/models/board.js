import node from './node.js';

/**
 * Class for creating a board
 * Board is used as a grid for the nodes 
 * Node is identified with each cell in the grid
 */
export default class Board{
    constructor(height, width, rows, cols){
        this.height = height;
        this.width = width;
        this.rows = rows;
        this.cols = cols;
        this.nodes = {};
        this.grid = [];
        this.start = '';
        this.destination = '';
    }

    createBoard(){
        let html_grid = ""; // creating a table for the html to visualise the board        
        for(var row = 0; row < this.rows; row++){
            let current_html_row = '<tr id="row_${row}">'; // creating a table row for the html
            let current_row = [];
            for(var col = 0; col < this.cols; col++){
                let node_id = 'id_${row}_${col}', node_status;                
                node_status = "unvisited";
                new_node = new Node(node_id, node_status); //creating node for each cell in the grid
                this.nodes[node_id]=new_node; // adding all the nodes to a dict for easier use of accessing the value
                current_html_row += '<td id="${node_id}" class="${node_status}"></td>';
                current_row.append(new_node);
            };
            this.grid.append(curr_row);
            html_grid += '${current_html_row} + </tr>';
        };
        let board = document.getElementById('board');
        board.innerHTML = html_grid; // adding the grid inside the div tag with id board
    }
}