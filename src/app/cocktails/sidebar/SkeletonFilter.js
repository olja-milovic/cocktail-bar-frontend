import React  from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

export default function SkeletonFilter() {
	const classes = skeletonFilterStyles();

	return (
		<Paper elevation={0} className={classes.formControl}>
			<div className={classes.heading}>
				<div className={classes.title}>
					<div className={`${classes.highlight} ${classes.label}`}/>
					<div className={`${classes.highlight} ${classes.numOfSelected}`}/>
				</div>
				<div className={`${classes.highlight} ${classes.clear}`}/>
			</div>

			<div className={`${classes.highlight} ${classes.container}`}/>
		</Paper>
	);
}

const skeletonFilterStyles = makeStyles(theme => ({
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
	formControl: {
		width: '100%',
	},
	heading: {
		height: theme.spacing(5.375),
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: theme.spacing(1, 0),
	},
	title: {
		width: '60%',
		display: 'flex',
		alignItems: 'baseline',
	},
	label: {
		width: '80%',
		height: theme.spacing(3.375),
		color: theme.palette.text.secondary,
	},
	numOfSelected: {
		marginLeft: theme.spacing(1),
		borderRadius: '50%',
		width: theme.spacing(3.375),
		height: theme.spacing(3.375),
	},
	clear: {
		borderRadius: theme.spacing(1),
		height: theme.spacing(2.625),
		width: theme.spacing(5),
	},
	container: {
		height: theme.spacing(18.125),
		marginBottom: theme.spacing(2.5),
		animationDelay: '0.2s',
	},
}));
