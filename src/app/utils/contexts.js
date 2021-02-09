import { createContext } from 'react';

import { DEFAULT_QUERY, THEMES } from './constants';

export const ThemeContext = createContext(THEMES.light);
export const SidebarContext = createContext(false);
export const QueryContext = createContext({...DEFAULT_QUERY});
