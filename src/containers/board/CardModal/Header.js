import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import useInput from '../../../components/useInput';

const HeaderContainer = styled.div`
	margin: 12px 40px 8px 56px;
	font-size: 20px;
	min-height: 32px;
	position: relative;
`;

const InputField = styled.input.attrs({ type: 'text' })`
	border: none;
	background: transparent;
	box-shadow: none;
	border-radius: 3px;
	overflow: hidden;
	min-height: 26px;
	overflow-wrap: break-word;
	width: calc(100% - 54px);
	font-size: 20px;
	resize: none;
	font-weight: 400;
	&:focus {
		background: #fff;
		box-shadow: inset 0 0 0 2px #0079bf;
	}
`;

const IconStyle = {
	left: '-40px',
	position: 'absolute',
	padding: '6px 0 0 10px'
};

const Header = ({ card }) => {
	const [title, onChangeTitle, setTitle] = useInput(card ? card.card_name : '');

	const onBlurInputField = () => {};

	useEffect(() => {
		setTitle(card.card_name);
	}, [card, setTitle]);

	return (
		<HeaderContainer>
			<FontAwesomeIcon icon={faCreditCard} size="xs" style={IconStyle} />
			<InputField value={title} onChange={onChangeTitle} onBlur={onBlurInputField} />
		</HeaderContainer>
	);
};

export default Header;
