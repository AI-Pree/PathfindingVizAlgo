/**
 * Visualiser Controller  
 */

 /**
  * @constructor Visualiser
  */
export default function Visualiser(){}

/**
 * @function items_transition
 * transition for adding of items in the cell
 * @param cell 
 * @param css 
 */
Visualiser.prototype.items_transition = function(cell, css){
  cell.style.backgroundColor = css.backgroundColor || "";
  cell.style.transitionDuration = css.transitionDuration || "0s";
  cell.style.opacity = css.opacity || 1;
  cell.style.transitionDelay = css.transitionDelay || "0s";
} 

/**
 * @field visualsie
 * This is the field for the constructor Visualiser
 * It visualises the algorithm and it path taken in the board
 */
Visualiser.prototype.visualise = {
  /**
   * @function pathVis
   * Visualising the path resulted using a particular algorithm  in the html board
   */
  pathVis: function(){
    this.path.forEach(cell=>{        
      console.log(cell)
      //animating the path     
      
      document.getElementById(cell).animate([
          //keyframes
          {
              opacity: 0,
              backgroundColor: "#2D00F7",
          },
          {
              opacity: 1,
              easing:"linear",
              backgroundColor: "#A100F2",
              
          },            
      ],
      {
          //timing options
          duration: 500,
          delay: this.delay + this.path_delay,
          fill: "forwards",
      });      
      /*uncomment if want to show start and destination point */
      // if(!(cell == this.board.start || cell == goal)){
      // }        
      this.path_delay += 50;
    })
  },
  /**
   * @funciton dijikstra
   * Visualising the dijikstra algorithm in the html board
   */
  dijikstra:function(){
    Object.entries(this.current_cost).forEach(([next_node, value])=>{
      let cellHTML = document.getElementById(next_node);
      //not make start and end node invisible at start
      if(next_node == this.board.start || next_node == this.goal || this.board.nodes[next_node].status == "checkpoint"){
        cellHTML.innerHTML = ""; 
      }
      else{
        cellHTML.style.opacity = 0;
        cellHTML.innerHTML = value;
      }
      
      let opacity_weight = 0;
      if(next_node != this.goal){
        if(cellHTML.className == "weight"){
          opacity_weight = 0.3;
        } 
        else{
          opacity_weight = 1;
        }
        document.getElementById(next_node).animate([
            //keyframes
            {
                opacity: 0.1,
                backgroundColor: "#2D00F7",
            },
            {
                opacity: 0.2,
                backgroundColor: "#A100F2",
                
            },
            {
                backgroundColor: "#F20089",
                opacity: opacity_weight,
            }
        ],
        {
            //timing options
            duration: 2000,
            delay: this.delay,
            fill: "forwards",
        });
      }
      this.delay += 10; // delay for each animation to get generated after getting current node and its neighbour     
    })    
  },
}
