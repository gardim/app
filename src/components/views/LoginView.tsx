import * as React from 'react';
import { SafeAreaView, View } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import Logo from '@svgs/Logo';
import Gardim from '@svgs/Gardim';
import { i18n } from '@lang/index';

export type LoginViewProps = {
	handleLogin: () => void;
};

const LoginView = ({ handleLogin }: LoginViewProps) => {
	const { colors } = useTheme();
	return (
		<SafeAreaView
			style={{
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: colors.background,
			}}>
			<View
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}>
				<Logo size={200} style={{ marginLeft: 30 }} />
				<Gardim size={40} style={{ marginVertical: 40 }} />
			</View>
			<Button icon="google" mode="contained" onPress={() => handleLogin()}>
				{i18n.t('Login with Google')}
			</Button>
		</SafeAreaView>
	);
};

export default LoginView;
