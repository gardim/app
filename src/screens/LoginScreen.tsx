import * as React from 'react';

import LoginView from '../components/views/LoginView';
import { AuthContext } from '../contexts/auth';
import { useContext } from 'react';

const LoginScreen = () => {
	const { request, promptAsync } = useContext(AuthContext);


	return <LoginView disabled={!request} handleLogin={promptAsync} />;
};

export default LoginScreen;
