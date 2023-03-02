import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { TreflePlantSearchResponse } from '../api/trefle/types';
import { PlantIDResponse } from '../api/plant_id/types';

export type RootStackParamList = {
	Home: undefined;
	IdentificationMethod: undefined;
	ImageMethod: undefined;
	TextMethod: undefined;
	Result: TreflePlantSearchResponse | PlantIDResponse;
	Name: undefined;
	Code: undefined;
};

type HomeScreenNavigationProps = StackNavigationProp<RootStackParamList, 'Home'>;
type IdentificationMethodScreenNavigationProps = StackNavigationProp<
	RootStackParamList,
	'IdentificationMethod'
>;
type ImageMethodScreenNavigationProps = StackNavigationProp<RootStackParamList, 'ImageMethod'>;
type TextMethodScreenNavigationProps = StackNavigationProp<RootStackParamList, 'TextMethod'>;
type NameScreenNavigationProps = StackNavigationProp<RootStackParamList, 'Name'>;
type CodeScreenNavigationProps = StackNavigationProp<RootStackParamList, 'Code'>;

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

export type NameProps = {
	navigation: NameScreenNavigationProps;
};

export type CodeProps = {
	navigation: CodeScreenNavigationProps;
};

export type ResultProps = StackScreenProps<RootStackParamList, 'Result'>;

export type ImageType = {
	id: string;
	uri: string;
};

export type Plant = {
	name: string | null;
	code: number | null;
	common_name: string;
	scientific_name: string;
	edible_parts: string[] | null;
	ph_maximum: number | null;
	ph_minimum: number | null;
	light: number | null;
	atmospheric_humidity: number | null;
	minimum_temperature: number | null;
	maximum_temperature: number | null;
	minimum_humidity: number | null;
	maximum_humidity: number | null;
};

export interface PlantContextType {
	plant: Plant;
	updatePlant: (plant: Plant) => void;
	updatePlantName: (name: string) => void;
	updatePlantCode: (code: number) => void;
}
