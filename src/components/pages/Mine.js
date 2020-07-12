import React, { useState, useContext, useEffect } from 'react'
import Context from "../../context/scriptchain/Context"

const Mine = () => {
    const [mineMsg, updateMineMsg] = useState("please wait... block currently being mined.")
    const {
        mineBlock
    } = useContext(Context)


    useEffect(() => {
        mineBlock()
        .then(msg => {
            updateMineMsg(msg)
        })
    }, [])

    return (
        <div className="container">
            <h4 className="statusUpdate">{mineMsg}</h4>
        </div>
    )
}

export default Mine
