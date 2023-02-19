import { DrawerNavigationProp } from '@react-navigation/drawer';
import { StackHeaderProps } from '@react-navigation/stack';
import React from 'react';
import { Platform } from 'react-native';
import { useTheme, Appbar, Menu } from 'react-native-paper';

export type RootStackParamList = {
	App: undefined;
};

const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';

export const Header = ({ navigation, route }: StackHeaderProps) => {
	const theme = useTheme();
	const [menuVisible, setMenuVisible] = React.useState(false);

	return (
		<Appbar.Header
			theme={{
				colors: {
					primary: theme?.colors.surface,
				},
			}}>
			<Appbar.Content title={route.name} />
			<Menu
				visible={menuVisible}
				onDismiss={() => setMenuVisible(false)}
				anchor={
					<Appbar.Action
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
