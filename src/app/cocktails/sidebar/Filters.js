import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import EmptyView from '../../common/EmptyView';
import Filter from './Filter';
import SkeletonFilter from './SkeletonFilter';
import Notification from '../../common/Notification';

export default function Filters(props) {
	const classes = filtersStyles();

	const [filters, setFilters] = React.useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		const getFilters = async () => {
			const result = await axios(`${process.env.REACT_APP_URL}/filters`)
				.catch(() => setError(true));

			setFilters(result?.data?.message || []);
			setLoading(false);
		};

		getFilters();
	}, []);

	return (
		<Fragment>
			{
				error &&
				<Notification message={'An error occurred while fetching filters.'}
				              onClose={() => setError(false)}/>
			}
			{
				!loading && filters.length === 0 &&
				<EmptyView heading={'No filters found'}
				           message={'Try refreshing the page'}/>
			}
			<AppBar position="relative" color="default" className={classes.headbar}>
				<Toolbar className={classes.toolbar}>
					{
						loading &&
						Array(8).map((_, i) => <SkeletonFilter key={`skeleton-${i}`}/>)
					}
					{
						!loading &&
						filters.map((filter, i) => {
							const result = [];
							result.push(<Filter
								key={`${filter.name}-${i}`}
								name={filter.name}
								label={filter.label}
								onClick={props.onSubmit}
								values={filter.value || []}
							/>);
							i !== filters.length - 1 &&
							result.push(<Divider key={i} orientation="horizontal" className={classes.divider}/>);
							return result;
						})
					}
				</Toolbar>
			</AppBar>
		</Fragment>
	);
}

Filters.propTypes = {
	onSubmit: PropTypes.func,
};

const filtersStyles = makeStyles(theme => ({
	headbar: {
		flex: 1,
		height: 'inherit',
		overflow: 'auto',
		boxShadow: 'none',
		backgroundColor: 'transparent',
	},
	toolbar: {
		display: 'flex',
		flexDirection: 'column',
		padding: theme.spacing(0, 2),
	},
	divider: {
		width: '100%',
	},
}));
