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
   * @funciton frontier
   * Visualising the flood fill algorithm in the html board
   */
  frontier:function(){
    this.previous_node_stack.forEach(next_node=>{
      if(next_node != this.goal){
        document.getElementById(next_node).animate([
            //keyframes
            {
                opacity: 0.1,
                backgroundColor: "#2D00F7",
            },
            {
                opacity: 0.4,
                backgroundColor: "#A100F2",
                
            },
            {
                backgroundColor: "#F20089",
                opacity: 1,
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
