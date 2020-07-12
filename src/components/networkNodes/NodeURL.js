import React, { useContext } from 'react'
import Context from "../../context/scriptchain/Context"
// displays list of node URLs available in the network.
const NodeURL = () => {

    const {
        setNodeURL
    } = useContext(Context)

    const Change = e => {
        setNodeURL(e.target.value)
    }
    return (
        <aside id="nodeurl">
            <label htmlFor="network-nodeurls">pick a node</label>
            <select name="network-nodeurls" onChange={Change}>
                <optgroup label="Nodes in network">
                    <option value="http://localhost:3001">http://localhost:3001</option>
                    <option value="http://localhost:3002">http://localhost:3002</option>
                    <option value="http://localhost:3003">http://localhost:3003</option>
                    <option value="http://localhost:3004">http://localhost:3004</option>
                    <option value="http://localhost:3005">http://localhost:3005</option>
                    <option value="http://localhost:3006">http://localhost:3006</option>
                    <option value="http://localhost:3007">http://localhost:3007</option>
                </optgroup>
            </select>
        </aside>
    )
}

export default NodeURL
