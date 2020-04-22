import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';
import { createCard, getBoard, updateList } from '../../../modules/board';
import AddCard from './AddCard';
import ListTitle from './ListTitle';
import Card from '../Card/Card';

const ListContainer = styled.div`
	box-sizing: border-box;
	display: inline-block;
	height: 100%;
	margin: 0 4px;
	vertical-align: top;
	width: 272px;
	white-space: nowrap;
	&:last-child {
		margin-right: 16px;
	}
`;

const ListWrapper = styled.div`
	background-color: #ebecf0;
	border-radius: 3px;
	display: flex;
	flex-direction: column;
	margin: 8px 0 8px 8px;
	width: 260px;
`;

const CardList = styled.div`
	border-radius: 3px;
	background-color: #ebecf0;
	flex-grow: 1;
	min-height: 100px;
	margin-bottom: 4px;
	padding: 0 8px 0 8px;
`;

const List = ({ list, index, board }) => {
	const dispatch = useDispatch();

	const onCreateCard = useCallback(
		async (newCardName) => {
			const data = {
				cardname: newCardName,
				seq: list.cards.length,
			};

			const result = await dispatch(createCard({ boardId: board.board_id, listId: list.list_id, data }));

			if (result.success === true) {
				dispatch(getBoard({ boardId: board.board_id }));
				return true;
			} else {
				return false;
			}
		},
		[dispatch, board, list]
	);

	const onUpdateTitle = useCallback(
		async (title) => {
			const data = { listName: title, seq: list.seq };
			dispatch(updateList({ boardId: board.board_id, listId: list.list_id, data }));
		},
		[dispatch, board, list]
	);

	return (
		<Draggable draggableId={'list-' + list.list_id} index={index}>
			{(provided) => (
				<ListContainer {...provided.draggableProps} ref={provided.innerRef}>
					<ListWrapper>
						<div {...provided.dragHandleProps}>
							<ListTitle {...provided.dragHandleProps} list={list} onUpdate={onUpdateTitle} />
						</div>
						<Droppable droppableId={'list-' + list.list_id} type="card">
							{(provided, snapshot) => (
								<CardList ref={provided.innerRef} {...provided.droppableProps}>
									{list.cards.map((card, index) => (
										<Card key={card.card_id} card={card} list={list} board={board} index={index} />
									))}
									{provided.placeholder}
								</CardList>
							)}
						</Droppable>
						<AddCard onCreateCard={onCreateCard} />
					</ListWrapper>
				</ListContainer>
			)}
		</Draggable>
	);
};

List.propTypes = {
	list: PropTypes.object.isRequired,
	index: PropTypes.number.isRequired,
	board: PropTypes.object.isRequired,
};

export default List;
