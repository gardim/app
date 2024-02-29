import * as React from 'react';
import { Avatar, Card, Icon } from 'react-native-paper';
import { Item } from 'src/@types';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export type GridItemProps = {
	item: Item;
	handleOnPress: () => void;
	fallbackIcon: string;
};

const GridItem = ({ item, handleOnPress, fallbackIcon }: GridItemProps) => {
	return (
		<Card style={{ margin: 10, flex: 1 }} key={item.id ?? item.title} onPress={handleOnPress}>
			{item.image != '' ? (
				<Card.Cover source={{ uri: item.image }} />
			) : (
				<Avatar.Icon
					icon={fallbackIcon}
					size={64}
					style={{ alignSelf: 'center', marginVertical: 20 }}
				/>
			)}
			<Card.Title title={item.title} subtitle={item.subtitle} />
		</Card>
	);
};
export default GridItem;
