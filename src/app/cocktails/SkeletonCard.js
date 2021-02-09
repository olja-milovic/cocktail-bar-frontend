import React from 'react';

import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';

import { getCardHeight, getCardWidth } from '../utils/constants';

export default function SkeletonCard() {
	const classes = skeletonCardStyles();

	return (
		<Card raised={true} className={classes.card} elevation={0}>
			<div className={classes.description}>

				<div className={`${classes.highlight} ${classes.title}`} />

				<div className={classes.info}>
					<div className={`${classes.highlight} ${classes.image}`} />
					<div className={`${classes.highlight} ${classes.image}`} />
				</div>

				<div className={classes.chips}>
					<div className={`${classes.highlight} ${classes.chip} ${classes.topChip}`} />
					<div className={`${classes.highlight} ${classes.chip}`} />
					<div className={`${classes.highlight} ${classes.chip}`} />
				</div>
			</div>

			<div className={`cocktail-fade ${classes.fade}`}/>
		</Card>
	);
}

const skeletonCardStyles = makeStyles(theme => ({
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
	card: {
		position: 'relative',
		minWidth: getCardWidth(theme.spacing),
		maxWidth: getCardWidth(theme.spacing),
		height: getCardHeight(theme.spacing),
		borderRadius: theme.spacing(2),
	},
	actions: {
		padding: 0,
		boxSizing: 'initial',
	},
	description: {
		position: 'absolute',
		width: '100%',
		top: getCardWidth(theme.spacing),
		display: 'flex',
		flexDirection: 'column',
		padding: theme.spacing(2),
		alignItems: 'center',
	},
	title: {
		width: '100%',
		height: theme.spacing(3.5),
		marginBottom: '0.35em',
	},
	info: {
		width: '95%',
		marginBottom: theme.spacing(1.5),
		padding: theme.spacing(0, 2),
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	image: {
		width: theme.spacing(3.75),
		height: theme.spacing(3.75),
		animationDelay: '0.2s',
	},
	chips: {
		textAlign: 'center',
		display: 'inline-flex',
		flexWrap: 'wrap',
		width: 'inherit',
	},
	chip: {
		margin: theme.spacing(0.25),
		height: theme.spacing(4),
		flex: 1,
		borderRadius: theme.spacing(2),
		animationDelay: '0.6s',
	},
	topChip: {
		minWidth: `calc(100% - ${theme.spacing(0.5)}px)`,
		animationDelay: '0.4s',
	},
	fade: {
		position: 'absolute',
		bottom: 0,
		width: '100%',
		height: theme.spacing(6.25),
		background: `linear-gradient(to bottom, ${theme.palette.custom.cocktailCard.fadeFrom}, ${theme.palette.custom.cocktailCard.fadeTo} 100%)`,
		transition: theme.transitions.create(['opacity'], {duration: 250}),
	},
}));
