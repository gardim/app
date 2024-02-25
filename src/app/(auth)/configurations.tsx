import { useAuth, useUser } from '@clerk/clerk-expo';
import * as React from 'react';
import { useEffect } from 'react';
import { View } from 'react-native';
import { Avatar, Card, List, Switch, useTheme } from 'react-native-paper';
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import Laurel from '@svgs/Laurel';

const Configurations = () => {
	const { signOut } = useAuth();
	const { user } = useUser();
	const { colors } = useTheme();

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
				<List.Subheader>General</List.Subheader>
				<List.Item
					title="Tema"
					description="claro"
					left={() => <Entypo name="light-up" size={24} color={colors.onBackground} />}
					right={() => <Switch value={true} onValueChange={() => console.log('')} />}
				/>
				<List.Item
					title="Notificações"
					description="ligado"
					left={() => (
						<MaterialCommunityIcons
							name="bell-outline"
							size={24}
							color={colors.onBackground}
						/>
					)}
					right={() => <Switch value={true} onValueChange={() => console.log('')} />}
				/>
				<List.Subheader>Conta</List.Subheader>
				<List.Item
					title="Gardim Pro"
					description="Os melhores benefícios para o cuidado com plantas"
					left={() => <Laurel height={24} width={24} color={colors.onBackground} />}
				/>
				<List.Item
					title="Termos de uso"
					description="Entenda os termos de uso do Gardim"
					left={() => <Entypo name="list" size={24} color={colors.onBackground} />}
				/>
				<List.Item
					title="Logout"
					description="Entre com outra conta"
					left={() => <Entypo name="log-out" size={24} color={colors.onBackground} />}
					onPress={signOut}
				/>
			</List.Section>
		</View>
	);
};

export default Configurations;
