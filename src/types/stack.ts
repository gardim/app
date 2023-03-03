import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { TreflePlantSearchResponse } from '../api/trefle/types';
import { PlantIDResponse } from '../api/plant_id/types';

export type RootStackParamList = {
	Home: { success: boolean };
	IdentificationMethod: undefined;
	ImageMethod: undefined;
	TextMethod: undefined;
	Result: TreflePlantSearchResponse | PlantIDResponse;
	Name: undefined;
	Code: undefined;
	RootTabNavigation: undefined;
};

type IdentificationMethodScreenNavigationProps = StackNavigationProp<
	RootStackParamList,
	'IdentificationMethod'
>;
type ImageMethodScreenNavigationProps = StackNavigationProp<RootStackParamList, 'ImageMethod'>;
type TextMethodScreenNavigationProps = StackNavigationProp<RootStackParamList, 'TextMethod'>;
type NameScreenNavigationProps = StackNavigationProp<RootStackParamList, 'Name'>;
type CodeScreenNavigationProps = StackNavigationProp<RootStackParamList, 'Code'>;
export type HomeProps = StackScreenProps<RootStackParamList, 'Home'>;

export type IdentificationMethodProps = {
	navigation: IdentificationMethodScreenNavigationProps;
};

export type ImageMethodProps = {
	navigation: ImageMethodScreenNavigationProps;
};

export type TextMethodProps = {
	navigation: TextMethodScreenNavigationProps;
};

export type NameProps = {
	navigation: NameScreenNavigationProps;
};

export type CodeProps = {
	navigation: CodeScreenNavigationProps;
};

export type ResultProps = StackScreenProps<RootStackParamList, 'Result'>;
export type RootTabNavigationProps = StackScreenProps<RootStackParamList, 'RootTabNavigation'>;

export type ImageType = {
	id: string;
	uri: string;
};
