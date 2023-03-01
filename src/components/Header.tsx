import { DrawerNavigationProp } from '@react-navigation/drawer';
import { StackHeaderProps } from '@react-navigation/stack';
import React from 'react';
import { Platform } from 'react-native';
import { useTheme, Appbar, Menu } from 'react-native-paper';

export type RootStackParamList = {
	App: undefined;
};

const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';

export const Header = ({ navigation, back, options }: StackHeaderProps) => {
	const theme = useTheme();
	const [menuVisible, setMenuVisible] = React.useState(false);

	return (
		<Appbar.Header
			theme={{
				colors: {
					primary: theme?.colors.surface,
				},
			}}>
			{back ? <Appbar.BackAction onPress={navigation.goBack} testID="back icon" /> : null}
			<Appbar.Content title={options.title} />
			<Menu
				visible={menuVisible}
				onDismiss={() => setMenuVisible(false)}
				anchor={
					<Appbar.Action
						testID="Appbar Menu"
						icon={MORE_ICON}
						onPress={() =>
							(navigation as unknown as DrawerNavigationProp<{ any }>).openDrawer()
						}
					/>
				}>
				<></>
			</Menu>
		</Appbar.Header>
	);
};
