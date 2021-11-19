import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import SportsFootballIcon from '@material-ui/icons/SportsFootball';
import Button from '@material-ui/core/Button';
// import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { useAuth } from './context/auth';
import getFromToken from '../utils';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1
	},
	menuButton: {
		marginRight: theme.spacing(2)
	},
	title: {
		flexGrow: 1
	}
}));

export default function MenuAppBar() {
	const { authToken, setAuthToken } = useAuth();
	const history = useHistory();
	const classes = useStyles();
	const [ anchorEl, setAnchorEl ] = React.useState(null);
	const open = Boolean(anchorEl);

	const user = getFromToken(authToken, 'username');

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const logout = () => {
		setAuthToken();
		history.push('/');
	};

	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar>
					{user && (
						<>
						<div>
							<IconButton
								aria-label="account of current user"
								aria-controls="menu-appbar"
								aria-haspopup="true"
								onClick={handleMenu}
								color="inherit"
							>
								<SportsFootballIcon />
							</IconButton>
							<Menu
								id="menu-appbar"
								anchorEl={anchorEl}
								anchorOrigin={{
									vertical: 'top',
									horizontal: 'right'
								}}
								keepMounted
								transformOrigin={{
									vertical: 'top',
									horizontal: 'right'
								}}
								open={open}
								onClose={handleClose}
							>
								{/* <MenuItem onClick={handleClose}>Current Week</MenuItem> */}
							</Menu>
						</div>
					
					<Typography variant="h6" className={classes.title} />
					<Button color="inherit" href="/score">
						Score
					</Button>
					<Button color="inherit" href="/picks">
						My Picks
					</Button>
					<Button color="inherit" onClick={logout}>
						Logout
					</Button>
					</>
					)}
					{!user && 
						<div>
							<Button color="inherit" href="/login">Login</Button>
							<Button color="inherit" href="/signup">Sign up</Button>
						</div>
					}
				</Toolbar>
			</AppBar>
		</div>
	);
}