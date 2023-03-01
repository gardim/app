import { StackNavigationProp } from '@react-navigation/stack';
import { TreflePlantSearchResponse } from '../api/trefle/types';
import { PlantIDResponse } from '../api/plant_id/types';
import { StackScreenProps } from '@react-navigation/stack';

export type RootStackParamList = {
	Home: undefined;
	IdentificationMethod: undefined;
	ImageMethod: undefined;
	TextMethod: undefined;
	Result: TreflePlantSearchResponse | PlantIDResponse;
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

export type ResultProps = StackScreenProps<RootStackParamList, 'Result'>;

export type ImageType = {
	id: string;
	uri: string;
};
