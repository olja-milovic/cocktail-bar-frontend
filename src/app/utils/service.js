import * as cloneDeep from 'lodash.clonedeep';

import { DEFAULT_QUERY, THEMES, TOKEN } from './constants';

const getUrlParams = () => {
	const urlParams = new URLSearchParams(window.location.search);
	let queryParams = cloneDeep(DEFAULT_QUERY);

	for (const [key, value] of urlParams) {
		if (key === 'search') {
			queryParams[key] = value;
		} else {
			queryParams.ingredients[key] = value.split(',');
		}
	}

	return queryParams;
};

const createQueryParams = queryParams => {
	let result = '';

	if (queryParams.search || queryParams.ingredients) {
		const encode = encodeURIComponent;
		const allParams = {...queryParams.ingredients};
		allParams.search = queryParams.search;

		result = Object.keys(allParams)
			.filter(k => !!allParams[k])
			.map(k => `${k}=${encode(allParams[k])}`)
			.join('&');
	}
	return result;
};

const createTokenHeader = () => ({ Authorization: `Bearer ${localStorage.getItem(TOKEN)}` });

const getOtherTheme = currentTheme => currentTheme === THEMES.light ? THEMES.dark : THEMES.light;

const getImage = (location, name) => {
	let image;

	try {
		image = require(`../../assets/${location}/${name.replaceAll(' ', '')}.webp`).default;
	} catch (e) {
		image = '';
	}

	return image;
};

const getGlasswareImage = name => getImage('glasses', name);
const getMethodImage = name => getImage('methods', name);

const getScaledImage = (image, size) => {
	let splitImage = image.replace('.jpg', '.webp').split('/');
	splitImage.splice(6, 0, `c_scale,w_${size}`);
	return splitImage.join('/');
};

export {
	getUrlParams,
	createQueryParams,
	createTokenHeader,
	getOtherTheme,
	getGlasswareImage,
	getMethodImage,
	getScaledImage,
};
