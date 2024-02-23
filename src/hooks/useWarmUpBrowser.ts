import React from 'react';
import * as WebBrowser from 'expo-web-browser';
import PlatformUtils from '../utils/platform';

export const useWarmUpBrowser = () => {
	React.useEffect(() => {
		if (!PlatformUtils.isWeb){
			void WebBrowser.warmUpAsync();
			return () => {
				void WebBrowser.coolDownAsync();
			};}
	}, []);
};
