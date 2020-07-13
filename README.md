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



### Instructions

1 git clone https://github.com/Kebalepile/scriptchain.git
2 cd into folder
3 npm install (depending on your network speed electron may take time to install)
4 npm run scriptchain
5 play time



### optional
If you want to run app in production simply do npm run build && npm run postpackage, 
then cd into scriptchain/release-builds/(somefolder here, depends on your OS) and run the scriptchain.exe file.
To fully see what each node(s) properties use browser to via node(s) localhost url.

