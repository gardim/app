import React from 'react';
import { Stack } from 'expo-router';
import { useAuth } from '@clerk/clerk-expo';

const RegisterDevicesLayout = () => {
	const { isSignedIn } = useAuth();

	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name="reset" redirect={!isSignedIn} />
		</Stack>
	);
};

export default RegisterDevicesLayout;
