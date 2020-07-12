// gets all transactiion history related to 
// address data.
// NB test method on blockchain before hand.

export default function addressHistory (address, nodeURL) {
  fetch(`${nodeURL}/api/address?q=${address}`)
  .then(res => res.json())
  .then(addressInfo => {
      console.log(addressInfo)
  })
}