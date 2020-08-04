/**
 * @constructor Weight
 * is the weight of the node
 * Adding weights delays the algorithm time when it visits that particular weighted node
 */
function Weight(cost, node_address){
    this.cost = cost; // cost of the node
    this.address = node_address;
}

export default Weight; // exporting weight module for extened use