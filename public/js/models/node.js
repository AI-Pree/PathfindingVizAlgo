/**
 * @class Node
 * it creates a new nodes for the cell in the HTML table
 */
export default class Node{
    constructor(id, status){
        this.id = id;
        /**
         * @param status
         * empty is the default node
         * occupied is the wall node created by the user
         * weighed is the node that has higher cost than other nodes
         * checkpoint is the node which needs to be visited before reaching the final destination
         */
        this.status = status; // status is to determine what kind of node it is i.e empty, occupied, weighted (node that has higher cost than normal node) and checkpoint
        this.weight = 0; 
    }
}