"use strict"
const { nodes } = require("../../../node/state"),
    axios = require("axios")

const loopOverNodes = (arr, fn) => { for (var node of arr) fn(node) }

function isLongestBlockchain(longestChain) {
    return function (node) {
        switch (node.hashedchain === longestChain.hashedchain) {
            case true:
                longestChainAccepted++
                break
            case false:
                longestChainRejected++
                break
        }
    }
}


async function consensus(req, res) {
    const { host } = req.headers,
        node = nodes[host],
        getNodes = []

    let longestChainAccepted = 0,
        longestChainRejected = 0,
        longestChain = null,
        longestChainLength = node.chain.size,
        transactionPool = null

    const findLongestBlockChain = (node) => {
        if (Object.entries(node.chain).length > longestChainLength) {

            longestChain = node
            longestChainLength = Object.entries(node.chain).length
            transactionPool = node.transactionPool

        }
    }
    try {
        for (let nodeURL of node.nodesInNetwork) {
            let opt = {
                method: 'get',
                url: `${nodeURL}/api/node`
            }
            getNodes.push(axios(opt))

        }

        let Nodes = await Promise.all(getNodes)

        Nodes = await Nodes.reduce((accumulator, current) => {

            accumulator.push(current.data)

            return accumulator
        }, [])

        if (Nodes.length > 0) loopOverNodes(Nodes, findLongestBlockChain)

        if (longestChain) {
            let meetConsensus = isLongestBlockchain(longestChain)
            loopOverNodes(Nodes, meetConsensus)
        }

        const ReplaceNodeBlockchain = longestChain && longestChainAccepted > longestChainRejected

        if (ReplaceNodeBlockchain) {

            node.chain = new Map(Object.entries(longestChain.chain))

            transactionPool.forEach(transaction => {
                if (!node.transactionPool.has(transaction)) node.transactionPool.add(transaction)
            })

            longestChain.nodesInNetwork.forEach(nodeURL => {
                if (nodeURL !== node.nodeURL && !node.nodesInNetwork.has(nodeURL)) {
                    node.nodesInNetwork.add(nodeURL)
                }
            })

            node.lastBlock = longestChain.lastBlock
            res.json({
                msg: "node's blockchain was invalid, thus replaced."
            })
        } else {
            res.json({
                msg: "node's blockchain is valid."
            })
        }

    }
    catch (err) { }
}
module.exports = {
    consensus
}