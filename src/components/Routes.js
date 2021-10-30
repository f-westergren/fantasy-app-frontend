import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Container from '@material-ui/core/container';
import LoginForm from './LoginForm';
import NotFound from './NotFound';
import PicksForm from './PicksForm';
import NavBar from './NavBar';
import ScoreList from './ScoreList';
import PrivateRoute from './PrivateRoute';
import { AuthContext } from './context/auth';
import SignupForm from './SignupForm';

const Routes = () => {
	const existingToken = localStorage.getItem('token');
	const [ authToken, setAuthToken ] = useState(existingToken);

	const setToken = (token) => {
		if (!token) {
			localStorage.removeItem('token');
		} else {
			localStorage.setItem('token', token);
		}
		setAuthToken(token);
	};

	return (
		<AuthContext.Provider value={{ authToken, setAuthToken: setToken }}>
			<BrowserRouter>
				<NavBar />
				<Container maxWidth="md">
					<Switch>
						<Route exact path="/" component={LoginForm} />
						<Route exact path="/login" component={LoginForm} />
						<Route exact path="/signup" component={SignupForm} />
						<PrivateRoute exact path="/picks" component={PicksForm} />
						<PrivateRoute exact path="/score" component={ScoreList} />
						<Route component={NotFound} />
					</Switch>
				</Container>
			</BrowserRouter>
		</AuthContext.Provider>
	);
};

export default Routes;
