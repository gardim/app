import * as React from 'react';

import { createContext, useState, useEffect, ReactNode, useMemo } from 'react';
import { getUser, storeUser } from '../storage';
import { getUserInfo } from '../api/google';
import * as Google from 'expo-auth-session/providers/google';
import { handleApiError } from '../utils/error';
import { User } from '../types';

type Auth = {
	user: User;
	request: object;
	promptAsync: () => void;
	isLoggedIn: boolean;
};

export const AuthContext = createContext<Auth>({
	user: null,
	request: null,
	promptAsync: () => null,
	isLoggedIn: false,
});

interface AuthenticationProviderProps {
	children: ReactNode;
}

const AuthenticationProvider = ({ children }: AuthenticationProviderProps) => {
	const [token, setToken] = useState('');
	const [user, setUser] = useState(null);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const [request, response, promptAsync] = Google.useAuthRequest({
		androidClientId: process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID,
		iosClientId: process.env.EXPO_PUBLIC_IOS_CLIENT_ID,
		webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
	});

	useEffect(() => {
		handleEffect();
	}, [response, token, user]);

	async function handleEffect() {
		const user = await getUser();
		if (!user) {
			if (response?.type === 'success') {
				setToken(response.authentication.accessToken);
				getUserInfo(response.authentication.accessToken)
					.then((user) => {storeUser(user);
						setUser(user);
						setIsLoggedIn(true);
					})
					.catch((error) => {console.log(handleApiError(error));
						setIsLoggedIn(false);
					});
			}
		} else {
			setUser(user);
			setIsLoggedIn(true);
		}
	}

	const contextValue = useMemo(() => {
		return { user, request, promptAsync, isLoggedIn };
	}, [request, token, user]);

	return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export default AuthenticationProvider;
