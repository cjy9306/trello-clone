import React, { useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import useInput from '../../../../hooks/useInput';
import { getCardMembers, addCardMember, deleteCardMember } from '../../../../modules/board';
import Button from '../../../../components/Button';
import MemberListItem from '../../../../components/MemberListItem';
import SideBarPopup from './SideBarPopup';

const MembersContainer = styled.div`
	background-color: #fff;
`;

const SideBarMembersHeader = styled.div`
	height: 32px;
	line-height: 32px;
	padding: 8px 16px 0 16px;
	text-align: center;
`;

const AddMemberContainer = styled.div`
	border-radius: 3px;
	padding: 16px 32px 0 16px;
`;

const MemberListContainer = styled.div`
	border-radius: 3px;
	display: flex;
	flex-direction: column;
	padding: 12px 16px 0 16px;
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
	width: 70%;
	padding: 8px 12px;
`;

const CloseSpan = styled.span`
	color: #aaaaaa;
	font-size: 20px;
	font-weight: bold;
	margin-right: 8px;
	position: absolute;
	right: 0;
	&:hover,
	&:focus {
		color: #000;
		text-decoration: none;
		cursor: pointer;
	}
`;

/*
 *	Sidebar의 member를 선택하는 컴포넌트
 *
 */

const SideBarMembers = ({ visible, onPopupToggle, card }) => {
	const dispatch = useDispatch();
	const board = useSelector((state) => state.board.board);
	const cardMembers = useSelector((state) => state.board.cardMembers);
	const [email, onChangeEmail, setEmail] = useInput('');

	const getMembers = useCallback(async () => {
		if (board.board_id !== undefined && card.card_id !== undefined)
			dispatch(getCardMembers({ boardId: board.board_id, cardId: card.card_id }));
	}, [board, card, dispatch]);

	const onAddMember = async () => {
		if (email === '') return;
		const data = { email };
		const result = await dispatch(addCardMember({ boardId: board.board_id, cardId: card.card_id, data }));

		if (result.success) getMembers();
	};

	const onMemberDeleteClick = async (memberId) => {
		const result = await dispatch(deleteCardMember({ boardId: board.board_id, cardId: card.card_id, memberId }));

		if (result.success) getMembers();
	};

	useEffect(() => {
		getMembers();
	}, [card, getMembers]);

	useEffect(() => {
		setEmail('');
	}, [setEmail]);

	return (
		<SideBarPopup visible={visible}>
			<MembersContainer>
				<SideBarMembersHeader>
					Members
					<CloseSpan onClick={onPopupToggle}>&times;</CloseSpan>
					<hr />
				</SideBarMembersHeader>
				<AddMemberContainer>
					<TitleWrapper>Invite member</TitleWrapper>
					<EmailInput value={email} onChange={onChangeEmail} placeholder="input member email" /> &nbsp;
					<Button type="primary" onClick={onAddMember}>
						Add
					</Button>
					&nbsp;&nbsp;
				</AddMemberContainer>
				<MemberListContainer>
					{cardMembers &&
						cardMembers.map((member) => (
							<MemberListItem member={member} onDeleteClick={onMemberDeleteClick} key={member.member_id} />
						))}
				</MemberListContainer>
			</MembersContainer>
		</SideBarPopup>
	);
};

SideBarMembers.propTypes = {
	visible: PropTypes.bool.isRequired,
	onPopupToggle: PropTypes.func.isRequired,
	card: PropTypes.object.isRequired,
};

export default React.memo(SideBarMembers);
