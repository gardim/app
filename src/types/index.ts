import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
	Home: undefined;
	IdentificationMethod: undefined;
	ImageMethod: undefined;
	TextMethod: undefined;
};

type HomeScreenNavigationProps = StackNavigationProp<RootStackParamList, 'Home'>;
type IdentificationMethodScreenNavigationProps = StackNavigationProp<
	RootStackParamList,
	'IdentificationMethod'
>;
type ImageMethodScreenNavigationProps = StackNavigationProp<RootStackParamList, 'ImageMethod'>;
type TextMethodScreenNavigationProps = StackNavigationProp<RootStackParamList, 'TextMethod'>;

export type HomeProps = {
	navigation: HomeScreenNavigationProps;
};

export type IdentificationMethodProps = {
	navigation: IdentificationMethodScreenNavigationProps;
};

export type ImageMethodProps = {
	navigation: ImageMethodScreenNavigationProps;
};

export type TextMethodProps = {
	navigation: TextMethodScreenNavigationProps;
};

export type ImageType = {
	id: string;
	uri: string;
};
