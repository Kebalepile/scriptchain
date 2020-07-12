"use strict"
const router = require("express").Router(),
    { details } = require("../details/apiDetails"),
    {
        node, allNodes,
        broadcastNode, nodeInNetwork,
        availableNodes

    } = require("./router_procedures/node_procedures/procedures"),
    { address } = require("./router_procedures/address_procedures/procedures"),
    { transaction, transactionPool } = require("./router_procedures/transaction_procedures/procedures"),
    { mine } = require("./router_procedures/mine_procedures/procedures"),
    { blockProposition, block } = require("./router_procedures/block_procedures/procedures"),
    { consensus } = require("./router_procedures/consensus_procedures/procedures")

router.get("/", (req, res) => {

    const { host } = req.headers
    res.json(details(host.substring(10)))

})

router.get("/node", node)

router.get("/nodes", allNodes)

router.post("/broadcast_node", broadcastNode)

router.post("/node_in_network", nodeInNetwork)

router.post("/available_nodes", availableNodes)

// NB router not yet tested.
router.get("/address", address)

router.post("/transaction", transaction)

router.post("/transaction_pool", transactionPool)

router.get("/mine", mine)

router.post("/block_proposition", blockProposition)
// NB router not yet tested.
router.get("/block", block) // returns a block from the blockchain.

router.get("/consensus", consensus)

module.exports = router;
