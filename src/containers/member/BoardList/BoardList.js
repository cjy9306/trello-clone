import React from 'react';
import styled from 'styled-components/macro';
import BoardTitleBox from './BoardTitleBox';

const BoardListContainer = styled.div`
	box-sizing: border-box;
	height: 32px;
	line-height: 32px;
	margin-bottom: 12px;
	padding: 0 0 0 2%;
	width: 100%;
`;

const CreateBoardBox = styled.div`
	background-color: rgba(9, 30, 66, 0.07);
	box-sizing: border-box;
	border-radius: 3px;
	cursor: pointer;
	font-size: 16px;
	height: 96px;
	line-height: 96px;
	margin: 0 2% 2% 0;
	padding: auto 8px;
	text-align: center;
	width: 21.5%;

	&:hover {
		background-color: rgba(9, 30, 66, 0.17);
	}
`;

const BoardList = ({ boards, onShowBoardModal }) => {
	return (
		<BoardListContainer>
			{boards && boards.length > 0 && boards.map(board => <BoardTitleBox board={board} key={board.board_id} />)}
			{boards && boards.length === 0 && <CreateBoardBox onClick={onShowBoardModal}>Create a new board</CreateBoardBox>}
		</BoardListContainer>
	);
};

export default React.memo(BoardList);
