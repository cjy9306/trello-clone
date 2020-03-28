import React, { useEffect, useCallback } from 'react';
import styled from 'styled-components/macro';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import useCheckWhetherIsLogined from '../../hooks/useCheckWhetherIsLogined';
import GlobalHeader from '../../components/GlobalHeader';
import { getTeam } from '../../modules/team';
import TeamInfo from './TeamInfo';
import TeamMemberList from './TeamMemberList';

const Container = styled.div``;

const TeamSettingsContainer = ({ match }) => {
	const teamId = match.params.teamId;
	const isLogined = useCheckWhetherIsLogined();
	const dispatch = useDispatch();

	const getTeamInfo = useCallback(async () => {
		dispatch(getTeam({ teamId }));
	}, [dispatch, teamId]);

	useEffect(() => {
		getTeamInfo();
	}, [getTeamInfo]);

	return (
		<>
			<GlobalHeader isLogined={isLogined} backgroundColor={'#026aa7'} />
			<Container>
				<TeamInfo teamId={teamId} />
				<TeamMemberList teamId={teamId} />
			</Container>
		</>
	);
};

TeamSettingsContainer.propTypes = {
	match: PropTypes.shape({
		params: PropTypes.shape({
			teamId: PropTypes.number.isRequired
		}).isRequired
	}).isRequired
};

export default React.memo(TeamSettingsContainer);
