import { MaterialBottomTabNavigationProp } from '@react-navigation/material-bottom-tabs';

export type RootTabParamList = {
	Status: undefined;
	Configurations: undefined;
	Home: undefined;
};

type ConfigurationsScreenNavigationProps = MaterialBottomTabNavigationProp<
	RootTabParamList,
	'Configurations'
>;
type StatusScreenNavigationProps = MaterialBottomTabNavigationProp<RootTabParamList, 'Status'>;

export type ConfigurationsProps = {
	navigation: ConfigurationsScreenNavigationProps;
};

export type StatusProps = {
	navigation: StatusScreenNavigationProps;
};
