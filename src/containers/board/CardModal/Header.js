import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import useInput from '../../../hooks/useInput';
import { updateCard, changeCard } from '../../../modules/board';
import { useDispatch, useSelector } from 'react-redux';
import { setMessageStates } from '../../../modules/common';

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

const CustomIcon = styled(FontAwesomeIcon)`
	left: -40px;
	position: absolute;
	padding: 2px 0 0 10px;
`;

const Header = ({ card }) => {
	const dispatch = useDispatch();
	const board = useSelector(state => state.board.board);
	const lists = useSelector(state => state.board.lists);
	const [title, onChangeTitle, setTitle] = useInput(card ? card.card_name : '');

	const onBlurInputField = async () => {
		const data = { ...card, card_name: title };
		const result = await dispatch(updateCard({ boardId: board.board_id, card_id: card.card_id, data }));

		let listIndex = 0;
		const targetList = lists.filter((listItem, index) => {
			if (listItem.list_id === card.list_id) {
				listIndex = index;
				return true;
			}
			return false;
		})[0];

		const newCards = targetList.cards.map(cardItem => {
			if (cardItem.card_id === card.card_id) return data;
			else return cardItem;
		});

		targetList.cards = newCards;
		const newLists = [...lists];
		newLists[listIndex] = targetList;

		if (result.success) dispatch(changeCard(newLists));
		else dispatch(setMessageStates(true, 'error', result.data.data));
	};

	useEffect(() => {
		setTitle(card.card_name);
	}, [card, setTitle]);

	return (
		<HeaderContainer>
			<CustomIcon icon={faCreditCard} size="xs" />
			<InputField value={title} onChange={onChangeTitle} onBlur={onBlurInputField} />
		</HeaderContainer>
	);
};

export default Header;
