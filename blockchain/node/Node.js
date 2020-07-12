"use strict"

const Blockchain = require("../structure/Blockchain")

class Node extends Blockchain {
    nodesInNetwork = new Set()
    constructor(address, port = 3001) {
        super(address)
        this.nodeURL = `http://localhost:${port}`
    }

    addNode(nodeURL) {
        this.nodesInNetwork.add(nodeURL)
    }
}

Object.freeze(Node)

module.exports = Node