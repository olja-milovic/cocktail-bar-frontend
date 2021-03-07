import React, { createRef, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Card from '@material-ui/core/Card';
import Tooltip from '@material-ui/core/Tooltip';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import { THEMES, getCardHeight, getCardWidth } from '../utils/constants';
import { ThemeContext } from '../utils/contexts';
import { getGlasswareImage, getMethodImage, getScaledImage } from '../utils/service';

export default function CocktailCard(props) {
	const classes = cocktailCardStyles();

	const {theme} = useContext(ThemeContext);

	const [fadeStyles, setFadeStyles] = useState({});
	const [descriptionStyles, setDescriptionStyles] = useState({});
	const [glasswareImage, setGlasswareImage] = useState('');
	const [methodImage, setMethodImage] = useState('');
	const [invert, setInvert] = useState({});
	const [cocktailImage, setCocktailImage] = useState('');

	const descriptionRef = createRef();
	const cardRef = createRef();

	useEffect(() => {
		largerDescription() && setFadeStyles({opacity: 1});
		setCocktailImage(getScaledImage(props.image, 220));
	}, []);

	useEffect(() => {
		setGlasswareImage(getGlasswareImage(props.glassware));
		setMethodImage(getMethodImage(props.method));
		setInvert(theme === THEMES.light ? {filter: 'invert(1)'} : {});
	}, [theme]);

	const handleMouseEnter = () => largerDescription() && setDescriptionStyles({
		top: 0,
		transform: 'translateY(0)',
	});

	const largerDescription = () => descriptionRef.current.offsetHeight > cardRef.current.offsetHeight;

	const chips = [
		<Chip key="0"
		      color="primary"
		      size="medium"
		      className={`${classes.chip} ${classes.spiritChip}`}
		      label={props.spirit}/>,
	];

	props.ingredients.forEach((ingredient, index) => {
		if (ingredient.name !== props.spirit) {
			chips.push(<Chip key={index + 1} size="medium" className={classes.chip} label={ingredient.name}/>);
		}
	});

	return (
		<Card ref={cardRef}
		      elevation={0}
		      onMouseEnter={handleMouseEnter}
		      onMouseLeave={() => setDescriptionStyles({})}
		      className={classes.card}>
			<CardActions className={classes.actions}>
				<Link to={`/cocktail/${props.id}`} className={classes.link}>
					<CardContent className={classes.content}>

						<img className={`cocktail-image ${classes.image}`}
							 width="220"
							 height="220"
							 loading="lazy"
							 alt={props.name}
							 src={cocktailImage}/>

						<div ref={descriptionRef}
						     style={descriptionStyles}
						     className={`cocktail-description ${classes.description}`}>

							<Typography variant="h6"
							            component="h6"
							            title={props.name}
							            className={classes.title}
							            gutterBottom>
								{props.name}
							</Typography>

							<div className={classes.info}>
								<Tooltip title={props.glassware}
								         placement="left"
								         arrow
								         classes={{tooltip: classes.tooltip}}>
									<img width="30"
										 height="30"
										 loading="lazy"
									     src={glasswareImage}
									     style={invert}
									     alt={props.glassware}/>
								</Tooltip>

								<Tooltip title={props.method}
								         placement="right"
								         arrow
								         classes={{tooltip: classes.tooltip}}>
									<img width="30"
										 height="30"
										 loading="lazy"
									     src={methodImage}
									     style={invert}
									     alt={props.method}/>
								</Tooltip>
							</div>

							<div className={classes.chips}>{chips}</div>
						</div>

						<div style={fadeStyles} className={`cocktail-fade ${classes.fade}`}/>
					</CardContent>
				</Link>
			</CardActions>
		</Card>
	);
}

CocktailCard.propTypes = {
	glassware: PropTypes.string,
	id: PropTypes.string,
	image: PropTypes.string,
	ingredients: PropTypes.array,
	method: PropTypes.string,
	name: PropTypes.string,
	spirit: PropTypes.string,
};

const cocktailCardStyles = makeStyles(theme => ({
	'@keyframes fadeIn': {
		'0%': {
			opacity: 0.7,
		},
		'100%': {
			opacity: 1,
		},
	},
	card: {
		minWidth: getCardWidth(theme.spacing),
		maxWidth: getCardWidth(theme.spacing),
		height: getCardHeight(theme.spacing),
		borderRadius: theme.spacing(2),
		opacity: 1,
		animation: '$fadeIn 0.5s ease-in forwards 1',

		'&:hover ': {
			'&.cocktail-image': {
				height: getCardHeight(theme.spacing),
				opacity: '0.2',
			},
			'&.cocktail-description': {
				top: '50%',
				transform: 'translateY(-50%)',
			},
			'&.cocktail-fade': {
				opacity: 0,
			},
		},
	},
	actions: {
		padding: 0,
		boxSizing: 'initial',
	},
	link: {
		textDecoration: 'none',
		color: 'inherit',
		width: '100%',
	},
	content: {
		position: 'relative',
		padding: 0,
		height: `calc(${getCardHeight(theme.spacing)} - ${theme.spacing(3)}px)`,
	},
	image: {
		position: 'absolute',
		left: '-9999px',
		right: '-9999px',
		margin: 'auto',
		width: getCardWidth(theme.spacing),
		height: getCardWidth(theme.spacing),
		objectFit: 'cover',
		transition: theme.transitions.create(['height', 'opacity'], {duration: 250}),

		'&:hover': {
			height: getCardHeight(theme.spacing),
			opacity: '0.2',
		},
	},
	description: {
		position: 'absolute',
		width: `calc(100% - ${theme.spacing(4)}px)`,
		top: getCardWidth(theme.spacing),
		display: 'flex',
		flexDirection: 'column',
		padding: theme.spacing(2),
		alignItems: 'center',
		textAlign: 'center',
		transition: theme.transitions.create(['top', 'transform'], {duration: 250}),
	},
	title: {
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		width: '100%',
	},
	tooltip: {
		fontSize: '14px',
	},
	info: {
		width: '85%',
		marginBottom: theme.spacing(1.5),
		padding: theme.spacing(0, 2),
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	chips: {
		textAlign: 'center',
		display: 'inline-flex',
		flexWrap: 'wrap',
	},
	chip: {
		cursor: 'pointer',
		margin: '2px',
		flex: '1 0 33.33%',
		maxWidth: '100%',
		backgroundColor: theme.palette.custom.chipBackground,
		transition: 'none',
	},
	spiritChip: {
		fontWeight: 600,
		backgroundColor: theme.palette.primary.main,
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
