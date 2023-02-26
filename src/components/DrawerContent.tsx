import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Drawer, Switch, Text, TouchableRipple, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { PreferencesContext } from './PreferencesContext';

export default function DrawerContent() {
	const insets = useSafeAreaInsets();

	const { toggleTheme, isThemeDark } = React.useContext(PreferencesContext);
	const theme = useTheme();

	return (
		<Drawer.Section
			title="Preferences"
			style={{
				flex: 1,
				paddingTop: insets.top + 4,
				backgroundColor: theme.colors.background,
				marginBottom: 0,
			}}>
			<TouchableRipple onPress={toggleTheme}>
				<View style={[styles.preference]}>
					<Text variant="labelLarge">Dark Theme</Text>
					<View pointerEvents="none">
						<Switch value={isThemeDark} />
					</View>
				</View>
			</TouchableRipple>
		</Drawer.Section>
	);
}

const styles = StyleSheet.create({
	drawerContent: {
		flex: 1,
	},
	preference: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingVertical: 12,
		paddingHorizontal: 16,
	},
	v3Preference: {
		height: 56,
		paddingHorizontal: 28,
	},
	badge: {
		alignSelf: 'center',
	},
});
