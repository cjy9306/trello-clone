import React, { useCallback } from 'react';
import styled from 'styled-components/macro';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';
import Button from '../../../components/Button';

const TeamHeader = styled.div`
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

const SettingsButton = styled(Button)`
	float: right;
`;

const TeamBoardHeader = ({ team }) => {
	const history = useHistory();
	const onClickSettings = useCallback(teamId => history.push('/team/' + teamId + '/settings'), [history]);

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

TeamBoardHeader.propTypes = {
	team: PropTypes.object.isRequired
};

export default React.memo(TeamBoardHeader);
