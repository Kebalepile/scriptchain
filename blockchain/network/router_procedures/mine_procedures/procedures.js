"use strict"

const { nodes } = require("../../../node/state"),
    axios = require("axios")

async function mine(req, res) {
    const { host } = req.headers
    const node = nodes[host]
    const transactionPool = node.transactionPool
    const previousBlockHash = node.lastBlock.header['hash']

    const blockdata = {
        index: node.lastBlock.header['index'] + 1,
        transactions: [...node.transactionPool]
    }

    const nonce = node.PoW(previousBlockHash, blockdata)

    const hash = node.hashBlock(previousBlockHash, blockdata, nonce)

    const block = node.mineBlock(nonce, previousBlockHash, hash)

    const blockProposition = []
    try {
        node.nodesInNetwork.forEach(nodeURL => {
            let opt = {
                method: 'post',
                url: `${nodeURL}/api/block_proposition`,
                data: { block, hashedchain: node.hashedchain }
            }

            blockProposition.push(axios(opt))
        })

        let responses = await Promise.all(blockProposition)

        responses = await responses.reduce((accumulator, current) => {
            if (current['data']['bool']) {
                accumulator['accept']++
            } else {
                accumulator['reject']++
            }
            return accumulator
        }, { accept: 0, reject: 0 })

        const { accept, reject } = responses

        switch (accept > reject) {
            case true:
                axios({
                    method: 'post',
                    url: `${node.nodeURL}/api/transaction`,
                    data: {
                        sender: "00",
                        recipient: node.nodeAddress,
                        message: `mine reward for ${node.nodeAddress}, 
                   for mining block ${block.header.id}`
                    }
                })
                res.json({ msg: "proposed block successfully accepted." })
                break
            default:
                node.chain.delete(block.header.id)
                node.transactionPool = transactionPool
                res.json({ msg: "proposed block rejected." })
                break
        }
    } catch (err) {
        console.log("mine errro below")
        console.error(err)
    }
}

module.exports = {
    mine
}