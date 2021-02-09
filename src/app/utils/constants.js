const TOKEN = 'bar-token';

const DEFAULT_QUERY = {search: '', ingredients: {}};
const DEFAULT_INGREDIENTS = {name: '', amount: '', type: '', main: false};
const DEFAULT_COCKTAIL_INFO = {cocktails: [], total: -1, page: 1};
const DEFAULT_COCKTAIL_DATA = {
	name: '',
	preparation: '',
	glassware: '',
	method: '',
	garnish: '',
	image: '',
};
const COCKTAIL_FIELDS = [{
	name: 'name',
	label: 'Cocktail Name',
	required: true,
}, {
	name: 'preparation',
	label: 'Preparation',
	multiline: true,
	rows: 4,
}, {
	name: 'glassware',
	label: 'Glassware',
	required: true,
}, {
	name: 'method',
	label: 'Method',
	required: true,
}, {
	name: 'garnish',
	label: 'Garnish',
}, {
	name: 'image',
	label: 'Image URL',
}];

const THEME = 'den_of_thieves_theme';
const THEMES = {
	dark: 'dark',
	light: 'light',
};
const SIDEBAR_WIDTH = 280;

const NOTIFICATION_TYPES = {
	error: 'error',
	warning: 'warning',
	info: 'info',
	success: 'success',
};

const getCardWidth = spacingMethod => `${spacingMethod(27.5)}px`;
const getCardHeight = spacingMethod => `${spacingMethod(48)}px`;

module.exports = {
	TOKEN,
	DEFAULT_QUERY,
	DEFAULT_INGREDIENTS,
	DEFAULT_COCKTAIL_INFO,
	DEFAULT_COCKTAIL_DATA,
	COCKTAIL_FIELDS,
	THEME,
	THEMES,
	SIDEBAR_WIDTH,
	NOTIFICATION_TYPES,
	getCardWidth,
	getCardHeight,
};
