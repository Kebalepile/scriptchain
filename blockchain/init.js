"use strict"
const { api } = require("./network/api")
const Node = require("./node/Node")
const { nanoid } = require("nanoid")
const { nodes } = require("./node/state")

function initNodes() {
    for (let port = 3001; port < 3008; port++) {
        let key = `localhost:${port}`
        api.listen(port)
        nodes[key] = new Node(nanoid(), port)
    }
    //  connecting nodes in the ChainScript network.
    const keys = Object.keys(nodes)
    const nodeURLs = Object.values(nodes).reduce((nodesInNetworkURL, currentNode) => {
        nodesInNetworkURL.push(currentNode.nodeURL)
        return nodesInNetworkURL
    }, [])
    let allNodes = Object.entries(nodes).length

    for (let i = 0; i < allNodes; i++) {
        nodes[keys[i]].nodesInNetwork = new Set(nodeURLs)
    }

}
module.exports = initNodes