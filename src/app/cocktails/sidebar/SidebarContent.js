import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import Filters from './Filters';
import Search from './Search';

export default function SidebarContent(props) {
	const classes = filterBarStyles();

	const [numOfResults, setNumOfResults] = useState('');

	useEffect(() => {
		const result = props.numOfResults === -1 ?
			'Calculating...' :
			`${props.numOfResults} cocktail${props.numOfResults === 1 ? '' : 's'}`;

		setNumOfResults(result);
	}, [props.numOfResults]);

	return (
		<>
			<div className={classes.heading}>
				<Typography component="h2" variant="h5">Filter</Typography>
				<Typography component="h3" variant="body1" className={classes.numOfResults}>{numOfResults}</Typography>
			</div>
			<Search onSubmit={props.onSubmit}/>
			<Filters onSubmit={props.onSubmit}/>
		</>
	);
}

SidebarContent.propTypes = {
	onSubmit: PropTypes.func,
	numOfResults: PropTypes.number,
};

const filterBarStyles = makeStyles(theme => ({
	heading: {
		textAlign: 'center',
		marginTop: theme.spacing(2),
	},
	numOfResults: {
		color: theme.palette.text.secondary,
	},
	filterButton: {
		margin: theme.spacing(2, 'auto'),
		width: theme.spacing(25),
	},
}));
