import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import ContentsWithLF from '../../../../components/ContentsWithLF';
import useInput from '../../../../hooks/useInput';
import Button from '../../../../components/Button';
import { updateCard, getCard } from '../../../../modules/board';

const ContentContainer = styled.div``;

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

/*
 *	Description의 실제 정보를 나타내는 컴포넌트
 *
 */

const DescriptionContent = ({ card }) => {
	const dispatch = useDispatch();
	const [isEditting, setIsEditting] = useState(false);
	const [description, onChangeDescription, setDescription] = useInput('');
	const board = useSelector((state) => state.board.board);
	const editRef = useRef(null);

	const toggleDescription = useCallback(() => setIsEditting((isEditting) => !isEditting), []);

	const handleSaveClick = useCallback(async () => {
		if (card.description === description) return;

		const data = {
			...card,
			description,
		};

		const result = await dispatch(updateCard({ boardId: board.board_id, cardId: card.card_id, data }));

		if (result.success === true) dispatch(getCard({ boardId: board.board_id, cardId: card.card_id }));
		toggleDescription();
	}, [dispatch, board, card, description]);

	useEffect(() => {
		setIsEditting(false);
		setDescription(card.description || '');
	}, [card, setDescription]);

	useEffect(() => {
		if (isEditting) editRef.current.focus();
	}, [isEditting]);

	return (
		<ContentContainer>
			<LabelWrapper isEditting={isEditting} onClick={toggleDescription}>
				{description === '' || description == null ? (
					'Add a more detailed description...'
				) : (
					<ContentsWithLF contents={description} />
				)}
			</LabelWrapper>
			<TextAreaWrapper isEditting={isEditting}>
				<TextAreaField
					value={description}
					placeholder={description == null || description === '' ? 'Add a more detailed description...' : ''}
					ref={editRef}
					onChange={onChangeDescription}
				/>
				<div>
					<Button type="primary" onClick={handleSaveClick}>
						Save
					</Button>
					&nbsp;&nbsp;
					<Button type="default" onClick={toggleDescription}>
						Cancel
					</Button>
				</div>
			</TextAreaWrapper>
		</ContentContainer>
	);
};

DescriptionContent.propTypes = {
	card: PropTypes.object.isRequired,
};

export default React.memo(DescriptionContent);
