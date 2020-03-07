import React from 'react';
import styled from 'styled-components/macro';
import { useSelector } from 'react-redux';

import TeamBoards from './TeamBoards';

const BoardListContainer = styled.div`
	margin: 20px auto;
`;

const MemberTeams = ({ onShowBoardModal }) => {
	const teamBoards = useSelector(state => state.member.teamBoards);

	return (
		<BoardListContainer>
			{teamBoards &&
				teamBoards.map(team => <TeamBoards team={team} onShowBoardModal={onShowBoardModal} key={team.team_id} />)}
		</BoardListContainer>
	);
};

export default React.memo(MemberTeams);
