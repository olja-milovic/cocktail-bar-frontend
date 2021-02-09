import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';

import logoDark from '../../assets/images/logo-dark.png';
import logoLight from '../../assets/images/logo-light.png';
import { THEMES } from '../utils/constants';
import { SidebarContext, ThemeContext } from '../utils/contexts';
import ThemeToggle from './ThemeToggle';

export default function Header(props) {
	const classes = headerStyles();

	const {theme} = useContext(ThemeContext);
	const {sidebarOpen, setSidebarOpen} = useContext(SidebarContext);

	const [logo, setLogo] = React.useState({});

	useEffect(() => setLogo(theme === THEMES.light ? logoLight : logoDark), [theme]);

	const handleSidebarToggle = () => setSidebarOpen(!sidebarOpen);

	return (
		<AppBar position="sticky" color="inherit" elevation={2}>
			<Toolbar className={classes.toolbar}>
				<div className={classes.menu}>
					{
						props.hasSidebar &&
						<IconButton edge="start" onClick={handleSidebarToggle} className={classes.menuButton}>
							<MenuIcon/>
						</IconButton>
					}
					<img src={logo} className={classes.logo}/>
				</div>
				<ThemeToggle/>
			</Toolbar>
		</AppBar>
	);
}

Header.propTypes = {
	hasSidebar: PropTypes.bool,
};

const headerStyles = makeStyles(theme => ({
	menu: {
		display: 'flex',
		alignItems: 'center',
	},
	menuButton: {
		marginRight: theme.spacing(2),
		[theme.breakpoints.up('sm')]: {
			display: 'none',
		},
	},
	toolbar: {
		justifyContent: 'space-between',
		minHeight: theme.spacing(6.25),
	},
	logo: {
		height: theme.spacing(2),
	},
}));
