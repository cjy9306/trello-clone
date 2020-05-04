import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import BoardTitleBox from './BoardTitleBox';
import CreateBoardBox from './CreateBoardBox';

const BoardListContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	box-sizing: border-box;
	margin-bottom: 12px;
	padding: 0 0 0 2%;
`;

/*
 *	주어진 board list를 출력하는 컴포넌트
 *
 */
const BoardList = ({ boards, onToggleBoardModal }) => {
	return (
		<BoardListContainer>
			{boards && boards.length > 0 && boards.map((board) => <BoardTitleBox board={board} key={board.board_id} />)}
			{boards && boards.length === 0 && <CreateBoardBox onClick={onToggleBoardModal} text="Create a new board" />}
		</BoardListContainer>
	);
};

BoardList.propTypes = {
	boards: PropTypes.array.isRequired,
	onToggleBoardModal: PropTypes.func.isRequired,
};

export default React.memo(BoardList);
