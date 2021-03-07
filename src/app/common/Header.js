import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import logoDark from '../../assets/images/logo-dark.png';
import logoLight from '../../assets/images/logo-light.png';
import { THEMES } from '../utils/constants';
import { SidebarContext, ThemeContext } from '../utils/contexts';
import ThemeToggle from './ThemeToggle';

export default function Header (props) {
	const classes = headerStyles();

	const history = useHistory();
	const {theme} = useContext(ThemeContext);
	const {sidebarOpen, setSidebarOpen} = useContext(SidebarContext);

	const [logo, setLogo] = React.useState({});

	useEffect(() => setLogo(theme === THEMES.light ? logoLight : logoDark), [theme]);

	const handleSidebarToggle = () => setSidebarOpen(!sidebarOpen);
	const handleBackButtonClick = () => history.length > 1 ? history.goBack() : history.push('/');
	const handleLogoClick = () => window.location.href !== `${process.env.REACT_APP_URL}/` && history.push('/');

	return (
		<AppBar position="sticky" color="inherit" elevation={2}>
			<Toolbar className={classes.toolbar}>
				{
					props.hasBackButton &&
					<ArrowBackIosIcon onClick={handleBackButtonClick} className={classes.backButton}/>
				}
				{
					props.hasSidebar &&
					<IconButton edge="start"
					            aria-label="Back"
					            onClick={handleSidebarToggle}
					            className={classes.menuButton}>
						<MenuIcon/>
					</IconButton>
				}
				<img alt="logo"
				     width="141"
				     height="16"
				     loading="lazy"
				     onClick={handleLogoClick}
				     src={logo}
				     className={classes.logo}/>
				<ThemeToggle/>
			</Toolbar>
		</AppBar>
	);
}

Header.propTypes = {
	hasSidebar: PropTypes.bool,
	hasBackButton: PropTypes.bool,
	navigation: PropTypes.any,
};

const headerStyles = makeStyles(theme => ({
	backButton: {
		cursor: 'pointer',
		opacity: 0.7,
		transition: theme.transitions.create('opacity', {duration: 200}),

		'&:hover': {
			opacity: 1,
		},
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
		cursor: 'pointer',
		height: theme.spacing(2),
	},
}));
