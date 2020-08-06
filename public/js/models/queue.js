
/**
 * @constructor queue
 */
export default function Queue(){
    this.elements = []; // array of the queue
}

/**
 * @function eneque
 * @param element
 * element that needs to be added
 * adds the element at the end of the queue
 */
Queue.prototype.enqueue = function(element){
    this.elements.push(element);
}

/**
 * @function dequeue
 * removes the element from the front of the queue
 */
Queue.prototype.dequeue = function(){
    this.elements.shift();
}

/**
 * @function length
 * get the length of the element
 */
Queue.prototype.length = function(){
    return this.elements.length;
}

/**
 * @function isEmpty
 * check if the queue is empty or not 
 */
Queue.prototype.isEmpty = function(){
    return this.elements.queue == 0;
}

/**
 * @function peek
 * returns the first element in the queue
 */
Queue.prototype.peek = function(){
    return !this.isEmpty()?this.elements[0]:undefined;
}
