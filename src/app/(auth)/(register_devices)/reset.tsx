import { useUser } from '@clerk/clerk-expo';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Checkbox, FAB, Text } from 'react-native-paper';
import { i18n } from '@lang/index';
import { useRouter } from 'expo-router';
import Return from '@components/ui/Return';
import LottieView from 'lottie-react-native';

const Reset = () => {
	const { user } = useUser();
	const router = useRouter();
	const animation = useRef(null);
	const [visible, setVisible] = useState<boolean>(false);
	const [checked, setChecked] = useState(false);

	const handleCheckboxToggle = () => {
		setChecked(!checked);
	};

	useEffect(() => {
		if (!user) throw Error('Could not find user details');
	}, [user]);

	const handleReturn = () => {
		router.push('/(auth)/(tabs)/myDevices');
	};

	return (
		<View style={{ flex: 1 }}>
			<Return
				title={i18n.t('register_devices')}
				subTitle={i18n.t('reset.subtitle')}
				handleReturn={handleReturn}
			/>
			<View
				style={{
					flexGrow: 0.6,
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'space-around',
					paddingHorizontal: 40,
				}}>
				<Text variant="titleLarge" style={{ textAlign: 'center' }}>
					{i18n.t('reset.explanation')}
				</Text>
				<LottieView
					autoPlay
					ref={animation}
					style={{
						width: 100,
						height: 100,
					}}
					source={{
						uri: 'https://lottie.host/c9dbaedc-b255-4883-adeb-6f052be98aa2/P7Ve0Z8QFU.json',
					}}
				/>
				<View style={{ flexDirection: 'row', alignItems: 'center' }}>
					<Checkbox.Android
						status={checked ? 'checked' : 'unchecked'}
						onPress={handleCheckboxToggle}
					/>
					<Text>{i18n.t('reset.checkbox')}</Text>
				</View>
			</View>
			<FAB
				visible={checked}
				icon="arrow-right"
				label={visible ? i18n.t('Continue') : ''}
				onPress={() => {}}
				style={[styles.compressedFabStyle]}
				variant="primary"
				onLongPress={() => setVisible(!visible)}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	compressedFabStyle: {
		position: 'absolute',
		right: 40,
		bottom: 40,
	},
});

export default Reset;
