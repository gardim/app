import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import LoginView from '@components/views/LoginView';
import { useOAuth } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import { useWarmUpBrowser } from '@hooks/useWarmUpBrowser';

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = () => {
	useWarmUpBrowser();

	const { startOAuthFlow: googleAuth } = useOAuth({ strategy: 'oauth_google' });
	const router = useRouter();

	const onAuth = async () => {
		try {
			const { createdSessionId, setActive } = await googleAuth();
			if (createdSessionId) {
				setActive!({ session: createdSessionId });
				router.navigate('/(auth)/(tabs)/myPlants');
			}
		} catch (err) {
			console.error('OAuth error: ', err);
		}
	};

	return <LoginView handleLogin={onAuth} />;
};

export default LoginScreen;
