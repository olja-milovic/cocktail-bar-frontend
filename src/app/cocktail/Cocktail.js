import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import DocumentMeta from 'react-document-meta';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import EmptyView from '../common/EmptyView';
import Header from '../common/Header';
import noCocktailDark from '../../assets/images/no-cocktail-dark.webp';
import noCocktailLight from '../../assets/images/no-cocktail-light.webp';
import Notification from '../common/Notification';
import { ThemeContext } from '../utils/contexts';
import { THEMES } from '../utils/constants';
import { getGlasswareImage, getMethodImage, getScaledImage } from '../utils/service';
import SkeletonCocktail from './SkeletonCocktail';

export default function Cocktail () {
	const classes = cocktailStyles();

	const {theme} = useContext(ThemeContext);

	const [data, setData] = useState({ingredients: []});
	const [metadata, setMetadata] = useState({});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [cocktailImage, setCocktailImage] = useState('');
	const [glasswareImage, setGlasswareImage] = useState('');
	const [methodImage, setMethodImage] = useState('');
	const [invert, setInvert] = useState({});

	useEffect(() => {
		const fetchData = async () => {
			const id = window.location.pathname.split('/').pop();

			if (!id) {
				window.location = '/';
			}

			return axios(`${process.env.REACT_APP_URL}/cocktail/${id}`)
				.then(result => {
					result = result.data.message;
					setData(result);
					setLoading(false);
					const image = result.img_url && getScaledImage(result.img_url, 500);
					image ? setCocktailImage(image) : setNoCocktailImage();
					setMetadata({
						title: `${result.name} - Search & Filter Cocktails - Den of Thieves`,
						description: `A complete guide for creating your own ${result.name} cocktail.`,
					});
					loadImages(result.glassware, result.method);

					// add schema.org for rich results
					const newScript = document.createElement('script');
					newScript.id = 'ld-script';
					newScript.type = 'application/ld+json';
					newScript.innerHTML = JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'Recipe',
						description: `${result.name} recipe`,
						image: image || '',
						recipeCategory: 'cocktail',
						keywords: [result.name, 'cocktail recipe'],
						recipeIngredient: result.ingredients.map(ingredient => `${ingredient.amount} ${ingredient.name}`),
						name: result.name,
						prepTime: 'PT10M',
						recipeInstructions: result.preparation.split('.').map(i => i.trim()).filter(i => !!i),
					}, null, 2);

					document.body.appendChild(newScript);
				})
				.catch(() => {
					setError(true);
					setLoading(false);
				});
		};
		fetchData();

		return () => {
			const script = document.getElementById('ld-script');
			document.body.removeChild(script);
		};
	}, []);

	useEffect(() => {
		cocktailImage.includes('no-cocktail-') && setNoCocktailImage();
		data.glassware && loadImages(data.glassware, data.method);
		setInvert(theme === THEMES.light ? {filter: 'invert(1)'} : {});
	}, [theme]);

	const setNoCocktailImage = () => setCocktailImage(theme === THEMES.light ? noCocktailLight : noCocktailDark);

	const loadImages = (glassware, method) => {
		setGlasswareImage(getGlasswareImage(glassware));
		setMethodImage(getMethodImage(method));
	};

	return (
		<>
			<DocumentMeta {...metadata}/>

			<Header hasSidebar={false} hasBackButton={true}/>
			{
				(error || (!loading && data.ingredients.length === 0)) &&
				<>
					<Notification message={'An error occurred while shaking up the ingredients.'}
								  onClose={() => setError(false)}/>
					<EmptyView heading={'Cocktail not found'}
							   message={'The ingredients seem to be missing'}/>
				</>
			}
			{
				loading && <SkeletonCocktail/>
			}
			{
				!loading && data.ingredients.length > 0 &&
				<>
					<Typography variant="h4" component="h1" className={classes.title}>{data.name}</Typography>

					<Paper elevation={0} className={classes.container}>
						<div className={classes.imageContainer}>
							<img src={cocktailImage}
								 width="500"
								 height="500"
								 loading="lazy"
								 alt={data.name}
								 onError={setNoCocktailImage}
								 className={classes.image}/>
						</div>

						<div className={classes.info}>
							<div className={classes.details}>
								<div className={classes.detail}>
									<img width="30"
										 height="30"
										 loading="lazy"
										 src={methodImage}
										 style={invert}
										 alt={data.method}/>
									<Typography variant="body1">{data.method}</Typography>
								</div>

								<Divider orientation="vertical" flexItem className={classes.detailDivider}/>

								<div className={classes.detail}>
									<img width="30"
										 height="30"
										 loading="lazy"
										 src={glasswareImage}
										 style={invert}
										 alt={data.glassware}/>
									<Typography variant="body1">{data.glassware}</Typography>
								</div>

								<Divider orientation="vertical" flexItem className={classes.detailDivider}/>

								<div className={classes.detail}>
									<Typography variant="body1">
										{data.garnish === 'None' ? 'No garnish' : data.garnish}
									</Typography>
								</div>
							</div>

							<Typography variant="body1"
							            component="article"
							            className={classes.preparation}>
								{data.preparation}
							</Typography>

							<Table>
								<TableHead>
									<TableRow>
										<TableCell className={classes.tableHead}>Ingredients</TableCell>
										<TableCell className={classes.tableHead} align="right">Amount</TableCell>
									</TableRow>
								</TableHead>

								<TableBody>
									{data.ingredients.map(ingredient => (
										<TableRow key={ingredient.name}>
											<TableCell className={classes.tableCell}>{ingredient.name}</TableCell>
											<TableCell className={classes.tableCell} align="right">
												<Typography color="textSecondary" className={classes.amount}>
													{ingredient.amount}
												</Typography>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</div>
					</Paper>
				</>
			}
		</>
	);
}

const cocktailStyles = makeStyles(theme => ({
	title: {
		textAlign: 'center',
		fontWeight: 'bold',
		padding: theme.spacing(2),
	},
	container: {
		position: 'relative',
		margin: theme.spacing(0, 'auto'),
		width: '100%',
		maxWidth: theme.spacing(62.5),

		[theme.breakpoints.up('sm')]: {
			borderRadius: theme.spacing(2),
			marginBottom: theme.spacing(2),
		},
	},
	imageContainer: {
		display: 'flex',
		flexDirection: 'column',
		verticalAlign: 'middle',
		justifyContent: 'center',
	},
	image: {
		backgroundSize: theme.spacing(62.5),
		margin: 'auto',
		maxWidth: '100%',
		objectFit: 'cover',

		[theme.breakpoints.up('sm')]: {
			borderRadius: theme.spacing(2, 2, 0, 0),
		},
	},
	detailDivider: {
		margin: theme.spacing(1),
	},
	info: {
		display: 'flex',
		flexDirection: 'column',
		verticalAlign: 'middle',
		justifyContent: 'center',
		padding: theme.spacing(2),
	},
	preparation: {
		textAlign: 'justify',
		margin: theme.spacing(2, 1),
	},
	tableHead: {
		fontWeight: 'bold',
		fontSize: '14px',
	},
	tableCell: {
		fontSize: '14px',
		maxWidth: theme.spacing(21.25),
		overflow: 'hidden',
		whiteSpace: 'nowrap',
		textOverflow: 'ellipsis',
	},
	amount: {
		margin: 'auto',
		fontWeight: 'bold',
		overflow: 'hidden',
		whiteSpace: 'nowrap',
		textOverflow: 'ellipsis',
	},
	details: {
		display: 'flex',
		justifyContent: 'space-between',
		textAlign: 'center',
		alignItems: 'center',
		borderRadius: theme.spacing(2),
		backgroundColor: theme.palette.custom.cocktailDetailsBackground,
		padding: theme.spacing(2),
		marginBottom: theme.spacing(2),
	},
	detail: {
		flex: 1,
	},
}));
