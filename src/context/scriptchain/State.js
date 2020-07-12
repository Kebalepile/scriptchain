import React, { useReducer } from 'react'
import Context from './Context'
import Reducer from './Reducer'
import {
    NODEURL,
    NODE,
    NODETRANSACTIONPOOL,
    ALLNODES
} from '../types'


const State = (props) => {

    const initialState = {
        nodeURL: "http://localhost:3001",
        node: null,
        nodeTransactionPool: null,
        allNodes: null,
    }
    const [state, dispatch] = useReducer(Reducer, initialState)

    const setNodeURL = nodeURL => {

        dispatch({ type: NODEURL, payload: nodeURL })
    }

    const getNode = async () => {

        try {
            let node = await fetch(`${state.nodeURL}/api/node`)
            node = await node.json()

            setNode(node)
            return node

        } catch (err) {
            console.error(err)
        }

    }
    const setNode = node => {

        dispatch({ type: NODE, payload: node })

        setNodeTransactionPool(node.transactionPool)
    }

    const setNodeTransactionPool = transactionPool => {

        dispatch({ type: NODETRANSACTIONPOOL, payload: transactionPool })
    }

    const nodeTransactionPool = () => state.nodeTransactionPool

    const getAllNodes = async () => {

        try {
            let listOfNodes = await fetch(`${state.nodeURL}/api/nodes`)
            listOfNodes = await listOfNodes.json()

            dispatch({ type: ALLNODES, payload: listOfNodes })
           
            return listOfNodes

        }
        catch (err) {
            console.error(err)
        }
    }
    // consensus
    const validBlockchain = async () => {
        try {

            let res = await fetch(`${state.nodeURL}/api/consensus`)
            res = await res.json()
            
            return res['msg']

        } catch (err) {
            console.error(err)
        }
    }
    const mineBlock = async () => {

        try {
            // returns an object with property
            let res = await fetch(`${state.nodeURL}/api/mine`)
            res = await res.json()
           
            return res['msg']
        } catch (err) {
            console.error(err)
        }
    }
    const makeTransaction = async transaction => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(transaction)
        }
        try {

            // returns object with msessage & transaction properties
            let res = await fetch(`${state.nodeURL}/api/transaction`, options)

            res = await res.json()
           
            return res
        } catch (err) {
            console.error(err)
        }

    }

    return (
        <Context.Provider value={{
            nodeURL: state.nodeURL,
            node: state.node,
            setNodeURL,
            getNode,
            setNode,
            setNodeTransactionPool,
            nodeTransactionPool,
            getAllNodes,
            allNodes: state.allNodes,
            validBlockchain,
            mineBlock,
            makeTransaction
        }}>
            {props.children}
        </Context.Provider>
    )
}

export default State



