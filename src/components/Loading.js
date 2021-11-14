import React from 'react';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		[theme.breakpoints.up('md')]: {
			position: 'absolute',
			left: '50%',
			top: '50%',
			transform: 'translate(-50%, -50%)'
		}
	},
	paper: {
		paddingLeft: theme.spacing(6),
		paddingRight: theme.spacing(6),
		paddingTop: theme.spacing(2),
		paddingBottom: theme.spacing(2)
	}
}));

const Loading = () => {
	const classes = useStyles();
	return (
		<Box className={classes.root}>
			<Paper>
				<Typography className={classes.paper} variant="h6" color="primary">
					Loading...
				</Typography>
			</Paper>
		</Box>
	);
};

export default Loading;
