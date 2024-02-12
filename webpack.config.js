// eslint-disable-next-line @typescript-eslint/no-var-requires
const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
	const config = await createExpoWebpackConfigAsync(
		{
			...env,
			babel: {
				dangerouslyAddModulePathsToTranspile: ['@miblanchard/react-native-slider'],
			},
		},
		argv
	);
	config.resolve.fallback = {
		...config.resolve.fallback,
		crypto: require.resolve('expo-crypto'),
	};
	return config;
};
