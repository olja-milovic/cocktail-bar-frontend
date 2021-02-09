import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';

import Header from '../common/Header';
import Notification from '../common/Notification';
import {
	COCKTAIL_FIELDS,
	DEFAULT_COCKTAIL_DATA,
	DEFAULT_INGREDIENTS,
	NOTIFICATION_TYPES,
	TOKEN,
} from '../utils/constants';
import { createTokenHeader } from '../utils/service';

const source = axios.CancelToken.source();

export default function AdminPanel() {
	const classes = adminPanelStyles();

	const [inputList, setInputList] = useState([{...DEFAULT_INGREDIENTS, main: true}]);
	const [mainValue, setMainValue] = useState(0);
	const [fetchedData, setFetchedData] = useState([{}]);
	const [successfulAdd, setSuccessfulAdd] = useState(false);
	const [failedAdd, setFailedAdd] = useState(false);
	const [failedDataFetch, setFailedDataFetch] = useState(false);
	const [cocktailData, setCocktailData] = useState(DEFAULT_COCKTAIL_DATA);
	const [errorMessage, setErrorMessage] = useState('Unknown error occurred.');

	useState(() => {
		axios.get(`${process.env.REACT_APP_URL}/admin/data`, {
			cancelToken: source.token,
			headers: createTokenHeader(),
		})
			.then(res => res.data.message)
			.then(data => setFetchedData(data))
			.catch(error => {
				setErrorMessage(error.response.data.message);
				setFailedDataFetch(true);
			});
	}, []);

	const handleIngredientChange = (name, value, index) => {
		const list = [...inputList];
		list[index][name] = value;
		setInputList(list);
	};

	const handleMainChange = index => {
		let list = [...inputList];
		inputList.forEach((item, i) => list[i].main = (i === index));
		setInputList(list);
	};

	const handleChange = (name, value) => {
		const data = {[name]: value};
		setCocktailData({...cocktailData, ...data});
	};

	const handleRemoveClick = index => {
		const list = [...inputList];
		list.splice(index, 1);
		setInputList(list);
	};

	const handleAddClick = () => setInputList([...inputList, {...DEFAULT_INGREDIENTS}]);

	const logout = () => {
		axios.put(`${process.env.REACT_APP_URL}/admin/logout`, {
			cancelToken: source.token,
			headers: createTokenHeader(),
		});
		localStorage.removeItem(TOKEN);
		window.location.reload();
	};

	// Handle form submit
	const handleSubmit = e => {
		e.preventDefault();

		const fields = {};
		COCKTAIL_FIELDS.forEach(value => fields[value.name] = cocktailData[value.name]);
		const ingredients = {ingredients: [...inputList]};
		const image = {
			name: cocktailData.name,
			url: cocktailData.image,
		};

		const data = {
			...fields,
			...ingredients,
			image,
		};

		axios.post(`${process.env.REACT_APP_URL}/cocktail`, data, {
			cancelToken: source.token,
			headers: createTokenHeader(),
		})
			.then(() => {
				setSuccessfulAdd(true);
				setCocktailData(DEFAULT_COCKTAIL_DATA);
				setInputList([{name: '', amount: ''}]);
			})
			.catch(error => {
				setErrorMessage(error.response.data.message);
				setFailedAdd(true);
			});
	};

	return (
		<Fragment>
			<Header hasSidebar={false}/>

			<Paper elevation={1} className={classes.paper}>
				<Typography variant="h4">Add Cocktail</Typography>
				<form className={classes.form} onSubmit={handleSubmit}>
					{
						COCKTAIL_FIELDS.map((field, index) => {
							if (Object.keys(fetchedData).includes(field.name)) {
								return <Autocomplete
									key={index}
									options={fetchedData[field.name]}
									onChange={(e, value) => handleChange(field.name, value)}
									freeSolo
									renderInput={params => (
										<TextField {...params}
										           label={field.label}
										           onChange={e => handleChange(field.name, e.target.value)}
										           required={field.required}
										           margin="normal"
										           variant="outlined"/>
									)}/>;
							} else {
								return <TextField key={index}
								                  name={field.name}
								                  label={field.label}
								                  margin="normal"
								                  variant="outlined"
								                  required={field.required}
								                  multiline={field.multiline}
								                  rows={field.rows || 1}
								                  value={cocktailData[field.name]}
								                  onChange={e => handleChange(field.name, e.target.value)}/>;
							}
						})
					}

					<Divider light className={classes.divider}/>

					<RadioGroup aria-label="gender" value={mainValue}>
						{
							fetchedData.ingredients && inputList.map((param, index) => {
								return (
									<div key={index} className={classes.ingredientSection}>
										<div className={classes.ingredientList}>
											<div className={classes.ingredients}>
												<Autocomplete
													key={`name${index}`}
													options={fetchedData['ingredients']}
													onChange={(e, value) => handleIngredientChange('name', value, index)}
													className={classes.ingredient}
													freeSolo
													renderInput={params => (
														<TextField
															{...params}
															label={`${index + 1}. Name`}
															onChange={
																e => handleIngredientChange('name', e.target.value, index)
															}
															margin="normal"
															variant="outlined"/>
													)}/>

												<TextField name="amount"
												           label={`${index + 1}. Amount`}
												           value={param.amount}
												           className={classes.ingredient}
												           onChange={
													           e => handleIngredientChange('amount', e.target.value, index)
												           }
												           margin="normal"
												           variant="outlined"/>

												<Autocomplete
													key={`type${index}`}
													name="type"
													options={['Spirit', 'Liqueur', 'Wine/Vermouth', 'Mixer']}
													onChange={(e, value) => handleIngredientChange('type', value, index)}
													className={classes.ingredient}
													renderInput={params => (
														<TextField
															{...params}
															label={`${index + 1}. Type`}
															onChange={
																e => handleIngredientChange('type', e.target.value, index)
															}
															margin="normal"
															variant="outlined"/>
													)}/>

												<FormControlLabel value={index}
												                  control={<Radio onClick={() => {
													                  setMainValue(index);
													                  handleMainChange(index);
												                  }}/>}
												                  label="Main"/>
											</div>
											{
												inputList.length !== 1 &&
												<IconButton type="button" className={classes.removeIngredient}
												            onClick={() => handleRemoveClick(index)}>
													<RemoveCircleIcon fontSize="inherit"/>
												</IconButton>
											}
										</div>

										<Divider light className={classes.divider}/>

										{
											inputList.length - 1 === index &&
											<Button color="secondary"
											        variant="contained"
											        startIcon={<AddCircleIcon/>}
											        className={classes.addIngredient}
											        onClick={handleAddClick}>
												Add
											</Button>
										}
									</div>
								);
							})
						}
					</RadioGroup>

					<Button color="primary" type="submit" variant="contained">Submit</Button>
				</form>

				<Button color="primary" onClick={logout} variant="contained" className={classes.logout}>Logout</Button>

				{
					successfulAdd && <Notification message={'Cocktail added successfully.'}
					                               onClose={() => setSuccessfulAdd(false)}
					                               type={NOTIFICATION_TYPES.success}/>
				}
				{
					(failedAdd || failedDataFetch) &&
					<Notification message={errorMessage} onClose={() => setFailedAdd(false)}/>
				}
			</Paper>
		</Fragment>
	);
}

const adminPanelStyles = makeStyles(theme => ({
	paper: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		margin: theme.spacing(6.25, 'auto'),
		padding: theme.spacing(3),
		width: theme.spacing(62.5),
	},
	form: {
		display: 'flex',
		flexDirection: 'column',
		width: '85%',
	},
	ingredientSection: {
		display: 'flex',
		flexDirection: 'column',
	},
	ingredientList: {
		display: 'flex',
		flexDirection: 'row',
	},
	ingredients: {
		display: 'flex',
		flexDirection: 'column',
		flex: 1,
	},
	addIngredient: {
		alignSelf: 'center',
		marginBottom: theme.spacing(4),
	},
	removeIngredient: {
		alignSelf: 'center',
		marginLeft: theme.spacing(1),
	},
	divider: {
		margin: theme.spacing(1, 1, 2),
	},
	logout: {
		position: 'absolute',
		top: theme.spacing(8.5),
		right: theme.spacing(2),
	},
}));
