/**
 * @class Node
 * it creates a new nodes for the cell in the HTML table
 * @param id
 *  id of the node
 * @param status
 *  empty is the default node
 *  occupied is the wall node created by the user
 *  weighed is the node that has higher cost than other nodes
 *  checkpoint is the node which needs to be visited before reaching the final destination
 */
export default class Node{
    constructor(id, status){
        this.id = id;
       
        this.status = status; // status is to determine what kind of node it is i.e empty, occupied, weighted (node that has higher cost than normal node), visited and checkpoint
        this.weight = 0; 
    }

    // getter for the id attribute
    get id(){
        return this.id;
    }

    // setter for the id attribute
    set id(new_id){
        this.id = new_id;
    }
    
    // getter for the status attribute
    get status(){
        return this.status;
    }

    //setter for the status attribute
    set status(new_status){
        this.status = new_status;
    }
}