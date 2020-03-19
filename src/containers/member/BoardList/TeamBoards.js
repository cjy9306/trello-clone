import React from 'react';
import styled from 'styled-components/macro';
import { useSelector } from 'react-redux';
import BoardList from './BoardList';
import TeamBoardHeader from './TeamBoardHeader';

const TeamBoardContainer = styled.div``;

const TeamContainer = styled.div``;

const TeamBoards = ({ onShowBoardModal }) => {
	const teamBoards = useSelector(state => state.member.teamBoards);

	return (
		<TeamContainer>
			{teamBoards &&
				teamBoards.map(team => (
					<TeamBoardContainer>
						<TeamBoardHeader team={team} />
						<BoardList boards={team.boards} onShowBoardModal={onShowBoardModal} />
					</TeamBoardContainer>
				))}
		</TeamContainer>
	);
};

export default React.memo(TeamBoards);
