import { createContext } from 'react';
import * as cloneDeep from 'lodash.clonedeep';

import { DEFAULT_QUERY, THEMES } from './constants';

export const ThemeContext = createContext(THEMES.light);
export const SidebarContext = createContext(false);
export const QueryContext = createContext(cloneDeep(DEFAULT_QUERY));
