export default class Board{
    constructor(height, width, rows, cols){
        this.height = height;
        this.width = width;
        this.rows = rows;
        this.cols = cols;
    }

    createBoard(){
        for(var row = 0; row < this.rows; row++){
            for(var col = 0; col < this.cols; col++){
                $("#contianer").append("<div class='grid'></div>");
            };
        };
    }
}