import Board from './models/board.js';


// height of the nav in the browser
let nav_height = document.getElementById("nav_html").clientHeight + 30; // value of 5 can be desirable depending on the bottom offset
/**
 * @param height
 * the number of rows in a table
 * the height based on the window size of the browser and dividing it by 25 to assign the height of the cell size in the grid to be 25
 * determinses how many rows can be added in the table
 */
let height = Math.floor(($(document).height() - nav_height)/25); // subtracting the document height with the nav height in the browser to remove redundant scrolling from rows in table

/**
 * @param width
 * the number of columns in a table
 * the width based on the window size of the browser and dividing it by 25 to assign the width of the cell size in the grid to be 25px
 * determines how many columns can be added in the table
 */
let width = Math.floor($(document).width()/25);

/**
 * @function initialise
 * Initialises the whole board
 * Creates a new board instance and creates the board to display in the browser
 */
var initialise = function(){
    let new_board = new Board(height, width);
    new_board.createBoard();
    console.log("Board of size " + new_board.height + "x" + new_board.width + " has been successfully created.....")
    console.log(new_board.getNodes("0:1").status);
}
console.log("rows: " + height, "columns: " + width);
console.log("Creating a new board......");
initialise();

