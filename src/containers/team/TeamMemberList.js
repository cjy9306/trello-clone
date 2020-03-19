import React from 'react';
import styled from 'styled-components/macro';
import Button from '../../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../../hooks/useInput';
import { getTeam, addTeamMember, deleteTeamMember } from '../../modules/team';
import MemberListItem from '../../components/MemberListItem';
import { setMessageStates } from '../../modules/common';

const SettingsContent = styled.div``;

const MembersContent = styled.div`
	max-width: 768px;
	margin: 0 auto;
	padding: 16px 32px;
`;

const MembersHeader = styled.div``;

const MembersInput = styled.div`
	margin-bottom: 16px;
`;

const MembersList = styled.div``;

const TitleWrapper = styled.div`
	height: 32px;
	line-height: 32px;
	margin-bottom: 8px;
	padding-left: 4px;
`;

const EmailInput = styled.input`
	height: 32px;
	width: 300px;
	background-color: #fafbfc;
	border: none;
	box-shadow: inset 0 0 0 2px #dfe1e6;
	box-sizing: border-box;
	border-radius: 3px;
	padding: 8px 12px;
	font-size: 14px;

	// desktop, tablet
	@media only screen and (min-width: 769px) {
		width: 300px;
	}

	// phone
	@media only screen and (min-width: 481px) and (max-width: 768px) {
		width: 300px;
	}

	// low resolution phone
	@media only screen and (max-width: 480px) {
		width: 220px;
	}
`;

const TeamMemberList = ({ teamId }) => {
	const dispatch = useDispatch();
	const teamMembers = useSelector(state => state.team.teamMembers);
	const [email, onChangeEmail] = useInput('');

	const onAddMember = async () => {
		const data = { email };
		const result = await dispatch(addTeamMember({ teamId, data }));

		if (result.success) getTeam();
		else dispatch(setMessageStates(true, 'error', result.data.data));
	};

	const onMemberDeleteClick = async memberId => {
		const result = await dispatch(deleteTeamMember({ teamId, memberId }));

		if (result.success) dispatch(getTeam({ teamId }));
		else dispatch(setMessageStates(true, 'error', result.data.data));
	};

	return (
		<SettingsContent>
			<MembersContent>
				<MembersHeader>
					<TitleWrapper>Invite member</TitleWrapper>
				</MembersHeader>
				<MembersInput>
					<EmailInput value={email} onChange={onChangeEmail} placeholder="input member email" /> &nbsp;
					<Button type="primary" onClick={onAddMember}>
						Add
					</Button>{' '}
					&nbsp;
				</MembersInput>
				<MembersList>
					<TitleWrapper>Members</TitleWrapper>
					{teamMembers &&
						teamMembers.map(member => (
							<MemberListItem member={member} onDeleteClick={onMemberDeleteClick} key={member.member_id} />
						))}
				</MembersList>
			</MembersContent>
		</SettingsContent>
	);
};

export default React.memo(TeamMemberList);
