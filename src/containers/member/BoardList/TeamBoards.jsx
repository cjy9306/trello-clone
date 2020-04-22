import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import BoardList from './BoardList';
import TeamBoardHeader from './TeamBoardHeader';
import PropTypes from 'prop-types';

const TeamBoardContainer = styled.div``;

const TeamContainer = styled.div``;

const TeamBoards = ({ onToggleBoardModal }) => {
	const teamBoards = useSelector((state) => state.member.teamBoards);

	return (
		<TeamContainer>
			{teamBoards &&
				teamBoards.map((team) => (
					<TeamBoardContainer key={team.team_id}>
						<TeamBoardHeader team={team} />
						<BoardList boards={team.boards} onToggleBoardModal={onToggleBoardModal} />
					</TeamBoardContainer>
				))}
		</TeamContainer>
	);
};

TeamBoards.propTypes = {
	onToggleBoardModal: PropTypes.func.isRequired,
};

export default React.memo(TeamBoards);
