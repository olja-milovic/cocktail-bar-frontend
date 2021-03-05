import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import errorDark from '../../assets/images/error-dark.png';
import errorLight from '../../assets/images/error-light.png';
import { THEMES } from '../utils/constants';
import { ThemeContext } from '../utils/contexts';

export default function EmptyView(props) {
	const classes = emptyViewStyles();

	const {theme} = useContext(ThemeContext);

	return (
		<Fragment className={classes.noResultsContainer}>
			<img src={theme === THEMES.light ? errorLight : errorDark}
			     alt="No preview"
			     width={props.width}
			     className={classes.noResultsImage}/>
			<Fragment className={classes.noResultsMessage}>
				<Typography className={classes.noResultsHeading}>{props.heading}</Typography>
				<Typography>{props.message}</Typography>
			</Fragment>
		</Fragment>
	);
}

EmptyView.propTypes = {
	width: PropTypes.number,
	heading: PropTypes.string,
	message: PropTypes.string,
};

const emptyViewStyles = makeStyles(theme => ({
	noResultsContainer: {
		display: 'flex',
		flexDirection: 'column',
		textAlign: 'center',
		padding: theme.spacing(3),
	},
	noResultsImage: {
		padding: theme.spacing(3, 6),
		margin: 'auto',
		maxWidth: '100%',
	},
	noResultsMessage: {
		color: theme.palette.text.secondary,
	},
	noResultsHeading: {
		fontWeight: 'bold',
	},
}));
