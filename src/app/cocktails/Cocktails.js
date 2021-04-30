import React, { useEffect } from 'react';
import DocumentMeta from 'react-document-meta';

import { makeStyles } from '@material-ui/core/styles';
import { getUrlParams } from '../utils/service';

import CardGrid from './CardGrid';
import Header from '../common/Header';
import { QueryContext, SidebarContext } from '../utils/contexts';

export default function Cocktails() {
	const classes = mainStyles();

	const [sidebarOpen, setSidebarOpen] = React.useState(false);
	const [query, setQuery] = React.useState(getUrlParams());
	const [metadata, setMetadata] = React.useState(getUrlParams());

	useEffect(() => setMetadata({
		title: 'Search & Filter Cocktails - Den of Thieves',
		description: 'An extensive collection of cocktails made by the best mixologists in the world. ' +
			'Search and filter the entire collection by spirit, liqueur, wine, mixer or any other keyword.',
	}), []);

	return (
		<SidebarContext.Provider value={{sidebarOpen, setSidebarOpen}}>
			<DocumentMeta {...metadata}/>

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
