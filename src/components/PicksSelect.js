import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(2),
		fullWidth: true,
		display: 'flex',
		wrap: 'nowrap'
	}
}));

const PicksSelect = ({ position, name, label, value, handleChange }) => {
	const idLabel = label.toLowerCase().replace(' ', '-');
	const classes = useStyles();
	return (
		<FormControl className={classes.formControl}>
			<InputLabel id={idLabel + '-label'}>{label}</InputLabel>
			<Select labelId={idLabel + '-label'} id={idLabel} name={name} value={value} onChange={handleChange}>
				{position.map((player) => (
					<MenuItem value={player} key={`${player}`}>
						{player}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};

export default PicksSelect;
