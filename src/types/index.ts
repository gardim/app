import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
	Home: undefined;
	IdentificationMethod: undefined;
};

type HomeScreenNavigationProps = StackNavigationProp<RootStackParamList, 'Home'>;
type IdentificationMethodScreenNavigationProps = StackNavigationProp<
	RootStackParamList,
	'IdentificationMethod'
>;

export type HomeProps = {
	navigation: HomeScreenNavigationProps;
};

export type IdentificationMethodProps = {
	navigation: IdentificationMethodScreenNavigationProps;
};
