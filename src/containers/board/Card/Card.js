import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/macro';
import { Draggable } from 'react-beautiful-dnd';
import Tag from '../../../components/Tag';
import { changeModalVisible, getCard } from '../../../modules/board';
import { setMessageStates } from '../../../modules/common';

const CardContainer = styled.div`
	border: 1px lightgrey;
	border-radius: 3px;
	background-color: #fff;
	box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25);
	margin-bottom: 8px;
	overflow: hidden;
	padding: 8px;
	word-wrap: break-word;
`;

const CardContent = styled.div`
	cursor: pointer;
	word-wrap: break-word;
`;

const CardLabels = styled.div`
	overflow: auto;
	position: relative;
`;

const LabelWrapper = styled.span`
	border-radius: 4px;
	float: left;
	margin: 0 4px 4px 0;
	min-width: 20px;
	min-height: 8px;
	width: auto;
`;

const getStyle = (style, snapshot) => {
	if (!snapshot.isDropAnimating) {
		return style;
	}
	return {
		...style,
		transitionDuration: '0.001s'
	};
};

const Card = ({ card, board, index }) => {
	const dispatch = useDispatch();
	const savedCard = useSelector(state => state.board.card);

	const onShowModal = async () => {
		if (savedCard && savedCard.card_id === card.card_id) {
			dispatch(changeModalVisible(true));
		} else {
			const result = await dispatch(getCard({ boardId: board.board_id, card_id: card.card_id }));
			if (result.success) dispatch(changeModalVisible(true));
			else dispatch(setMessageStates(true, 'error', result.data.data));
		}
	};

	return (
		<Draggable draggableId={'card-' + card.card_id} index={index}>
			{(provided, snapshot) => (
				<CardContainer
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}
					style={getStyle(provided.draggableProps.style, snapshot)}
				>
					<CardContent onClick={onShowModal}>
						<CardLabels>
							{card.labels &&
								card.labels.map(label => (
									<LabelWrapper key={label.label_id}>
										<Tag size="default" color={`#${label.color}`}>
											{label.label_name}
										</Tag>
									</LabelWrapper>
								))}
						</CardLabels>
						{card.card_name}
						<br />
					</CardContent>
				</CardContainer>
			)}
		</Draggable>
	);
};

export default Card;
