import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import Header from '../common/Header';

export default function AdminLogin (props) {
	const classes = loginFormStyles();

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);

	const userLogin = e => {
		e.preventDefault();
		setLoading(true);

		if (username && password) {
			axios.post(`${process.env.REACT_APP_URL}/admin/login`, {username: username, password: password})
				.then(res => res.data.message)
				.then(token => props.onLogin(token.access_token, true))
				.catch(() => {
					setLoading(false);
					props.onLogin(null, false);
				});
		}
	};

	return (
		<>
			<Header hasSidebar={false}/>

			<Paper elevation={1} className={classes.paper}>
				<form name="login-form" className={classes.form} onSubmit={userLogin}>
					<Typography variant="h5">Admin Panel Login</Typography>
					<TextField required
					           defaultValue={username}
					           onChange={e => setUsername(e.target.value)}
					           label="Username"
					           variant="outlined"/>
					<TextField required
					           defaultValue={password}
					           onChange={e => setPassword(e.target.value)}
					           label="Password"
					           type="password"
					           variant="outlined"/>
					<Button disabled={loading}
					        aria-label="Login"
					        variant="contained"
					        color="primary"
					        size="large"
					        type="submit">Login</Button>
				</form>
			</Paper>
		</>
	);
}

AdminLogin.propTypes = {
	onLogin: PropTypes.func,
};

const loginFormStyles = makeStyles(theme => ({
	paper: {
		display: 'flex',
		margin: theme.spacing(12.5, 'auto'),
		width: theme.spacing(62.5),
		height: theme.spacing(50),
	},
	form: {
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-evenly',
		alignItems: 'center',
	},
}));
