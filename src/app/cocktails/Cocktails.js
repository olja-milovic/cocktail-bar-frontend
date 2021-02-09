import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { getUrlParams } from '../utils/service';

import CardGrid from './CardGrid';
import Header from '../common/Header';
import { QueryContext, SidebarContext } from '../utils/contexts';

export default function Cocktails() {
	const classes = mainStyles();

	const [sidebarOpen, setSidebarOpen] = React.useState(false);
	const [query, setQuery] = React.useState(getUrlParams());

	return (
		<SidebarContext.Provider value={{sidebarOpen, setSidebarOpen}}>
			<Header hasSidebar={true}/>

			<main className={classes.main}>
				<QueryContext.Provider value={{query, setQuery}}>
					<CardGrid/>
				</QueryContext.Provider>
			</main>
		</SidebarContext.Provider>
	);
}

const mainStyles = makeStyles(theme => ({
	main: {
		display: 'flex',
	},
	filters: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		padding: theme.spacing(1, 12.5, 1.81),
		borderRadius: theme.spacing(2),
		marginTop: theme.spacing(4),
	},
}));
