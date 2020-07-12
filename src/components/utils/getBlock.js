// gets block requested from blockchain.
// NB test method on blockchain before hand.
export default function getBlock (blockID, nodeURL) {
    fetch(`${nodeURL}/api/block?id=${blockID}`)
    .then(res => res.json())
    .then(block => {
        console.log(block)
    })
  }