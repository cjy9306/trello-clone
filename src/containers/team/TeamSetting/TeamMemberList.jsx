import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import useInput from '../../../hooks/useInput';
import Button from '../../../components/Button';
import MemberListItem from '../../../components/MemberListItem';
import { getTeam, addTeamMember, deleteTeamMember } from '../../../modules/team';

const TeamMembersContainer = styled.div`
	max-width: 768px;
	margin: 0 auto;
	padding: 16px 32px;
`;

const MembersInput = styled.div`
	margin-bottom: 16px;
`;

const TitleWrapper = styled.div`
	height: 32px;
	line-height: 32px;
	margin-bottom: 8px;
	padding-left: 4px;
`;

const EmailInput = styled.input`
	background-color: #fafbfc;
	border: none;
	box-shadow: inset 0 0 0 2px #dfe1e6;
	box-sizing: border-box;
	border-radius: 3px;
	font-size: 14px;
	height: 32px;
	padding: 8px 12px;
	width: 300px;

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

/*
 *	Team에 속한 member list 컴포넌트
 *
 */
const TeamMemberList = ({ teamId }) => {
	const dispatch = useDispatch();
	const teamMembers = useSelector((state) => state.team.teamMembers);
	const [email, onChangeEmail] = useInput('');

	const handleMemberAdd = async () => {
		const data = { email };
		const result = await dispatch(addTeamMember({ teamId, data }));

		if (result.success === true) dispatch(getTeam({ teamId }));
	};

	const handleMemberDelete = async (memberId) => {
		const result = await dispatch(deleteTeamMember({ teamId, memberId }));

		if (result.success === true) dispatch(getTeam({ teamId }));
	};

	return (
		<TeamMembersContainer>
			<TitleWrapper>Invite member</TitleWrapper>
			<MembersInput>
				<EmailInput value={email} onChange={onChangeEmail} placeholder="input member email" /> &nbsp;
				<Button type="primary" onClick={handleMemberAdd}>
					Add
				</Button>
			</MembersInput>
			<TitleWrapper>Members</TitleWrapper>
			{teamMembers &&
				teamMembers.map((member) => (
					<MemberListItem member={member} onDeleteClick={handleMemberDelete} key={member.member_id} />
				))}
		</TeamMembersContainer>
	);
};

TeamMemberList.propTypes = {
	teamId: PropTypes.string.isRequired,
};

export default React.memo(TeamMemberList);
