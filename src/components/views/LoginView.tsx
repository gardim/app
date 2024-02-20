import * as React from 'react';
import { SafeAreaView, Text } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import Logo from '../resources/svgs/Logo';
import { i18n } from '../../translations';

export type LoginViewProps = {
	disabled: boolean;
	handleLogin: () => void;
};

const LoginView = ({ disabled, handleLogin }: LoginViewProps) => {
	const { colors } = useTheme();
	return (
		<SafeAreaView
			style={{
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: colors.background,
			}}>
			<Logo height={200} style={{ marginLeft: 40 }} />
			<Text
				adjustsFontSizeToFit
				style={{ fontFamily: 'Baloo2', fontSize: 52, alignSelf: 'center' }}>
				Gardim
			</Text>
			<Button icon="google" mode="contained" disabled={disabled} onPress={()=>handleLogin()}>
				{i18n.t('Login with Google')}
			</Button>
		</SafeAreaView>
	);
};

export default LoginView;
