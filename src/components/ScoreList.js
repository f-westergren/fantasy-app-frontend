import React, { useState, useEffect } from 'react';
import ScoreCard from './ScoreCard';
import Loading from './Loading';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
const API_URL = process.env.REACT_APP_API_URL;

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		justifyContent: 'center'
	},
	card: {
		padding: theme.spacing(2),
		maxWidth: 275,
		justifyContent: 'center'
	}
}));

const ScoreList = () => {
	const classes = useStyles();
	const [ rosters, setRosters ] = useState([]);
	const [ points, setPoints ] = useState([]);
	const [ isLoading, setIsLoading ] = useState(true);
	const [ error, setError ] = useState(false);

	useEffect(() => {
		const getRosters = async () => {
			try {
				const res = await axios.get(`${API_URL}/picks`);
				setRosters(res.data);
				setIsLoading(false);
			} catch (err) {
				setError(err);
			}
		};
		getRosters();
	}, []);

	useEffect(() => {
		const getPoints = async () => {
			try {
				const res = await axios.get(`${API_URL}/rosters?scores=true`);
				setPoints(res.data.scores);
			} catch (err) {
				setError(err);
			}
		};
		getPoints();
	}, []);

	if (isLoading) return <Loading />;
	if (error) return <div>Can't get scores right now.</div>;

	return (
		<Grid container className={classes.root}>
			<Grid item xs={12}>
				{rosters.map((r) => (
					<ScoreCard
						className={classes.card}
						roster={r.roster}
						points={points}
						score={Math.round((r.score + Number.EPSILON) * 100) / 100}
						username={r.username}
						key={r.username}
					/>
				))}
			</Grid>
		</Grid>
	);
};

export default ScoreList;
