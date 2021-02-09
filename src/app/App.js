import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';

import AdminRouter from './admin-panel/AdminRouter';
import Cocktail from './cocktail/Cocktail';
import Cocktails from './cocktails/Cocktails';
import { ThemeContext } from './utils/contexts';
import { darkTheme, lightTheme } from './utils/themes';
import { THEME, THEMES } from './utils/constants';

export default function App() {
	const [theme, setTheme] = useState(localStorage.getItem(THEME) || THEMES.light);

	return (
		<ThemeProvider theme={theme === THEMES.light ? lightTheme : darkTheme}>
			<CssBaseline/>

			<ThemeContext.Provider value={{theme, setTheme}}>
				<Router>
					<Switch>
						<Route exact path="/">
							<Cocktails/>
						</Route>
						<Route path="/cocktail/:id">
							<Cocktail/>
						</Route>
						<Route path="/admin">
							<AdminRouter/>
						</Route>
					</Switch>
				</Router>
			</ThemeContext.Provider>
		</ThemeProvider>
	);
}
