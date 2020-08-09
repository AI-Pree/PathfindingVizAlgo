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
  dijikstra:function (my_cost, colorPicked, old_delay){
    let delay = old_delay;
    Object.entries(my_cost).forEach(([next_node, value])=>{
      let cellHTML = document.getElementById(next_node);     
      let opacity_all = 0;
      let all_color = "";
      let first_color = colorPicked["start_color"]
      let mid_color = colorPicked["mid_color"]
      let last_color = colorPicked["last_color"]
      if (cellHTML.className == "weight") {
        opacity_all= 0.6;
        all_color = "orange";
      }
      else {
        all_color = last_color;
        opacity_all = 1;
      }
      document.getElementById(next_node).animate([
        //keyframes
        {
          opacity: 0.1,
          backgroundColor: first_color,
          padding:"0px",
          overflow: "hidden",
        },
        {
          opacity: 0.4,
          backgroundColor: mid_color,
          padding:"0px",
          overflow: "hidden",

        },
        {
          backgroundColor: all_color,
          opacity: opacity_all,
          fontSize: "x-small",
          padding:"0px",
          overflow: "hidden"
        }
      ],
        {
          //timing options
          duration: 1500,
          easing: "ease-in",
          delay: delay,
          fill: "forwards",
      });  
      cellHTML.innerHTML = value;
      delay += 10; // delay for each animation to get generated after getting current node and its neighbour     
    })
    return delay 
  },
}
