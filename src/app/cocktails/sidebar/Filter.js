import React, { useContext, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import { FormControlLabel } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';

import { QueryContext } from '../../utils/contexts';
import { getUrlParams } from '../../utils/service';

export default function Filter(props) {
	const classes = filterStyles();

	const isFirstRun = useRef(true);
	const {query, setQuery} = useContext(QueryContext);

	const [selected, setSelected] = useState([]);
	const [clicked, setClicked] = useState(false);

	useEffect(() => setSelected(getUrlParams().ingredients[props.label] || []), []);

	useEffect(() => {
		if (isFirstRun.current) {
			isFirstRun.current = false;
			return;
		}
		props.onClick();
	}, [clicked]);

	const updateQuery = selected => {
		const newValue = {...query.ingredients, ...{[props.label]: selected}};
		const ingredients = Object.fromEntries(
			Object.entries({...query.ingredients, ...newValue})
				// eslint-disable-next-line no-unused-vars
				.filter(([key, value]) => value.length > 0),
		);
		setQuery({...query, ...{ingredients}});
	};

	const handleCheckboxChange = e => {
		const value = e.target.value;
		let newSelected = [...selected];

		if (selected.includes(value)) {
			newSelected = selected.filter(s => s !== value);
		} else {
			newSelected.push(value);
		}

		updateQuery(newSelected);
		setSelected(newSelected);
	};

	const handleClear = () => {
		if (selected.length === 0) {
			return;
		}
		updateQuery([]);
		setSelected([]);
		setClicked(!clicked);
	};

	return (
		<FormControl className={classes.formControl}>
			<div className={classes.heading}>
				<div className={classes.title}>
					<Typography component="h6" variant="h6" className={classes.label}>{props.name}</Typography>
					<Typography className={classes.numOfSelected}>{selected.length}</Typography>
				</div>
				<a role="button" onClick={handleClear} className={classes.clear}>Clear</a>
			</div>

			<div className={classes.container}>
				{
					props.values.map((value, key) => (
						<FormControlLabel
							key={key}
							label={value}
							title={value}
							className={classes.checkbox}
							control={
								// using native checkbox for speed
								<input type="checkbox"
								       checked={selected.includes(value)}
								       onChange={handleCheckboxChange}
								       onClick={() => setClicked(!clicked)}
								       value={value}/>
							}/>
					))
				}
			</div>
		</FormControl>
	);
}

Filter.propTypes = {
	onClick: PropTypes.func,
	label: PropTypes.string,
	name: PropTypes.string,
	values: PropTypes.array,
};

const filterStyles = makeStyles(theme => ({
	formControl: {
		width: '100%',
	},
	heading: {
		display: 'flex',
		alignItems: 'baseline',
		justifyContent: 'space-between',
	},
	title: {
		display: 'flex',
		alignItems: 'baseline',
	},
	label: {
		margin: theme.spacing(1, 0),
		color: theme.palette.text.secondary,
	},
	numOfSelected: {
		fontWeight: 'bold',
		marginLeft: theme.spacing(1),
		borderRadius: theme.spacing(1),
		padding: theme.spacing(0.25, 0.75),
		backgroundColor: theme.palette.background.default,
	},
	clear: {
		cursor: 'pointer',
		borderRadius: theme.spacing(1),
		padding: theme.spacing(0.25, 0.75),
		color: theme.palette.text.secondary,
		transition: theme.transitions.create('background-color', {duration: 100}),

		'&:hover': {
			backgroundColor: theme.palette.action.hover,
		},
		'&:active': {
			backgroundColor: theme.palette.action.selected,
		},
	},
	container: {
		display: 'flex',
		flexDirection: 'column',
		maxHeight: theme.spacing(21.25),
		overflow: 'auto',
		marginBottom: theme.spacing(2.5),
	},
	checkbox: {
		marginLeft: 'inherit',
		padding: theme.spacing(0.375),

		'& .MuiFormControlLabel-label': {
			overflow: 'hidden',
			whiteSpace: 'nowrap',
			textOverflow: 'ellipsis',
		},

		'& input': {
			marginRight: theme.spacing(1),
		},
	},
}));
