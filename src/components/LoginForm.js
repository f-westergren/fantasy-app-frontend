import React, { useState } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { useAuth } from './context/auth';
import getFromToken from '../utils';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
const API_URL = process.env.REACT_APP_API_URL;

const useStyles = makeStyles((theme) => ({
	root: {
		'& .MuiTextField-root': {
			margin: theme.spacing(1),
			width: '40ch'
		},
		[theme.breakpoints.up('md')]: {
			position: 'absolute',
			left: '50%',
			top: '50%',
			transform: 'translate(-50%, -50%)'
		},
		backgroundColor: '#FFF',
		padding: theme.spacing(2)
	},
	paper: {
		padding: theme.spacing(2)
	},
	warning: {
		textAlign: 'center',
		color: 'red'
	}
}));

export default function LoginForm() {
	const classes = useStyles();
	const history = useHistory();
	const { authToken, setAuthToken } = useAuth();
	const [ formData, setFormData ] = useState({ username: '', password: '' });
	const [ error, setError ] = useState(false);

	const user = getFromToken(authToken, 'username');

	if (user) return <Redirect to="/" />;

	const handleChange = (e) => {
		let { name, value } = e.target;
		setFormData((data) => ({
			...data,
			[name]: value
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			setError(false);
			const res = await axios.post(`${API_URL}/login`, formData);
			setAuthToken(res.data.token);
			history.push('/picks');
		} catch (err) {
			console.log('error', err);
			if (err.response.data.message) {
				setError(err.response.data.message)
			} else {
				setError('Something went wrong :(')
			}
			
		}
	};

	return (
		<Grid className={classes.root}>
			<form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
				<Grid item xs={12}>
					<TextField
						required
						id="outlined"
						label="Username"
						variant="outlined"
						name="username"
						value={formData['username']}
						onChange={handleChange}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						required
						id="outlined-password-input"
						label="Password"
						type="password"
						autoComplete="current-password"
						variant="outlined"
						name="password"
						value={formData['password']}
						onChange={handleChange}
					/>
				</Grid>
				<Grid className={classes.warning} color="secondary" item xd={12}>
					<span>{error}</span>
				</Grid>
				<Grid item xs={12}>
					<Button color="secondary" href="/">
						Cancel
					</Button>
					<Button type="submit" color="primary">
						Login
					</Button>
				</Grid>
			</form>
		</Grid>
	);
}
