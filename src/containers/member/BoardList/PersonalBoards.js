import React from 'react';
import styled from 'styled-components/macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import BoardTitleBox from './BoardTitleBox';

const BoardListContainer = styled.div`
	margin: 20px auto;
`;

const BoardListHeader = styled.div`
	width: 100%;
	height: 32px;
	line-height: 32px;
	padding: 0 0 0 2%;
	margin-bottom: 12px;
	box-sizing: border-box;
`;

const BoardContent = styled.div`
	display: flex;
	flex-wrap: wrap;
	width: 100%;
`;

const CustomIcon = styled(FontAwesomeIcon)`
	font-size: 16px;
	margin-right: 16px;
`;

const PersonalBoards = () => {
	const personalBoards = useSelector(state => state.member.personalBoards);

	return (
		<BoardListContainer>
			<BoardListHeader>
				<CustomIcon icon={faUser} size="xs" />
				Personal Boards
			</BoardListHeader>
			<BoardContent>
				{personalBoards && personalBoards.map(board => <BoardTitleBox board={board} key={board.board_id} />)}
			</BoardContent>
		</BoardListContainer>
	);
};

export default PersonalBoards;
