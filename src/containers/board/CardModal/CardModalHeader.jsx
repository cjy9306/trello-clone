import React, { useEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import useInput from '../../../hooks/useInput';
import { updateCard, changeCard } from '../../../modules/board';

const HeaderContainer = styled.div`
	font-size: 20px;
	margin: 12px 40px 8px 56px;
	min-height: 32px;
	position: relative;
`;

const InputField = styled.input.attrs({ type: 'text' })`
	border: none;
	background: transparent;
	box-shadow: none;
	border-radius: 3px;
	font-weight: 400;
	font-size: 20px;
	min-height: 26px;
	overflow: hidden;
	overflow-wrap: break-word;
	resize: none;
	width: calc(100% - 54px);
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

/*
 *	CardModal의 header
 *
 */
const CardModalHeader = ({ card }) => {
	const dispatch = useDispatch();
	const board = useSelector((state) => state.board.board);
	const lists = useSelector((state) => state.board.lists);
	const [title, onChangeTitle, setTitle] = useInput('');

	const onBlurInputField = async () => {
		const data = { ...card, cardName: title };
		const result = await dispatch(updateCard({ boardId: board.board_id, cardId: card.card_id, data }));

		let listIndex = 0;
		const targetList = lists.filter((listItem, index) => {
			if (listItem.list_id === card.list_id) {
				listIndex = index;
				return true;
			}
			return false;
		})[0];

		const newCards = targetList.cards.map((cardItem) => {
			if (cardItem.card_id === card.card_id) return data;
			else return cardItem;
		});

		targetList.cards = newCards;
		const newLists = [...lists];
		newLists[listIndex] = targetList;

		if (result.success) dispatch(changeCard(newLists));
	};

	useEffect(() => {
		if (card.card_name !== undefined) setTitle(card.card_name);
	}, [card, setTitle]);

	return (
		<HeaderContainer>
			<CustomIcon icon={faCreditCard} size="xs" />
			<InputField value={title} onChange={onChangeTitle} onBlur={onBlurInputField} />
		</HeaderContainer>
	);
};

CardModalHeader.propTypes = {
	card: PropTypes.object.isRequired,
};

export default React.memo(CardModalHeader);
