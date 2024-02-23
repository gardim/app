import * as React from 'react';
import { SafeAreaView, View } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import Logo from '@/assets/svgs/Logo';
import Gardim from '@/assets/svgs/Gardim';
import { i18n } from '@/src/translations';

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
			<View style={{ display: 'flex', alignContent:'center', justifyContent: 'center', marginLeft: 30}}>
				<Logo height={200} />
				<Gardim width={200} />
			</View>
			<Button icon="google" mode="contained" onPress={() => handleLogin()}>
				{i18n.t('Login with Google')}
			</Button>
		</SafeAreaView>
	);
};

export default LoginView;
