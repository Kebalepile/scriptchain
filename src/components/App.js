
import React, { Fragment } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Navigation from './navbar/Navbar'
import NodeURLs from './networkNodes/NodeURL'
import Main from './pages/Main'
import Blockchain from './pages/Blockchain'
import NetworkNodes from './pages/NetworkNodes'
import Consensus from './pages/Consensus'
import Transaction from './pages/Transaction'
import Mine from './pages/Mine'
import State from '../context/scriptchain/State'

const App = () => {
	return (
		
			<State>
				<BrowserRouter>
				<Fragment>
					<Navigation />
					<NodeURLs />
					<Switch>
						<Route exact path="/" component={Main} />
						<Route exact path="/blockchain" component={Blockchain} />
						<Route exact path="/networknodes" component={NetworkNodes} />
						<Route exact path="/consensus" component={Consensus} />
						<Route exact path="/transaction" component={Transaction} />
						<Route exact path="/mine" component={Mine} />

					</Switch>
				</Fragment>
			</BrowserRouter>
			</State>
		 
	)
}

export default App
