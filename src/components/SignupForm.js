import React, { useState } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { useAuth } from './context/auth';
import getFromToken from '../utils';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const useStyles = makeStyles((theme) => ({
	root: {
		'& .MuiTextField-root': {
			margin: theme.spacing(1),
			width: 275
		}
	},
	button: {
		margin: theme.spacing(1),
		borderRadius: '5em',
		color: 'darkgreen',
		backgroundColor: 'white'
	},
	paper: {
		padding: theme.spacing(2)
	},
	center: {
		textAlign: 'center'
	},
	warning: {
		textAlign: 'center',
		color: 'red'
	}
}));

export default function SignupForm() {
	const classes = useStyles();
	const history = useHistory();
	const { authToken, setAuthToken } = useAuth();
	const [ formData, setFormData ] = useState('');
	const [ error, setError ] = useState(false);

	const user = getFromToken(authToken, 'username');

	if (user) return <Redirect to="/" />;

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((data) => ({
			...data,
			[name]: value
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.post(`${API_URL}/users`, formData)
			setAuthToken(res.data.token);
			history.push('/picks');
		} catch (err) {
			console.log(err)
			if (err.response.data.message) {
				setError(err.response.data.message)
			} else {
				setError('Something went wrong :(')
			}
		}
	};

	return (
		<Grid container spacing={0} direction="row" alignItems="center" justify="center" style={{ minHeight: '100vh' }}>
			<Paper className={classes.paper}>
				<form className={classes.root} onSubmit={handleSubmit} noValidate autoComplete="off">
					<Grid item xs={12}>
						<TextField
							required
							id="username"
							label="Username"
							variant="outlined"
							name="username"
							onChange={handleChange}
							value={formData['name']}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							required
							id="password-input"
							label="Password"
							type="password"
							variant="outlined"
							name="password"
							onChange={handleChange}
							value={formData['name']}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							required
							id="repeat-password-input"
							label="Repeat Password"
							type="password"
							variant="outlined"
							name="repeat_password"
							onChange={handleChange}
							value={formData['name']}
						/>
					</Grid>
					<Grid className={classes.warning} color="secondary" item xd={12}>
						<span>{error}</span>
					</Grid>
					<Grid item xs={12}>
						<Button className={classes.button} href="/">
							Cancel
						</Button>
						<Button className={classes.button} type="submit">
							Sign up
						</Button>
					</Grid>
				</form>
			</Paper>
		</Grid>
	);
}
