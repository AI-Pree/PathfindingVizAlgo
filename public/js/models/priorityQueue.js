/**
 * @class pqElement
 * For generating priority queue element
 */
class pqElement{
    constructor (element, priority){
        this.element = element;
        this.priority = priority;
    }
}

/**
 * @class PriotiyQueue
 */
export default class PriortyQueue{
    /**
     * @constructor PriorityQueue
     */
    constructor(){
        this.item = [];
    }

    /**
     * @function enqueue
     * This function adds the pqelement to priority queue 
     * @param  element 
     * @param  priority 
     */
    enqueue(element, priority){
        //creating a object for the priority queue element
        var pq = new pqElement(element, priority);
        var max = false;

        for(let i = 0; i < this.item.length; i ++){
            if(this.item[i].priority > pq.priority){
                this.item.splice(i, 0, pq);
                max = true;
                break;
            }
        }

        // if the value for priortiy queue is high then it is added 
        // to the lowest heirarchy level
        if(!max){
            this.item.push(pq);
        }
        
    }

    /**
     * @function isEmpty
     * checksif the priority queue is empty
     */
    isEmpty(){
        return this.item.length == 0
    }

    /**
     * @function dequeue
     * Removes the element with the highest priortiy in the priority queue
     */
    dequeue(){
        if(!this.isEmpty()){
            return  this.item.shift();
        }
        return "queue is empty"
    }

    /**
     * @function peek
     * returns the first element in the priority queue
     */
    peek(){
        if(!this.isEmpty()){
            return this.item[0];
        }
        return "queue is empty";
    }

    /**
     * @function rear
     * returns the element with the lowest priority in the queue
     */
    rear(){
        if(!this.isEmpty()){
            return this.item[this.item.length-1];
        }
        return "queue is empty"
    }
}