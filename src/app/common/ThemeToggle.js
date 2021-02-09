import React, { useContext } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import WbSunnyOutlinedIcon from '@material-ui/icons/WbSunnyOutlined';
import NightsStayOutlinedIcon from '@material-ui/icons/NightsStayOutlined';

import { THEME, THEMES } from '../utils/constants';
import { ThemeContext } from '../utils/contexts';
import { getOtherTheme } from '../utils/service';

export default function ThemeToggle() {
	const classes = themeToggleStyles();

	const {theme, setTheme} = useContext(ThemeContext);

	const handleChange = () => {
		const otherTheme = getOtherTheme(theme);

		setTheme(otherTheme);
		localStorage.setItem(THEME, otherTheme);
	};

	return (
		theme === THEMES.light ?
			<WbSunnyOutlinedIcon onClick={handleChange} className={classes.switch}/> :
			<NightsStayOutlinedIcon onClick={handleChange} className={classes.switch}/>
	);
}

const themeToggleStyles = makeStyles(theme => ({
	switch: {
		cursor: 'pointer',
		opacity: 0.7,
		transition: theme.transitions.create('opacity', {duration: 200}),

		'&:hover': {
			opacity: 1,
		},
	},
}));
