import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import useInput from '../../../hooks/useInput';
import Button from '../../../components/Button';
import FireBaseLogin from '../../../components/FireBaseLogin';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;

	@media only screen and (min-width: 401px) {
		padding-top: 130px;
		margin: 0 auto;
		width: 420px;
	}

	@media only screen and (max-width: 400px) {
		margin: 80px auto 80px auto;
		width: 320px;
	}
`;

const LoginFormLogo = styled.div`
	margin: 0 auto;
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

const NoticeContainer = styled.div`
	height: 100px;
	line-height: 100px;
	margin: 0 auto;
`;

/*
 *	Login 데이터 입력 컴포넌트
 *
 */
const LoginContent = ({ onLogin }) => {
	const [username, onChangeUserename] = useInput('test');
	const [password, onChangePassword] = useInput('test');

	return (
		<Container>
			<LoginFormLogo>
				<h1>Trello Clone</h1>
			</LoginFormLogo>
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
						<Button type="primary" onClick={() => onLogin({ username, password })} block>
							Log In
						</Button>
					</ControlContainer>
					<FireBaseLogin />
				</ContentContainer>
			</LoginFormContainer>
			<NoticeContainer>테스트 계정은 test/test (ID/PWD)를 사용하시면 됩니다.</NoticeContainer>
		</Container>
	);
};

LoginContent.propTypes = {
	onLogin: PropTypes.func.isRequired,
};

export default React.memo(LoginContent);
