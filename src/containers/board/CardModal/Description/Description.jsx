import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { transformLineFeed } from '../../../../common/CommonUtils';
import useInput from '../../../../hooks/useInput';
import Button from '../../../../components/Button';
import { updateCard, getCard } from '../../../../modules/board';

const Container = styled.div``;

const LabelWrapper = styled.div`
	background-color: rgba(9, 30, 66, 0.04);
	box-shadow: none;
	border: none;
	border-radius: 3px;
	cursor: pointer;
	display: ${(props) => (props.isEditting ? 'none' : 'block')};
	font-size: 14px;
	min-height: 40px;
	padding: 8px 12px;
	text-decoration: none;
	&:hover {
		background-color: rgba(9, 30, 66, 0.09);
	}
`;

const TextAreaWrapper = styled.div`
	display: ${(props) => (props.isEditting ? 'block' : 'none')};
	width: 100%;
`;

const TextAreaField = styled.textarea`
	border: none;
	background: #fff;
	box-shadow: none;
	padding: 8px 12px;
	box-sizing: border-box;
	border-radius: 3px;
	font-size: 14px;
	height: 108px;
	min-height: 108px;
	overflow: hidden;
	overflow-wrap: break-word;
	resize: none;
	width: 100%;
`;

const ControlWrapper = styled.div``;

const Description = ({ card }) => {
	const dispatch = useDispatch();
	const [isEditting, setIsEditting] = useState(false);
	const [description, onChangeDescription, setDescription] = useInput('');
	const board = useSelector((state) => state.board.board);
	const editRef = useRef();

	const onToggleDescription = useCallback(() => setIsEditting((isEditting) => !isEditting), []);

	const onSaveClick = async () => {
		if (card.description === description) return;

		const data = {
			...card,
			description,
		};

		const result = await dispatch(updateCard({ boardId: board.board_id, cardId: card.card_id, data }));

		if (result.success) await dispatch(getCard({ boardId: board.board_id, cardId: card.card_id }));
		onToggleDescription();
	};

	useEffect(() => {
		setIsEditting(false);
		setDescription(card.description || '');
	}, [card, setDescription]);

	useEffect(() => {
		if (isEditting) editRef.current.focus();
	}, [isEditting]);

	return (
		<Container>
			<LabelWrapper isEditting={isEditting} onClick={onToggleDescription}>
				{description === '' || description == null
					? 'Add a more detailed description...'
					: transformLineFeed(description)}
			</LabelWrapper>
			<TextAreaWrapper isEditting={isEditting}>
				<TextAreaField
					value={description}
					placeholder={description == null || description === '' ? 'Add a more detailed description...' : ''}
					ref={editRef}
					onChange={onChangeDescription}
				/>
				<ControlWrapper>
					<Button type="primary" onClick={onSaveClick}>
						Save
					</Button>{' '}
					&nbsp;
					<Button type="default" onClick={onToggleDescription}>
						Cancel
					</Button>
				</ControlWrapper>
			</TextAreaWrapper>
		</Container>
	);
};

Description.propTypes = {
	card: PropTypes.object.isRequired,
};

export default React.memo(Description);
