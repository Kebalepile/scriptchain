import React, { useEffect, useContext, useState } from 'react'
import Context from "../../context/scriptchain/Context"
import NothingToDisplay from "../utils/NothingToDisplay"
import PrettyJSON from "../utils/PrettyJSON"

const AllNodes = () => {
    const [nodes, setNodes] = useState(null)
    const {
        nodeURL,
        getAllNodes
    } = useContext(Context)

    useEffect(() => {
        getAllNodes()
            .then(listOfNodes => {
                setNodes(listOfNodes)
            })

    }, [nodeURL])


    return (
        <section className="allnodes">
            {
                Array.isArray(nodes) && nodes.length > 0 ?
                    (nodes.map((node, index) => {
                        return (
                            <article className="nodeOfAllNodes" key={index} >
                                <h4>Blockchain of Node at {node.nodeURL}:</h4>
                                <textarea disabled value={PrettyJSON(node.chain)}>
                                </textarea>
                            </article>
                        )
                    })) :
                    (<NothingToDisplay />)
            }
        </section>
    )
}

export default AllNodes
