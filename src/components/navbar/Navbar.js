import React from 'react'
import { Link } from 'react-router-dom'
import blockchain from './icons/blockchain.svg'
import network from './icons/node.svg'
import consensus from './icons/consensus.svg'
import transactions from './icons/transactions.svg'
import mine from './icons/mine.svg'
const Navbar = () => {
  return (
    <nav>
      <Link className="nav-icon" to="/blockchain">  <img src={blockchain} title="current nodes blockchain" /></Link>
      <Link className="nav-icon" to="/networknodes"> <img src={network} title="nodes in network"/> </Link>
      <Link className="nav-icon" to="/consensus"> <img src={consensus} title="consensus (get correct blockchain)" /></Link>
      <Link className="nav-icon" to="/transaction"><img src={transactions} title=" make a transaction" /></Link>
      <Link className="nav-icon" to="/mine"><img src={mine} title="mine a new block" /></Link>
    </nav>
  )
}

export default Navbar
