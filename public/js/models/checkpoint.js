/**
 * @constructor checkpoint
 * checkpoint is the node which should be visited by
 * the algorithm before reaching the destination points
 */
const Checkpoint = (node_address) => {
    this.node_address = node_address; // is the address of the node where checkpoint desired to be added
}

export default Checkpoint; // exporting checkpoint module for extened use