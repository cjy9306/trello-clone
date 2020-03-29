import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import jwt from 'jsonwebtoken';
import { login } from '../../modules/auth';
import Message from '../../components/Message';
import LoginContent from './LoginContent';

const LoginContainer = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const message = useSelector(state => state.common.message);

	const onLogin = useCallback(
		async ({ username, password }) => {
			const result = await dispatch(login({ username, password }));

			if (result.success) {
				const token = result.data.data.token;

				const decoded = jwt.decode(token);
				sessionStorage.setItem('token', token);
				sessionStorage.setItem('memberId', decoded.memberId);
				sessionStorage.setItem('username', decoded.username);
				history.push('/member/' + username + '/boards');
				return true;
			}

			return false;
		},
		[dispatch, history]
	);

	return (
		<>
			<Message visible={message.visible} type={message.type} text={message.text} />
			<LoginContent onLogin={onLogin} />
		</>
	);
};

export default React.memo(LoginContainer);
