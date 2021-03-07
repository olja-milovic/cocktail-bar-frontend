import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

export default function SkeletonCocktail() {
	const classes = skeletonCocktailStyles();

	return (
		<>
			<div className={`${classes.highlight} ${classes.title}`} />

			<Paper elevation={0} className={classes.container}>
				<div className={classes.image}/>

				<div className={classes.info}>
					<div className={`${classes.highlight} ${classes.details}`}/>
					<div className={`${classes.highlight} ${classes.preparation}`}/>
					<div className={`${classes.highlight} ${classes.table}`}/>
				</div>
			</Paper>
		</>
	);
}

const skeletonCocktailStyles = makeStyles(theme => ({
	'@keyframes skeleton': {
		'0%': {
			opacity: 0.2,
			transform: 'translateY(4px) scale(0.98)',
		},
		'85%, 100%': {
			opacity: 1,
			transform: 'translateY(0) scale(1)',
		},
	},
	highlight: {
		animation: '$skeleton 1s ease-in-out infinite',
		animationDirection: 'alternate-reverse',
		backgroundColor: theme.palette.action.focus,
		borderRadius: theme.spacing(1),
	},
	title: {
		textAlign: 'center',
		margin: theme.spacing(2, 'auto'),
		height: theme.spacing(4.375),
		maxWidth: theme.spacing(50),
		width: '90%',
	},
	container: {
		position: 'relative',
		margin: theme.spacing(0, 'auto'),
		width: '100%',
		maxWidth: theme.spacing(62.5),

		[theme.breakpoints.up('sm')]: {
			borderRadius: theme.spacing(2),
			marginBottom: theme.spacing(2),
		},
	},
	image: {
		width: '100%',
		paddingTop: '100%',
	},
	info: {
		padding: theme.spacing(2),
	},
	details: {
		height: theme.spacing(10.875),
		borderRadius: theme.spacing(2),
		padding: theme.spacing(2),
		marginBottom: theme.spacing(2),
		animationDelay: '0.2s',
	},
	preparation: {
		height: theme.spacing(5),
		margin: theme.spacing(2, 1),
		animationDelay: '0.4s',
	},
	table: {
		height: theme.spacing(19.5),
		animationDelay: '0.6s',
	},
}));
