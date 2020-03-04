import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import LoginContent from './LoginContent';
import { useDispatch } from 'react-redux';
import { login } from '../../modules/auth';
import client from '../../lib/api/client';

const LoginContainer = () => {
	const dispatch = useDispatch();
	const history = useHistory();

	const [alertVisible, setAlertVisible] = useState('');

	const onLogin = async ({ username, password }) => {
		const result = await dispatch(login({ username, password }));

		if (result && result.success) {
			const token = result.data.data.token;
			const memberId = result.data.data.member_id;
			sessionStorage.setItem('token', token);
			sessionStorage.setItem('memberId', memberId);
			sessionStorage.setItem('username', username);

			client.defaults.headers.AccessToken = token;

			history.push('/member/' + username + '/boards');
			return true;
		} else {
			setAlertVisible(true);
		}

		return false;
	};

	return <LoginContent onLogin={onLogin} alertVisible={alertVisible} />;
};

export default React.memo(LoginContainer);
