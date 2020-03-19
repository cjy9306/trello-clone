import React from 'react';
import styled from 'styled-components/macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';
import Button from '../../../components/Button';

const TeamHeader = styled.div`
	width: 100%;
	height: 32px;
	line-height: 32px;
	padding: 0 0 0 2%;
	margin-bottom: 12px;
	box-sizing: border-box;
`;

const CustomIcon = styled(FontAwesomeIcon)`
	font-size: 16px;
	margin-right: 16px;
`;

const SettingsButton = styled(Button)`
	float: right;
`;

const TeamBoardHeader = ({ team }) => {
	const history = useHistory();
	const onClickSettings = teamId => history.push('/team/' + teamId + '/settings');

	return (
		<TeamHeader>
			<CustomIcon icon={faUserFriends} size="xs" />
			{team.team_name}&nbsp;
			<SettingsButton type="default" onClick={() => onClickSettings(team.team_id)}>
				Settings
			</SettingsButton>
		</TeamHeader>
	);
};

export default React.memo(TeamBoardHeader);
