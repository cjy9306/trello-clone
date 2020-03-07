import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import LoginContent from './LoginContent';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../modules/auth';
import { setMessageStates } from '../../modules/common';
import Message from '../../components/Message';

const LoginContainer = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const message = useSelector(state => state.common.message);
	const [alertVisible, setAlertVisible] = useState('');

	const onLogin = async ({ username, password }) => {
		const result = await dispatch(login({ username, password }));

		if (result && result.success) {
			const token = result.data.data.token;
			const memberId = result.data.data.member_id;
			sessionStorage.setItem('token', token);
			sessionStorage.setItem('memberId', memberId);
			sessionStorage.setItem('username', username);

			// client.defaults.headers.AccessToken = token;

			history.push('/member/' + username + '/boards');
			return true;
		} else {
			setAlertVisible(true);
			dispatch(setMessageStates(true, 'error', result.data.data));
		}

		return false;
	};

	return (
		<>
			<Message visible={message.visible} type={message.type} text={message.text} />
			<LoginContent onLogin={onLogin} alertVisible={alertVisible} />
		</>
	);
};

export default React.memo(LoginContainer);
