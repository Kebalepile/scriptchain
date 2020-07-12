"use strict"

const { nodes } = require("../../../node/state")

function blockProposition(req, res) {
    const { host } = req.headers
    const node = nodes[host]
    const { block, hashedchain } = req.body
    const isPreviousBlockIndex = (block.header['index'] - 1) === node.lastBlock.header['index']
    const isPreviousBlockHash = block.header['previousBlockHash'] === node.lastBlock.header['hash']

    switch (isPreviousBlockIndex && isPreviousBlockHash) {
        case true:
            node.chain.set(block.header['id'], block)
            node.hashedchain = hashedchain
            node.lastBlock = block
            node.transactionPool = new Set()
            res.json({ bool: true })
            break
        default:
            res.json({ bool: false })
            break
    }
}

function block(req, res) {
    const { host } = req.headers
    const node = nodes[host]
    const { id } = req.query
    const block = node.getBlock(id)
    res.json({ block })
}


module.exports = {
    blockProposition,
    block
}