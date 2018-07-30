import React from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom'
// import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Home from './user/home/Home';
import SignIn from './user/signin/Signin.js';
import App from './App';
import history from './user/history/history';
import Chat from './user/chat/chat.js'
import Search from "./user/home/Search.js";


// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
const Main = () => (
	<main>
		<Router history={history}>
			<Switch>
				<Route exact path='/' component={Home} />
				<Route path='/home' component={Home}/>
				<Route path='/signin' component={SignIn}/>
				<Route path='/chat' component={Chat}/>
				<Route path='/search' component={Search}/>
			</Switch>
		</Router>
	</main>
)

export default Main
