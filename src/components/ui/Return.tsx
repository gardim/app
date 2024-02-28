import React, { useState } from 'react';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import { Button, Dialog, Portal, Text, Title, useTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { i18n } from '@lang/index';

type ReturnProps = {
	title: string;
	subTitle: string;
	handleReturn: () => void;
	confirmation?: boolean;
};

const Return = ({ handleReturn, title, subTitle, confirmation }: ReturnProps) => {
	const router = useRouter();
	const { colors } = useTheme();

	const [dialogVisible, setDialogVisible] = useState(false);

	const handleOnContinue = () => {
		setDialogVisible(false);
		handleReturn();
	};

	return (
		<SafeAreaView style={{ marginTop: StatusBar.currentHeight }}>
			<View style={styles.headerContainer}>
				<MaterialCommunityIcons
					onPress={() => router.back()}
					name="chevron-left"
					color={colors.onSurface}
					size={42}
				/>
				<View style={styles.icon}>
					<Title>{title}</Title>
					<Text variant="titleMedium">{subTitle}</Text>
				</View>
				<MaterialCommunityIcons
					onPress={() => setDialogVisible(true)}
					name="close"
					color={colors.onSurface}
					size={36}
				/>
			</View>
			{confirmation && (
				<Portal>
					<Dialog visible={dialogVisible} onDismiss={() => setDialogVisible(false)}>
						<Dialog.Icon icon="alert" />
						<Dialog.Content>
							<Text style={{ textAlign: 'center' }} variant="bodyLarge">
								{i18n.t('components.return.confirmation')}
							</Text>
						</Dialog.Content>
						<Dialog.Actions>
							<Button onPress={() => setDialogVisible(false)}>{i18n.t('Cancel')}</Button>
							<Button onPress={handleOnContinue}>{i18n.t('Continue')}</Button>
						</Dialog.Actions>
					</Dialog>
				</Portal>
			)}
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	icon: {
		marginLeft: 20,
		flexGrow: 2,
	},
	headerContainer: {
		alignItems: 'center',
		marginHorizontal: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 10,
	},
});

export default Return;
