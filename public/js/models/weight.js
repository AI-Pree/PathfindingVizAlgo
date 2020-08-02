/**
 * @constructor weight
 * is the weight of the node
 * Adding weights delays the algorithm time when it visits that particular weighted node
 */
const Weight = (cost) => {
    this.cost = cost // cost of the node
}

export default Weight; // exporting weight module for extened use