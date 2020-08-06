/**
 * Animation Controller 
 * @param {*} cell 
 * @param {*} backgroundColor 
 * @param {*} opacity 
 * @param {*} transition 
 * @param {*} transitionDuration 
 * @param {*} transitionDelay 
 */

export default function items_transition(cell, css){

    cell.style.backgroundColor = css.backgroundColor || "";
    cell.style.transitionDuration = css.transitionDuration || "0s";
    cell.style.opacity = css.opacity || 1;
}