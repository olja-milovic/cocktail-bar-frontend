import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import InputBase from '@material-ui/core/InputBase';
import { makeStyles } from '@material-ui/core/styles';
import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';

import { QueryContext } from '../../utils/contexts';
import { getUrlParams } from '../../utils/service';

export default function Search(props) {
	const classes = searchBarStyles();

	const {query, setQuery} = useContext(QueryContext);

	const [search, setSearch] = useState('');

	useEffect(() => setSearch(getUrlParams().search), []);

	const handleChange = event => {
		setQuery({...query, ...{search: event.target.value}});
		setSearch(event.target.value);
	};

	const handleClearClick = () => {
		if (search === '') {
			return;
		}

		setSearch('');

		if (getUrlParams().search) {
			setQuery({...query, ...{search: ''}});
			props.onSubmit();
		}
	};

	const handleSearchClick = () => search !== '' && props.onSubmit();
	const handleKeyDown = event => (search !== '' && event.keyCode === 13) && props.onSubmit();

	return (
		<div className={classes.search}>
			{
				search !== '' && <ClearIcon className={`${classes.icon} ${classes.clearIcon}`}
				                            onClick={handleClearClick}/>
			}

			<SearchIcon className={`${classes.icon} ${classes.searchIcon}`} onClick={handleSearchClick}/>

			<InputBase placeholder="Search…"
			           value={search}
			           classes={{
				           input: classes.input,
			           }}
			           onChange={handleChange}
			           onKeyDown={handleKeyDown}/>
		</div>
	);
}

Search.propTypes = {
	onSubmit: PropTypes.func,
};

const searchBarStyles = makeStyles(theme => ({
	search: {
		margin: theme.spacing(2),
		position: 'relative',
		borderRadius: theme.spacing(2.5),
		backgroundColor: theme.palette.background.default,
	},
	icon: {
		padding: theme.spacing(0.75, 0),
		zIndex: 1,
		cursor: 'pointer',
		width: theme.spacing(4.25),
		height: '100%',
		position: 'absolute',
		transition: theme.transitions.create('background-color', {duration: 100}),

		'&:hover': {
			backgroundColor: theme.palette.action.hover,
		},
		'&:active': {
			backgroundColor: theme.palette.action.selected,
		},
	},
	clearIcon: {
		right: theme.spacing(4.25),
	},
	searchIcon: {
		right: 0,
		borderRadius: theme.spacing(0, 2.5, 2.5, 0),
	},
	input: {
		padding: theme.spacing(1, 10, 1, 2),
		transition: theme.transitions.create('width'),
	},
}));
