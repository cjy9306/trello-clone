import React, { useEffect, useCallback } from 'react';
import styled from 'styled-components/macro';
import useInput from '../../../hooks/useInput';
import Button from '../../../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import MemberListItem from '../../../components/MemberListItem';
import { getCardMembers, addCardMember, deleteCardMember } from '../../../modules/board';

const MembersContainer = styled.div`
	background-color: #fff;
`;

const SideBarMembersHeader = styled.div`
	text-align: center;
	line-height: 32px;
	height: 32px;
	padding: 8px 16px 0 16px;
`;

const AddMemberContainer = styled.div`
	border-radius: 3px;
	padding: 16px 32px 0 16px;
`;

const MemberListContainer = styled.div`
	border-radius: 3px;
	padding: 12px 16px 0 16px;
	display: flex;
	flex-direction: column;
`;

const TitleWrapper = styled.div`
	height: 32px;
	line-height: 32px;
	margin-bottom: 8px;
	padding-left: 4px;
`;

const EmailInput = styled.input`
	height: 32px;
	width: 70%;
	background-color: #fafbfc;
	border: none;
	box-shadow: inset 0 0 0 2px #dfe1e6;
	box-sizing: border-box;
	border-radius: 3px;
	padding: 8px 12px;
	font-size: 14px;
`;

const CloseSpan = styled.span`
	position: absolute;
	color: #aaaaaa;
	right: 0;
	font-size: 20px;
	font-weight: bold;
	margin-right: 8px;
	&:hover,
	&:focus {
		color: #000;
		text-decoration: none;
		cursor: pointer;
	}
`;

const SideBarMembers = ({ onPopupToggle, card }) => {
	const dispatch = useDispatch();
	const board = useSelector(state => state.board.board);
	const cardMembers = useSelector(state => state.board.cardMembers);
	const [email, onChangeEmail, setEmail] = useInput('');

	const getMembers = useCallback(async () => {
		dispatch(getCardMembers({ boardId: board.board_id, cardId: card.card_id }));
	}, [board, card, dispatch]);

	useEffect(() => {
		getMembers();
	}, [card, getMembers]);

	const onAddMember = async () => {
		if (email === '') return;
		const data = { email };
		const result = await dispatch(addCardMember({ boardId: board.board_id, cardId: card.card_id, data }));

		if (result.success) {
			getMembers();
		} else {
			console.log('add member fail');
		}
	};

	const onMemberDeleteClick = async memberId => {
		const result = await dispatch(deleteCardMember({ boardId: board.board_id, cardId: card.card_id, memberId }));

		if (result.success) {
			getMembers();
		} else {
			console.log('delete member fail');
		}
	};

	useEffect(() => {
		setEmail('');
	}, [setEmail]);

	return (
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
				</Button>{' '}
				&nbsp;
			</AddMemberContainer>
			<MemberListContainer>
				{cardMembers &&
					cardMembers.map(member => (
						<MemberListItem member={member} onDeleteClick={onMemberDeleteClick} key={member.member_id} />
					))}
			</MemberListContainer>
		</MembersContainer>
	);
};

export default React.memo(SideBarMembers);
