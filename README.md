## Javascript blockchain emulator.

This is a blockchain emulator, that applies the CAP (Consistency, Availability & Partition ) theorem,
build using Nodejs, React, Webpack and Electron.

# Scriptchain
consists of a network for communication among-st nodes in the network.

any node in the network can be online/offline as long as there is a required odd number of nodes needed,
the blockchain will remain unaffected.

nodes can add end-user transactions to the transaction pool, mine a block using PoW (Proof Of Work) and propose the latter
to all nodes in the network, nodes in network will not accept proposed block, if block is mined by an illicit node(s) in the network.

nodes can determine with chain is correct via a consensus method where nodes calculate how many nodes have the same
hasedchain version of the blockchain, if node participates in consensus operation any node holding a hashedchain rejected by the majority nodes,
such node(s) blockchain, last block mined, transactions in transaction pool and genesis block will be replaced with the correct ones.

any node that successfully mines a block and it is accepted is rewarded with some script coin, a transaction is added automatically to 
the transaction pool recipient being the successful node.

### command line version
you can find the cmd version repo [here](https://github.com/Kebalepile/js_blockchain)
just git clone
run npm install
look at package.json scripts
requires postman, cur or any for making requests

### Electron version
I recommend [this one](https://github.com/Kebalepile/scriptchain) for noobs,
development files are cleaner and organized well.
