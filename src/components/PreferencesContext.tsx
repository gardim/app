/* eslint-disable @typescript-eslint/no-empty-function */
import * as React from 'react';

export const PreferencesContext = React.createContext({
	toggleTheme: () => {},
	isThemeDark: false,
});
