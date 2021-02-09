import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core/styles';

const lora = {
	fontFamily: 'Lora, serif',
};

const noto = {
	fontFamily: 'Noto Sans JP, sans-serif',
};

const overrides = {
	MuiButton: {
		containedPrimary: {
			borderRadius: '8px',
			height: '37px',
			'&:hover': {
				boxShadow: 'none',
			},
		},
		contained: {
			boxShadow: 'none',
			'&.Mui-disabled': {
				cursor: 'not-allowed',
				pointerEvents: 'all',
			},
		},
		label: {
			fontWeight: '600',
		},
	},
	MuiTouchRipple: {
		root: {
			outline: 'none',
		},
	},
	MuiTypography: {
		h1: {...lora},
		h3: {...lora},
		h4: {...lora},
		h5: {...lora},
		h6: {...lora},
	},
};

const typography = {
	...noto,
	fontSize: 12,
};

const palette = {
	common: {
		black: '#212121',
	},
	primary: {
		light: '#fceddd',
		main: '#f7d2ac',
		dark: '#f1b376',
		contrastText: '#121212',
	},
	secondary: {
		light: '#e3f2ff',
		main: '#91ccff',
		dark: '#48a7fd',
	},
};

const darkTheme = createMuiTheme({
	palette: {
		type: 'dark',
		background: {
			default: '#151617',
			paper: '#1f2021',
		},
		custom: {
			chipBackground: '#616265',
			cocktailDetailsBackground: 'rgba(255, 255, 255, 0.12)',
			cocktailCard: {
				fadeFrom: 'rgba(0, 0, 0, 0)',
				fadeTo: 'rgba(0, 0, 0, 1)',
			},
		},
		...palette,
	},
	typography,
	overrides,
});

const lightTheme = createMuiTheme({
	palette: {
		type: 'light',
		background: {
			default: '#ebecef',
			paper: '#fff',
		},
		custom: {
			chipBackground: '#ebecef',
			cocktailDetailsBackground: '#ebecef',
			cocktailCard: {
				fadeFrom: 'rgba(255, 255, 255, 0)',
				fadeTo: 'rgba(255, 255, 255, 1)',
			},
		},
		...palette,
	},
	typography,
	overrides,
});

export {
	darkTheme,
	lightTheme,
};
