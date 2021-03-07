import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import { NOTIFICATION_TYPES } from '../utils/constants';

export default function Notification(props) {
	const classes = notificationStyles();

	const [open, setOpen] = React.useState(true);

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpen(false);
		props.onClose();
	};

	return (
		<>
			<Snackbar open={open}
			          autoHideDuration={5000}
			          className={classes.snackbar}
			          anchorOrigin={{vertical: 'top',horizontal: 'center'}}
			          onClose={handleClose}>

				<MuiAlert elevation={6}
				          variant="filled"
				          onClose={handleClose}
				          severity={props.type || NOTIFICATION_TYPES.error}>
					{props.message}
				</MuiAlert>
			</Snackbar>
		</>
	);
}

Notification.propTypes = {
	type: PropTypes.string,
	message: PropTypes.string,
	onClose: PropTypes.func,
};

const notificationStyles = makeStyles(theme => ({
	snackbar: {
		top: theme.spacing(8.75),
	},
}));
