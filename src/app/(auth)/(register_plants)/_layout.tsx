import React from 'react';
import { Stack } from 'expo-router';
import { useAuth } from '@clerk/clerk-expo';

const RegisterPlantsLayout = () => {
	const { isSignedIn } = useAuth();
	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name="identificationMethod" redirect={!isSignedIn} />
			<Stack.Screen name="textMethod" redirect={!isSignedIn} />
			<Stack.Screen name="imageMethod" redirect={!isSignedIn} />
			<Stack.Screen name="result" redirect={!isSignedIn} />
		</Stack>
	);
};

export default RegisterPlantsLayout;
