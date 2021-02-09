import React, { Fragment, useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';

import Notification from '../common/Notification';
import CocktailCard from './CocktailCard';
import EmptyView from '../common/EmptyView';
import Sidebar from './sidebar/Sidebar';
import SkeletonCard from './SkeletonCard';
import { QueryContext, SidebarContext } from '../utils/contexts';
import { DEFAULT_COCKTAIL_INFO, getCardWidth } from '../utils/constants';
import { createQueryParams, getUrlParams } from '../utils/service';

export default function CardGrid() {
	const classes = cardGridStyles();

	const axiosRequest = useRef(null);

	const {setSidebarOpen} = useContext(SidebarContext);
	const {query, setQuery} = useContext(QueryContext);

	const [cocktailInfo, setCocktailInfo] = useState(DEFAULT_COCKTAIL_INFO);
	const [cards, setCards] = useState([]);
	const [skeletonCards, setSkeletonCards] = useState([]);
	const [fetchingCocktails, setFetchingCocktails] = useState(false);
	const [submit, setSubmit] = useState(false);
	const [error, setError] = useState(false);

	useEffect(() => {
		window.addEventListener('scroll', handleScroll, {passive: true});

		const queryParams = getUrlParams();
		setQuery(queryParams);

		const loader = [];
		for (let i = 0; i < 20; i++) {
			loader.push(<SkeletonCard key={`skeleton-${i}`}/>);
		}
		setSkeletonCards(loader);
		setFetchingCocktails(true);

		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	// Lazy loading
	useEffect(() => {
		const getData = async queryParams => {
			if (axiosRequest.current) {
				axiosRequest.current.cancel();
			}
			axiosRequest.current = axios.CancelToken.source();

			let params = `?page=${cocktailInfo.page}`;
			if (queryParams) {
				params += `&${queryParams}`;
			}

			let result = await axios(`${process.env.REACT_APP_URL}/cocktails${params}`,{
				cancelToken: axiosRequest.current.token,
			}).catch(e => !axios.isCancel(e) && setError(true));

			if (!result) {
				setCocktailInfo({...cocktailInfo, ...{total: 0}});
				setFetchingCocktails(false);
				return;
			}

			result = result.data.message;
			setCards([...cards, ...createCards(result.cocktails)]);

			const pageNumber = (cards.length + result.cocktails.length < result.total) ? (cocktailInfo.page + 1) : 0;
			setCocktailInfo({
				cocktails: result.cocktails,
				total: result.total,
				page: pageNumber,
			});

			setFetchingCocktails(false);
		};

		if (!fetchingCocktails ||
			cocktailInfo.page === 0 ||
			cocktailInfo.cocktails.length === cocktailInfo.total
		) {
			return;
		}

		getData(createQueryParams(query));
	}, [fetchingCocktails]);

	useEffect(() => {
		let queryParams = createQueryParams(query);
		const params = queryParams ? `?${queryParams}` : '';

		const location = window.location;
		let url = `${location.protocol}//${location.host}${location.pathname}${params}`;
		window.history.pushState({path: url}, '', url);
		window.scrollTo(0, 0);

		setCocktailInfo(DEFAULT_COCKTAIL_INFO);
		setCards([]);
		setSidebarOpen(false);
		setFetchingCocktails(true);
		setSubmit(false);
	}, [submit]);

	const onSubmit = () => {
		setFetchingCocktails(false);
		setSubmit(true);
	};

	const handleScroll = () => {
		const element = document.documentElement;

		if (Math.ceil(window.innerHeight + element.scrollTop) < Math.ceil(element.offsetHeight - window.innerHeight / 2)) {
			return;
		}

		!isEndOfResults() && setFetchingCocktails(true);
	};

	const isEndOfResults = () =>
		cocktailInfo.total !== -1 &&
		cards.length >= cocktailInfo.total;

	const createCards = cocktails => {
		const allCards = [];
		const cardLength = cards.length;

		cocktails.forEach((cocktail, index) => {
			allCards.push(
				<CocktailCard key={cardLength + index}
				              glassware={cocktail.glassware}
				              id={cocktail.id}
				              image={cocktail.img_url}
				              ingredients={cocktail.ingredients}
				              method={cocktail.method}
				              name={cocktail.name}
				              spirit={cocktail.ingredients.find(ing => ing.main).name}/>,
			);
		});

		return allCards;
	};

	return (
		<Fragment>
			{
				error &&
				<Notification message={'An error occurred while shaking up the cocktails.'}
				              onClose={() => setError(false)}/>
			}

			<div className={classes.gridContainer}>
				<Sidebar onSubmit={onSubmit} numOfResults={cocktailInfo.total}/>
				<div className={classes.cardContainer}>
					<div className={classes.cards}>
						{cards}
						{
							(fetchingCocktails && !isEndOfResults()) &&
							skeletonCards
						}
					</div>
					{
						isEndOfResults() && cocktailInfo.total > 0 &&
						<div className={classes.end}>
							<Divider light className={classes.divider}/>
							end of results
							<Divider light className={classes.divider}/>
						</div>
					}
					{
						cocktailInfo.total === 0 &&
						<EmptyView width={300}
						           heading={'No cocktails found'}
						           message={'Try shaking up the ingredients some more'}/>
					}
				</div>
			</div>
		</Fragment>
	);
}

const cardGridStyles = makeStyles(theme => ({
	gridContainer: {
		display: 'flex',
		width: '100%',
		margin: theme.spacing(0, 'auto'),
	},
	cardContainer: {
		flex: 1,
	},
	cards: {
		display: 'grid',
		gridTemplateColumns: `repeat(auto-fill, minmax(${getCardWidth(theme.spacing)}, 1fr))`,
		rowGap: `${theme.spacing(4)}px`,
		columnGap: theme.spacing(6),
		justifyItems: 'center',
		margin: theme.spacing(4),
	},
	end: {
		display: 'flex',
		width: '90%',
		fontWeight: 500,
		margin: theme.spacing(0, 'auto', 4),
		color: theme.palette.text.disabled,
		alignItems: 'center',
	},
	divider: {
		flex: 'auto',
		margin: theme.spacing(0, 4),
	},
}));
