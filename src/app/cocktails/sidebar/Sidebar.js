import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { Drawer, Hidden } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { SIDEBAR_WIDTH } from '../../utils/constants';
import { SidebarContext } from '../../utils/contexts';
import SidebarContent from './SidebarContent';

export default function Sidebar(props) {
	const classes = filterBarStyles();

	const {sidebarOpen, setSidebarOpen} = useContext(SidebarContext);

	const content = <SidebarContent numOfResults={props.numOfResults} onSubmit={props.onSubmit}/>;

	return (
		<nav className={classes.drawer}>
			<Hidden smUp implementation="js">
				<Drawer container={window !== undefined ? () => window.document.body : undefined}
				        variant="temporary"
				        open={sidebarOpen}
				        onClose={() => setSidebarOpen(!sidebarOpen)}
				        classes={{
	                        paper: classes.drawerPaper,
				        }}
				        ModalProps={{
	                        keepMounted: true, // Better open performance on mobile.
				        }}>
					{content}
				</Drawer>
			</Hidden>
			<Hidden xsDown implementation="js">
				<Drawer variant="permanent"
				        open
				        classes={{
	                        paper: classes.permanentPaper,
		                }}>
					{content}
				</Drawer>
			</Hidden>
		</nav>
	);
}

Sidebar.propTypes = {
	onSubmit: PropTypes.func,
	numOfResults: PropTypes.number,
};

const filterBarStyles = makeStyles(theme => ({
	drawer: {
		[theme.breakpoints.up('sm')]: {
			width: SIDEBAR_WIDTH,
			flexShrink: 0,
		},
	},
	drawerPaper: {
		width: SIDEBAR_WIDTH,
	},
	permanentPaper: {
		display: 'flex',
		width: SIDEBAR_WIDTH,
		zIndex: 1000,
		top: theme.spacing(6.25),
		height: `calc(100% - ${theme.spacing(6.25)}px)`,
		overflowX: 'hidden',
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
	},
	headbar: {
		alignItems: 'center',
		boxShadow: 'none',
		padding: theme.spacing(1, 0),
		backgroundColor: 'transparent',
	},
	toolbar: {
		display: 'flex',
		justifyContent: 'space-around',
		width: '100%',
		padding: 0,
		backgroundColor: 'transparent',
	},
}));
