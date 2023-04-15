import { MaterialBottomTabNavigationProp } from '@react-navigation/material-bottom-tabs';

export type RootTabParamList = {
	Status: undefined;
	Configurations: undefined;
	Home: undefined;
	Statistics: undefined;
};

type ConfigurationsScreenNavigationProps = MaterialBottomTabNavigationProp<
	RootTabParamList,
	'Configurations'
>;

type StatusScreenNavigationProps = MaterialBottomTabNavigationProp<RootTabParamList, 'Status'>;

type StatisticsScreenNavigationProps = MaterialBottomTabNavigationProp<
	RootTabParamList,
	'Statistics'
>;

export type ConfigurationsProps = {
	navigation: ConfigurationsScreenNavigationProps;
};

export type StatusProps = {
	navigation: StatusScreenNavigationProps;
};

export type StatisticsProps = {
	navigation: StatisticsScreenNavigationProps;
};
