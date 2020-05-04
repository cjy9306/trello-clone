import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import BoardList from './BoardList';
import TeamBoardHeader from './TeamBoardHeader';
import PropTypes from 'prop-types';

const TeamBoardContainer = styled.section``;

const TeamContainer = styled.div``;

/*
 *	MemberBoardsContainer에서 member가 속한 team들의 board list 를 담은 컴포넌트
 *
 */
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
