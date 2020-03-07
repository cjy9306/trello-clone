import React from 'react';
import styled from 'styled-components/macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserFriends } from '@fortawesome/free-solid-svg-icons';
import BoardTitleBox from './BoardTitleBox';
import Button from '../../components/Button';
import { useHistory } from 'react-router-dom';

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

const TeamContainer = styled.div``;

const SettingsButton = styled(Button)`
	float: right;
`;

const TeamBoards = ({ team, onShowBoardModal }) => {
	const history = useHistory();
	// create board modal
	const onClickSettings = teamId => history.push('/team/' + teamId + '/settings');

	return (
		<TeamContainer key={team.team_id}>
			<BoardListHeader>
				<CustomIcon icon={faUserFriends} size="xs" />
				{team.team_name}&nbsp;
				<SettingsButton type="default" onClick={() => onClickSettings(team.team_id)}>
					Settings
				</SettingsButton>
			</BoardListHeader>
			<BoardContent>
				{team.boards &&
					team.boards.length > 0 &&
					team.boards.map(board => <BoardTitleBox board={board} key={board.board_id} />)}
				{team.boards && team.boards.length === 0 && (
					<CreateBoardBox onClick={onShowBoardModal}>Create a new board</CreateBoardBox>
				)}
			</BoardContent>
		</TeamContainer>
	);
};

export default React.memo(TeamBoards);
