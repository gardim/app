import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
	Home: undefined;
};

type HomeScreenNavigationProps = StackNavigationProp<RootStackParamList, 'Home'>;

export type HomeProps = {
	navigation: HomeScreenNavigationProps;
};
