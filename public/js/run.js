import board from './models/board.js';

let height = Math.floor($(document).width()/25);
let width = Math.floor($(document).width()/25);

var initialise = function(){
    let new_board = new board(height, width)
    new_board.createBoard();
}

initialise();

