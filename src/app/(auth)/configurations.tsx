import { useAuth, useUser } from '@clerk/clerk-expo';
import * as React from 'react';
import { useEffect } from 'react';
import { View } from 'react-native';
import { Avatar, Card, List, Switch, useTheme } from 'react-native-paper';
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import Laurel from '@svgs/Laurel';
import { useStyledContext } from 'src/context/StyledProvider';
import { i18n } from '@lang/index';
import { useRouter } from 'expo-router';

const Configurations = () => {
	const { signOut } = useAuth();
	const { user } = useUser();
	const { colors } = useTheme();
	const router = useRouter();
	const { toggleTheme, isThemeDark } = useStyledContext();

	useEffect(() => {
		if (!user) throw Error('Could not find user details');
	}, [user]);

	return (
		<View style={{ flex: 1, padding: 20 }}>
			<Card>
				<Card.Title
					title={user?.fullName}
					subtitle={user?.emailAddresses[0].emailAddress}
					left={(props) => <Avatar.Image {...props} source={{ uri: user?.imageUrl }} />}
				/>
			</Card>
			<List.Section style={{ marginHorizontal: 20 }}>
				<List.Subheader>{i18n.t('configurations.General')}</List.Subheader>
				<List.Item
					title={i18n.t('configurations.theme.title')}
					description={i18n.t('configurations.theme.' + isThemeDark)}
					left={() => (
						<Entypo
							name={isThemeDark ? 'moon' : 'light-up'}
							size={24}
							color={colors.onBackground}
							style={{ marginTop: 8 }}
						/>
					)}
					right={() => <Switch value={isThemeDark} onValueChange={toggleTheme} />}
				/>
				<List.Item
					title={i18n.t('configurations.notifications.title')}
					description={i18n.t('configurations.notifications.' + false)}
					left={() => (
						<MaterialCommunityIcons
							name="bell-outline"
							size={24}
							color={colors.onBackground}
							style={{ marginTop: 8 }}
						/>
					)}
					right={() => <Switch value={false} onValueChange={() => console.log('')} />}
				/>
				<List.Subheader>{i18n.t('configurations.Account')}</List.Subheader>
				<List.Item
					onPress={() => router.push('/(modals)/plans')}
					title={i18n.t('configurations.pro.title')}
					description={i18n.t('configurations.pro.description')}
					left={() => (
						<Laurel
							height={24}
							width={24}
							color={colors.onBackground}
							style={{ marginTop: 8 }}
						/>
					)}
				/>
				<List.Item
					title={i18n.t('configurations.terms.title')}
					description={i18n.t('configurations.terms.description')}
					left={() => (
						<Entypo
							name="list"
							size={24}
							color={colors.onBackground}
							style={{ marginTop: 8 }}
						/>
					)}
				/>
				<List.Item
					title={i18n.t('configurations.logout.title')}
					description={i18n.t('configurations.logout.description')}
					left={() => (
						<Entypo
							name="log-out"
							size={24}
							color={colors.onBackground}
							style={{ marginTop: 8 }}
						/>
					)}
					onPress={signOut}
				/>
			</List.Section>
		</View>
	);
};

export default Configurations;
