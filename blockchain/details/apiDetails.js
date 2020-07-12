"use strict"
module.exports.details = (port = 3001) => {
    return (
        {
            message: `Hi there, below are the api's available routes.`,
            routes: {
                details: {
                    description: `Explains api routes.`,
                    methods: `GET`,
                    route: `http://localhost:${port}/api`
                },
                blockchain_node: {
                    description: `Returns a Node in network and its entire Blockchain.`,
                    methods: `GET`,
                    route: `http://localhost:${port}/api/node`
                },
                transaction: {
                    description: `Makes a transaction in the blockchain.`,
                    methods: `POST`,
                    route: `http://localhost:${port}/api/transaction`
                },
                address: {
                    description: `Returns data relating to specified address parameter.`,
                    methods: `GET`,
                    route: `http://localhost:${port}/api/address/q?=< Account Address >`
                },
                block: {
                    description: `Returns a block from the blockchain of specified id as query.`,
                    methods: `GET`,
                    route: `http://localhost:${port}/api/block/id?=< Block ID >`
                },
                mine: {
                    description: `Mine initiates mining process (mine a new block to be added the blockchain)`,
                    methods: `POST`,
                    route: `http://localhost:${port}/api/mine`
                },
                consensus: {
                    description: `Nodes available in the network determine which Blockchain is valid, then return valid Blockchain.`,
                    methods: `GET`,
                    route: `http://localhost:${port}/api/consensus`
                }
            }
        }
    )
}