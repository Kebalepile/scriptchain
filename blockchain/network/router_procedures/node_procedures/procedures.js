"use strict"
const { nodes } = require("../../../node/state"),
    axios = require("axios")

function node(req, res) {

    const { host } = req.headers

    const node = nodes[host]

    res.json({
        ...node,
        chain: Object.fromEntries(node.chain),
        transactionPool: [...node.transactionPool],
        nodesInNetwork: [...node.nodesInNetwork],
        hashedchain: node.hashChain()
    })
}

async function allNodes(req, res) {
    
    const { host } = req.headers,
        node = nodes[host],
        getNodes = []

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

        res.json(Nodes)

    } catch (err) {

    }
}

async function broadcastNode(req, res) {
    const { host } = req.headers
    const node = nodes[host]
    const { nodeURL } = req.body
    const alertNodesInNetwork = []
    const nodeURLNotnode = nodeURL !== node.nodeURL
    const nodeNotInNetwork = node.nodesInNetwork.has(nodeURL)

    try {
        if (nodeURLNotnode && !nodeNotInNetwork) {

            for (let nodeNetworkURL of node.nodesInNetwork) {

                let opt = {
                    method: 'post',
                    url: `${nodeNetworkURL}/api/node_in_network`,
                    data: { nodeURL }
                }

                alertNodesInNetwork.push(axios(opt))
            }
            node.addNode(nodeURL)
        }

        Promise.all(alertNodesInNetwork)

        const availableNodes = [...node.nodesInNetwork, node.nodeURL]

        const response = await axios({
            method: 'post',
            url: `${nodeURL}/api/available_nodes`,
            data: {

                availableNodes
            }
        })

        res.json({ message: response.data })

    } catch (err) {

    }

}

function nodeInNetwork(req, res) {

    const { host } = req.headers
    const node = nodes[host]
    const nodeInNetwork = req.body
    const nodeNotAlreadyInNodesInNetwork = !node.nodesInNetwork.has(nodeInNetwork)
    const isNotCurrentNodeURL = node.nodeURL !== nodeInNetwork['nodeURL']

    if (isNotCurrentNodeURL && nodeNotAlreadyInNodesInNetwork) {
        node.nodesInNetwork.add(nodeInNetwork['nodeURL'])
    }

    res.end()

}

function availableNodes(req, res) {

    const { host } = req.headers
    const node = nodes[host]
    const { availableNodes } = req.body

    for (let nodeURL of availableNodes) {
        if (nodeURL !== node.nodeURL) {
            node.nodesInNetwork.add(nodeURL)
        }
    }
    res.send(`node at ${node.nodeURL} can now participate.`)
}

module.exports = {
    node,
    allNodes,
    broadcastNode,
    nodeInNetwork,
    availableNodes
}