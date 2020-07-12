import {
    NODEURL,
    NODE,
    NODETRANSACTIONPOOL,
    ALLNODES
} from '../types'

export default (state, action) => {
    switch (action.type) {
        case NODEURL:
            return {
                ...state,
                nodeURL: action.payload
            }
        case NODE:
            return {
                ...state,
                node: action.payload
            }
        case NODETRANSACTIONPOOL:
            return {
                ...state,
                nodeTransactionPool: action.payload
            }
        case ALLNODES:
            return {
                ...state,
                allNodes: action.payload
            }
        default:
            return state
    }
}
