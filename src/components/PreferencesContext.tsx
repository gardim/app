/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';

export const PreferencesContext = React.createContext({
	toggleTheme: () => {},
	isThemeDark: false,
});
