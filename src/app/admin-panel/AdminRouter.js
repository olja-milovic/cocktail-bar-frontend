import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Redirect, Route, BrowserRouter as Router } from 'react-router-dom';

import Notification from '../common/Notification';
import { createTokenHeader } from '../utils/service';
import AdminPanel from './AdminPanel';
import AdminLogin from './AdminLogin';
import { TOKEN } from '../utils/constants';

const source = axios.CancelToken.source();

export default function AdminRouter() {

	const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem(TOKEN));
	const [error, setError] = useState(false);

	useEffect(() => {
		if (localStorage.getItem(TOKEN)) {
			axios.get(`${process.env.REACT_APP_URL}/admin/token`, {
				cancelToken: source.token,
				headers: createTokenHeader(),
			})
				.then(res => res.data.message)
				.then(isValid => {
					!isValid && localStorage.removeItem(TOKEN);
					setLoggedIn(isValid);
				})
				.catch(() => {
					localStorage.removeItem(TOKEN);
					setLoggedIn(false);
				});
		}

		return () => source.cancel();
	}, []);

	const loginSuccessful = (token, value) => {
		value ? localStorage.setItem(TOKEN, token) : setError(true);
		setLoggedIn(value);
	};

	return (
		<Router>
			<Route path="/admin">
				{
					!loggedIn ? <Redirect exact to="/admin/login"/> : <AdminPanel/>
				}
			</Route>

			<Route exact path="/admin/login">
				{
					!loggedIn ?
						<AdminLogin onLogin={(token, value) => loginSuccessful(token, value)}/> :
						<Redirect exact to="/admin/panel"/>
				}
			</Route>
			{
				error && <Notification message={'Invalid credentials.'} onClose={() => setError(false)}/>
			}
		</Router>
	);
}
