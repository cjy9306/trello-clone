import React, { useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { GLOBAL_HEADER_DEFAULT_BACKGROUND } from '../../common/Constants';
import useCheckWhetherIsLogined from '../../hooks/useCheckWhetherIsLogined';
import Message from '../../components/Message';
import GlobalHeader from '../../components/GlobalHeader';
import { getTeam } from '../../modules/team';
import TeamInfo from './TeamSetting/TeamInfo';
import TeamMemberList from './TeamSetting/TeamMemberList';

const SettingContainer = styled.div``;

/*
 *	Team Setting page의 루트 컴포넌트
 *
 */
const TeamSettingsContainer = ({ match }) => {
	const teamId = match.params.teamId;
	const isLogined = useCheckWhetherIsLogined();
	const dispatch = useDispatch();
	const message = useSelector((state) => state.common.message);

	const getTeamInfo = useCallback(async () => {
		dispatch(getTeam({ teamId }));
	}, [dispatch, teamId]);

	useEffect(() => {
		getTeamInfo();
	}, [getTeamInfo]);

	return (
		<>
			<GlobalHeader isLogined={isLogined} backgroundColor={GLOBAL_HEADER_DEFAULT_BACKGROUND} />
			<SettingContainer>
				<TeamInfo teamId={teamId} />
				<TeamMemberList teamId={teamId} />
			</SettingContainer>
			<Message visible={message.visible} type={message.type} text={message.text} />
		</>
	);
};

TeamSettingsContainer.propTypes = {
	match: PropTypes.shape({
		params: PropTypes.shape({
			teamId: PropTypes.string.isRequired,
		}).isRequired,
	}).isRequired,
};

export default React.memo(TeamSettingsContainer);
