import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import { login } from '../../modules/auth';
import { setMessageStates } from '../../modules/common';
import LoginContent from './LoginContent';

const LoginContainer = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const message = useSelector(state => state.common.message);

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
			dispatch(setMessageStates(true, 'error', result.data.data));
		}

		return false;
	};

	return (
		<>
			<Message visible={message.visible} type={message.type} text={message.text} />
			<LoginContent onLogin={onLogin} />
		</>
	);
};

export default React.memo(LoginContainer);
