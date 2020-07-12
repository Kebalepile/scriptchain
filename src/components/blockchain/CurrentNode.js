import React, { useState, useContext } from 'react'
import Context from "../../context/scriptchain/Context"
import PrettyJSON from "../utils/PrettyJSON"
import NothingToDisplay from "../utils/NothingToDisplay"

const CurrentNode = () => {

    const [state, updateState] = useState([])

    const {
        nodeURL,
        getNode
    } = useContext(Context)

    const ShowNode = async e => {

        try {
            let node = await getNode()
            updateState({
                genesisBlock: node.genesisBlock,
                lastMinedBlock: node.lastBlock,
                blockchain: node.chain
            })
        }
        catch (err) {
            console.error(err)
        }

    }
    const ShowTransactionPool = async e => {

        try {
            let node = await getNode()
            updateState(node.transactionPool)

        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className="node">
            <section className="options">
                <button
                    className="node-blockchain"
                    onMouseOver={ShowNode}>
                    Blockchain of Node at {nodeURL}
                </button>
                <button
                    className="node-transactionpool"
                    onMouseOver={ShowTransactionPool} >
                    Transaction pool
                </button>
            </section>

            <hr />

            <section className="node-results">
                {
                    !Array.isArray(state) && typeof state !== "string" ?
                        (Object.keys(state).map((key, index) => {

                            return (
                                <article className="display" key={index} >
                                    <h4>{key}:</h4>
                                    <textarea disabled value={PrettyJSON(state[key])}>

                                    </textarea>
                                </article>
                            )

                        })) : Array.isArray(state) && state.length > 0 ?
                            (state.map((pendingTransaction, index) => {

                                return (
                                    <article className="display" key={index} >
                                        <h4>pending transaction:</h4>
                                        <textarea disabled value={PrettyJSON(pendingTransaction)}>

                                        </textarea>
                                    </article>
                                )

                            })) :
                            (<NothingToDisplay />)
                }
            </section>
        </div>
    )
}

export default CurrentNode
