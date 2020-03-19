import React, { useEffect, useCallback } from 'react';
import styled from 'styled-components/macro';
import GlobalHeader from '../../components/GlobalHeader';
import useCheckWhetherIsLogined from '../../hooks/useCheckWhetherIsLogined';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getTeam } from '../../modules/team';
import TeamInfo from './TeamInfo';
import TeamMemberList from './TeamMemberList';

const Container = styled.div``;

const TeamSettingsContainer = ({ match }) => {
	const teamId = match.params.teamId;
	const isLogined = useCheckWhetherIsLogined();
	const dispatch = useDispatch();
	const history = useHistory();

	const getTeamInfo = useCallback(async () => {
		const result = await dispatch(getTeam({ teamId }));

		if (!result.success) {
			const memberId = sessionStorage.getItem('memberId');
			alert('can not find this team');
			history.push('/member/' + memberId + '/boards');
		}
	}, [teamId, dispatch, history]);

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

export default React.memo(TeamSettingsContainer);
