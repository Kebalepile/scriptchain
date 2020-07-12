"use strict"
const { nodes } = require("../../../node/state"),
    axios = require("axios")

async function transaction(req, res) {
    const { host } = req.headers
    const node = nodes[host]
    const { sender, recipient, amount, message } = req.body

    try {

        const transaction = node.transaction(sender, recipient, amount, message)

        const updateTransactionPool = []

        node.nodesInNetwork.forEach(nodeURL => {
            let opt = {
                method: "post",
                url: `${nodeURL}/api/transaction_pool`,
                data: { transaction }
            }
            updateTransactionPool.push(axios(opt))
        })

        Promise.all(updateTransactionPool)

        res.json({ message: `transaction will be added in block number ${node.chain.size + 1}`, transaction })
    } catch (err) {

    }
}

function transactionPool(req, res) {

    const { host } = req.headers
    const node = nodes[host]
    const { transaction } = req.body

    if (!node.transactionPool.has(transaction)) node.addToTransactionPool(transaction)

    res.end()
}


module.exports = {
    transaction,
    transactionPool
}