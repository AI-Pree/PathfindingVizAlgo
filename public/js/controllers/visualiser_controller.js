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
