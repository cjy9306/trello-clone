import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import Button from '../../components/Button';
import useInput from '../../components/useInput';
import Alert from '../../components/Alert';

const Container = styled.div`
    display: flex;
    justify-content: center;
    margin: 160px auto 0 auto;
    width: 420px;
    min-height: 380px;
`;

const LoginFormContainer = styled.div`
    background-color: white;
    border-radius: 3px;
    padding: 15px 40px 25px 40px;
    text-align: center;
    margin: 0 auto;
    box-shadow: rgba(0,0,0,0.2) 0 0 10px
`;

const LoginFormHeader = styled.div`
    text-align: center;
    height: 80px;
    line-height: 80px;
    color: #5E6C84;
    font-size: 16px;
    font-weight: bold;
`;

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const InputContainer = styled.div`
    width: 100%;
`;

const InputWrapper = styled.div`
    width: 100%;
    display:inline-flex;

    & > svg {
        position: absolute;
        height: 42px;
        margin-left: 15px;
    }
`;

const ControlContainer = styled.div`
    margin-bottom: 16px;
`;

const InputField = React.memo(styled.input`
    border: none;
    background: white;
    box-shadow: none;
    min-height: 38px;
    width: 100%;
    resize: none;
    padding-left: ${props => props.includeIcon === true ? '40px' : '10px'};
    padding-right: 10px;
    font-weight: 600;
    margin: 0px 0px 16px 0px;
    border: 2px solid #DFE1E6;
    border-radius: 3px;
`);

const ButtonWraper = styled.div`
    margin-bottom: 8px;
`;

const Login = ({onLogin, alertVisible}) => {
    useEffect(() => {
        console.log('useEffect in Login.js')
    });

    const [username, onChangeUserename] = useInput('');
    const [password, onChangePassword] = useInput('');

    return (
        <Container>
            <LoginFormContainer>
                <Alert type='error' message='Username or password does not correct' visible={alertVisible} />
                <LoginFormHeader>
                    Login to Trello Clone
                </LoginFormHeader>
                <ContentContainer>
                    <InputContainer>
                        <InputWrapper>
                            <InputField type='text' placeholder='input your name' name='username' value={username} onChange={onChangeUserename} />
                        </InputWrapper>
                        <InputWrapper>
                            <InputField type='password' placeholder='input your password' name='password' value={password} onChange={onChangePassword} />
                        </InputWrapper>
                    </InputContainer>
                    <ControlContainer>
                        <ButtonWraper>
                            <Button type='primary' onClick={() => onLogin({username, password})} block>Log In</Button>
                        </ButtonWraper>
                        <ButtonWraper>OR</ButtonWraper>
                        <ButtonWraper>
                            <Button block>Sign Up</Button>
                        </ButtonWraper>
                    </ControlContainer>
                    Terms of Service
                </ContentContainer>
            </LoginFormContainer>
        </Container>
    );
}

export default React.memo(Login)