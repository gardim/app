export default {
	Notifications: 'Notifications',
	Plans: 'Plans',
	'Add your first plant': 'Add your first plant',
	'Add your first device': 'Add your first device',
	Add: 'Add',
	'My Plants': 'My Plants',
	'Login with Google': 'Login with Google',
	'nothing to show': 'Looks like there is nothing to be shown here...',
	Continue: 'Continue',
	Cancel: 'Cancel',
	or: 'or',
	'Try Again': 'Try Again',

	components: {
		return: {
			confirmation: 'Are you sure you want to leave? All data will be lost.',
		},
	},

	routes: {
		notifications: 'Notifications',
		myPlants: 'My Plants',
		myDevices: 'My Devices',
		home: 'Home',
		login: 'Login',
		configurations: 'Configurations',
	},

	reset: {
		title: 'Add a device',
		subtitle: 'Pair initialization',
		explanation:
			'Turn the device on and hold the power button. Check if the light indicador is blinking.',
		checkbox: 'The light indicator is blinking',
	},

	register_plants: 'Add a plant',

	identificationMethod: {
		subtitle: 'Identification method',
		explanation: 'Select the method you want to follow to identify your plant',
		image: 'Identify by image',
		text: 'Identify by text',
	},

	textMethod: {
		subtitle: 'Text identification',
		explanation: 'Write some keywords that will help us find your plant',
		tip: 'Press enter or space to divide the words',
	},

	imageMethod: {
		subtitle: 'Image identification',
		explanation: 'Add some pictures so we can identify your plant.',
		camera: 'Take picture',
		gallery: 'Add from gallery	',
	},

	result: {
		subtitle: 'Result',
		explanation: 'Choose the best fit for your plant.',
		empty: 'We did not find any results for your query. Please review your search parameters, or try with another identification method.',
		probability: 'Success Probability',
	},

	stats: {
		humidity: {
			soil: 'Soil Humidity',
			atmosphere: 'Atmospheric Humidity',
		},
		temperature: 'Temperature',
		luminosity: 'Luminosity',
	},

	configurations: {
		General: 'General',
		Account: 'Account',
		theme: {
			true: 'dark',
			false: 'light',
			title: 'Theme',
		},
		notifications: {
			title: 'Notifications',
			true: 'on',
			false: 'off',
		},
		pro: {
			title: 'Gardim Pro',
			description: 'The best benefits for plant care',
		},
		terms: {
			title: 'Terms of Use',
			description: 'Understand what we use your data for',
		},
		logout: {
			title: 'Logout',
			description: 'Enter with another account',
		},
	},
};
