import React, { useState, useEffect, useContext } from 'react'
import Context from "../../context/scriptchain/Context"
const Consensus = () => {
    const [ consensusMsg, updateConsensusMsg] = useState("please wait... node(s) currently voting")

    const {
        validBlockchain
    } = useContext(Context)

    useEffect(() => {
        validBlockchain()
        .then(finalVoteMsg => {
           updateConsensusMsg(finalVoteMsg)
        })
    }, [])

    return (
        <div className="container">
            <h4 className="statusUpdate">{consensusMsg}</h4>
        </div>
    )
}

export default Consensus
