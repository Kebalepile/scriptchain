"use strict"

const { nodes } = require("../../../node/state")

function address(req, res) {
    const { host } = req.headers
    const node = nodes[host]
    const { q } = req.query
    const data = node.addressData(q)
    res.json(data)
}


module.exports = {
    address
}