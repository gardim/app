import React from 'react';
import { Stack } from 'expo-router';
import { useAuth } from '@clerk/clerk-expo';
const DevicesLayout = () => {
	const { isSignedIn } = useAuth();
	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen
				name="reset"
				options={{
					presentation: 'modal',
				}}
				redirect={!isSignedIn}
			/>
		</Stack>
	);
};

export default DevicesLayout;
