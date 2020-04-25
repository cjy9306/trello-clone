import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import useInput from '../../../hooks/useInput';
import Button from '../../../components/Button';
import FireBaseLogin from '../../../components/FireBaseLogin';

const Container = styled.div`
	display: flex;
	justify-content: center;

	@media only screen and (min-width: 401px) {
		padding-top: 160px;
		margin: 0 auto;
		width: 420px;
	}

	@media only screen and (max-width: 400px) {
		margin: 80px auto 80px auto;
		width: 320px;
	}
`;

const LoginFormContainer = styled.div`
	background-color: white;
	border-radius: 3px;
	box-shadow: rgba(0, 0, 0, 0.2) 0 0 10px;
	margin: 0 auto;
	padding: 15px 40px 25px 40px;
	text-align: center;
`;

const LoginFormHeader = styled.div`
	color: #5e6c84;
	font-size: 16px;
	font-weight: bold;
	height: 80px;
	line-height: 80px;
	text-align: center;
`;

const ContentContainer = styled.div`
	display: flex;
	flex-direction: column;
`;

const InputContainer = styled.div`
	width: 100%;
`;

const InputWrapper = styled.div`
	display: inline-flex;
	width: 100%;

	& > svg {
		height: 42px;
		margin-left: 15px;
		position: absolute;
	}
`;

const ControlContainer = styled.div`
	margin-bottom: 16px;
`;

const InputField = React.memo(styled.input`
	background: white;
	box-shadow: none;
	border: 2px solid #dfe1e6;
	border-radius: 3px;
	font-weight: 600;
	min-height: 38px;
	margin: 0px 0px 16px 0px;
	padding-left: ${(props) => (props.includeIcon === true ? '40px' : '10px')};
	padding-right: 10px;
	resize: none;
	width: 100%;
`);

const ButtonWraper = styled.div`
	margin-bottom: 8px;
`;

const LoginContent = ({ onLogin }) => {
	const [username, onChangeUserename] = useInput('');
	const [password, onChangePassword] = useInput('');

	return (
		<Container>
			<LoginFormContainer>
				<LoginFormHeader>Login to Trello Clone</LoginFormHeader>
				<ContentContainer>
					<InputContainer>
						<InputWrapper>
							<label htmlFor="username"></label>
							<InputField
								type="text"
								placeholder="input your name"
								name="username"
								value={username}
								onChange={onChangeUserename}
							/>
						</InputWrapper>
						<InputWrapper>
							<label htmlFor="password"></label>
							<InputField
								type="password"
								placeholder="input your password"
								name="password"
								value={password}
								onChange={onChangePassword}
							/>
						</InputWrapper>
					</InputContainer>
					<ControlContainer>
						<ButtonWraper>
							<Button type="primary" onClick={() => onLogin({ username, password })} block>
								Log In
							</Button>
						</ButtonWraper>
						<ButtonWraper>OR</ButtonWraper>
						<ButtonWraper>
							<Button block={true}>Sign Up</Button>
						</ButtonWraper>
					</ControlContainer>
					<FireBaseLogin />
					Terms of Service
				</ContentContainer>
			</LoginFormContainer>
		</Container>
	);
};

LoginContent.propTypes = {
	onLogin: PropTypes.func.isRequired,
};

export default React.memo(LoginContent);