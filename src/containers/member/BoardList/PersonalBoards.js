import React from 'react';
import styled from 'styled-components/macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import BoardList from './BoardList';

const BoardListContainer = styled.div`
	margin: 20px auto;
`;

const BoardListHeader = styled.div`
	box-sizing: border-box;
	height: 32px;
	line-height: 32px;
	margin-bottom: 12px;
	padding: 0 0 0 2%;
	width: 100%;
`;

const CustomIcon = styled(FontAwesomeIcon)`
	font-size: 16px;
	margin-right: 16px;
`;

const PersonalBoards = ({ onToggleBoardModal }) => {
	const personalBoards = useSelector(state => state.member.personalBoards);

	return (
		<BoardListContainer>
			<BoardListHeader>
				<CustomIcon icon={faUser} size="xs" />
				Personal Boards
			</BoardListHeader>
			<BoardList boards={personalBoards} onToggleBoardModal={onToggleBoardModal} />
		</BoardListContainer>
	);
};

export default React.memo(PersonalBoards);
