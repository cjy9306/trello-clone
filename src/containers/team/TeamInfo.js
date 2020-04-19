import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { ConfirmModal } from '../../components/Modal';
import Button from '../../components/Button';
import { deleteTeam } from '../../modules/team';
import TeamInfoDescription from './TeamInfoDescription';

const TeamInfoContainer = styled.div`
	background-color: #f4f5f7;
	max-width: 768px;
	margin: 0 auto;
	padding: 48px 32px 24px 32px;
`;

const TeamInfoTitle = styled.div`
	font-size: 32px;
	padding-left: 12px;
	margin-bottom: 28px;
`;

const CustomIcon = styled(FontAwesomeIcon)`
	font-size: 32px;
	margin-right: 16px;
`;

const TeamInfo = ({ teamId }) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const team = useSelector(state => state.team.team);
	const [confirmModalVisible, setConfirmModalVisible] = useState(false);

	const onToggleDeleteModal = useCallback(() => setConfirmModalVisible(visible => !visible), []);

	const onTeamDeleteOk = useCallback(async () => {
		const result = await dispatch(deleteTeam({ teamId }));

		if (result.success) {
			const memberId = sessionStorage.getItem('memberId');
			history.push('/member/' + memberId + '/boards');
		}
	}, [dispatch, history, teamId]);

	return (
		<TeamInfoContainer>
			<TeamInfoTitle>
				<CustomIcon icon={faUserFriends} size="xs" />
				{team && team.team_name}
			</TeamInfoTitle>
			<TeamInfoDescription team={team} />
			<Button type="danger" onClick={onToggleDeleteModal}>
				Delete this team
			</Button>
			<ConfirmModal
				visible={confirmModalVisible}
				message="Are you sure delete this team?"
				onCloseModal={onToggleDeleteModal}
				onClickOk={onTeamDeleteOk}
			/>
		</TeamInfoContainer>
	);
};

TeamInfo.propTypes = {
	teamId: PropTypes.number.isRequired
};

export default React.memo(TeamInfo);
