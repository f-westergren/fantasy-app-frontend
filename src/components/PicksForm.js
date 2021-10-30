import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { useAuth } from './context/auth';
import getFromToken from '../utils';
import axios from 'axios';
import Loading from './Loading';
import PicksSelect from './PicksSelect';

const API_URL = process.env.REACT_APP_API_URL;

const useStyles = makeStyles((theme) => ({
	button: {
		margin: theme.spacing(2)
	},
	paper: {
		padding: theme.spacing(2)
	},
	root: {
		[theme.breakpoints.up('md')]: {
			position: 'absolute',
			left: '50%',
			top: '50%',
			transform: 'translate(-50%, -50%)'
		}
	},
	warning: {
		textAlign: 'center',
		color: 'red'
	}
}));

const initialState = {
	QB: ["",""],
	RB: ["",""],
	WR: ["",""],
	TE: ["",""],
	DST: ["",""]
}

const PicksForm = () => {
	const history = useHistory();
	const classes = useStyles();
	const [ formData, setFormData ] = useState(initialState);
	const [ isUpdating, setIsUpdating ] = useState(false);
	const [ isLoading, setIsLoading ] = useState(true);
	const [ error, setError ] = useState(false);
	const [ roster, setRoster ] = useState({});

	const { authToken } = useAuth();
	const username = getFromToken(authToken, 'username');

	useEffect(() => {
		const getRoster = async () => {
			try {
				const res = await axios.get(`${API_URL}/rosters?lineup=true`);
				setRoster(res.data);
				setIsLoading(false);
			} catch (err) {
				setError({ type: 'load', message: "Can't get picks right now." });
			}
		};
		getRoster();
	}, []);

	useEffect(
		() => {
			const getPicks = async () => {
				try {
					const res = await axios.get(`${API_URL}/picks/${username}`);
					if (res) {
						setFormData(JSON.parse(res.data.roster));
						setIsUpdating(true);
					}
				} catch (err) {
					setError({ type: 'load', message: "Can't get picks right now." });
				}
			};
			getPicks();
		},
		[ username ]
	);

	const handleChange = (e) => {
		let { name, value } = e.target;

		// Get poisiton name and value
		const pos = name.split('_')[1]
		let newValue = formData[pos]
		
		// If pick is best pick or worst pick.
		if (name[0] === 'b') {
			newValue[0] = value
		} else if (name[0] === 'w') {
			newValue[1] = value
		}
		
		setFormData((data) => ({
			...data,
			[pos]: newValue
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			if (isUpdating) {
				await axios.patch(`${API_URL}/picks`, {
					username,
					roster: JSON.stringify(formData)
				});
			} else { 
				await axios.post(`${API_URL}/picks`, {
					username,
					roster: JSON.stringify(formData),
					week: 10
				});
			}
			history.push('/score');
		} catch (err) {
			console.log('err', err);
			// setError({ type: 'picks', message: err.response.data.message });
		}
	};
	if (isLoading) return <Loading />;
	if (error.type === 'load') return <div>{error.message}</div>;

	return (
		<Box className={classes.root}>
			<Paper className={classes.paper}>
				<form onSubmit={handleSubmit}>
					<Grid container m={12} justify="flex-end">
						{Object.keys(roster.lineup).map((pos, idx) => (
							<React.Fragment key={`${pos}-${idx}`}>
								<Grid item sm={6} xs={12}>
									<PicksSelect
										handleChange={handleChange}
										value={formData[pos][0]}
										position={roster.lineup[pos]}
										label={`Best ${pos}`}
										name={`best_${pos}`}
										key={`best_${idx}`}
									/>
								</Grid>
								<Grid item sm={6} xs={12} key={`grid2${idx}`}>
									<PicksSelect
										handleChange={handleChange}
										value={formData[pos][1]}
										position={roster.lineup[pos]}
										label={`Worst ${pos}`}
										name={`worst_${pos}`}
										key={`worst_${idx}`}
									/>
								</Grid>
							</React.Fragment>
						))}
						<Grid item>
							<Button variant="contained" color="secondary" href="/">
								Cancel
							</Button>
							<Button className={classes.button} variant="contained" color="primary" type="submit">
								{isUpdating ? 'Update' : 'Submit'}
							</Button>
						</Grid>
					</Grid>
				</form>
				<Grid item xs={12}>
					<span className={classes.warning}>{error.message}</span>
				</Grid>
			</Paper>
		</Box>
	);
};

export default PicksForm;
