import * as React from 'react';
import { Image, View } from 'react-native';
import { Avatar, List } from 'react-native-paper';
import { Item } from 'src/@types';

export type ListItemProps = {
	item: Item;
	handleOnPress: () => void;
	fallbackIcon: string;
};

const ListItem = ({ item, handleOnPress, fallbackIcon }: ListItemProps) => {
	return (
		<List.Item
			key={item.id ?? item.title}
			title={item.title}
			titleStyle={{ fontSize: 18, fontWeight: 'bold' }}
			description={item.subtitle}
			onPress={handleOnPress}
			left={() =>
				item.image ? (
					<View style={{ overflow: 'hidden', width: 40, height: 40, borderRadius: 40 }}>
						<Image
							source={{ uri: item.image }}
							style={{ width: 100, height: 100, bottom: 20, right: 20 }}
						/>
					</View>
				) : (
					<Avatar.Icon icon={fallbackIcon} size={40} />
				)
			}
		/>
	);
};
export default ListItem;
