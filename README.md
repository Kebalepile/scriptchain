## Javascript blockchain emulator.

This is a blockchain emulator, that applies the CAP (Consistancy, Availability & Partition ) theorem,
build using Nodejs, React, Webpack and Electron.

# Scriptchain
consists of a network for commmunication amongst nodes in the network.

any node in the network can be online/offline as long as there is a required odd number of nodes needed,
the blockchain will remain unaffected.

nodes can add enduser transactions to the tranaction pool, mine a block using PoW (Proof Of Work) and propose the latter
to all nodes in the network, nodes in network will not accept proposed block, if block is mined by an illict node in the network.

nodes can determine with chain is correct via a consenus method where nodes calculate how many nodes have the same
hasedchain version of the blockchain, if node particpates in consesnus operation any node holding a hashedchain rejected by the majority nodes,
such node(s) blockchain, last block mined, transactions in transaction pool and genesis block will be replaced with the correct ones.

any node that successfully mines a block and it is accepted is rewarded with some script coin, a transaction is added automatically to 
the transaction pool recipient being the successful node.

