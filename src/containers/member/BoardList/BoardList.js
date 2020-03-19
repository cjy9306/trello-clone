import React from 'react';
import styled from 'styled-components/macro';
import BoardTitleBox from './BoardTitleBox';

const BoardListContainer = styled.div`
	width: 100%;
	height: 32px;
	line-height: 32px;
	padding: 0 0 0 2%;
	margin-bottom: 12px;
	box-sizing: border-box;
`;

const CreateBoardBox = styled.div`
	width: 21.5%;
	margin: 0 2% 2% 0;
	box-sizing: border-box;
	padding: auto 8px;
	height: 96px;
	line-height: 96px;
	border-radius: 3px;
	cursor: pointer;
	font-size: 16px;
	text-align: center;
	background-color: rgba(9, 30, 66, 0.07);
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
