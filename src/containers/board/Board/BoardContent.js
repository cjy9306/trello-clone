import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import List from '../List/List';

const Container = styled.div`
	height: 100%;
	overflow-x: auto;
	white-space: nowrap;
`;

const BoardContent = ({ board, lists, onDragEnd }) => {
	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Droppable droppableId="all-lists" direction="horizontal" type="list">
				{provided => (
					<Container {...provided.droppableProps} ref={provided.innerRef}>
						{lists.map((list, index) => (
							<List key={list.list_id} list={list} board={board} index={index} />
						))}
						{provided.placeholder}
					</Container>
				)}
			</Droppable>
		</DragDropContext>
	);
};

BoardContent.propTypes = {
	board: PropTypes.object.isRequired,
	lists: PropTypes.array.isRequired,
	onDragEnd: PropTypes.func.isRequired
};

export default React.memo(BoardContent);
