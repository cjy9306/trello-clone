import React from 'react';
import styled from 'styled-components/macro';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import List from './List/List';

const Container = styled.div`
	overflow-x: auto;
	height: 100%;
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

export default React.memo(BoardContent);
