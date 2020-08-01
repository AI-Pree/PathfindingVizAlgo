import Board from './models/board.js';

let height = Math.floor($(document).height()/25);
let width = Math.floor($(document).width()/25);

var initialise = function(){
    let new_board = new Board(height, width);
    new_board.createBoard();
    console.log("Board of size " + new_board.height + "x" + new_board.width + " has been successfully created.....")
}
console.log(height, width);
console.log("Creating a new board......");
initialise();
