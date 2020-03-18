import React, { useEffect, useCallback } from 'react';
import styled from 'styled-components/macro';
import useInput from '../../hooks/useInput';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import { getBoardMembers, addBoardMember, deleteBoardMember } from '../../modules/board';
import { useDispatch, useSelector } from 'react-redux';
import MemberListItem from '../../components/MemberListItem';
import { setMessageStates } from '../../modules/common';

const MembersModal = styled(Modal)`
	width: 480px;
	min-height: 150px;
	border-radius: 3px;

	@media only screen and (min-width: 501px) {
		width: 480px;
	}

	@media only screen and (max-width: 500px) {
		width: 350px;
	}
`;

const AddMemberContainer = styled.div`
	border-radius: 3px;
	padding: 16px 32px 0 16px;
`;

const MemberListContainer = styled.div`
	border-radius: 3px;
	padding: 12px 32px 0 16px;
	margin-bottom: 16px;
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
	width: 80%;
	background-color: #fafbfc;
	border: none;
	box-shadow: inset 0 0 0 2px #dfe1e6;
	box-sizing: border-box;
	border-radius: 3px;
	padding: 8px 12px;
	font-size: 14px;
`;

const BoardMembersModal = ({ visible, onCloseModal }) => {
	const dispatch = useDispatch();
	const board = useSelector(state => state.board.board);
	const boardMembers = useSelector(state => state.board.boardMembers);
	const [email, onChangeEmail, setEmail] = useInput('');

	const getMembers = useCallback(async () => {
		if (visible === false) return;

		const result = dispatch(getBoardMembers({ boardId: board.board_id }));

		if (result.success === false) dispatch(setMessageStates(true, 'error', result.data.data));
	}, [visible, board, dispatch]);

	const onAddMember = async () => {
		if (email === '') return;
		const data = { email };
		const result = await dispatch(addBoardMember({ boardId: board.board_id, data }));

		if (result.success) getMembers();
		else dispatch(setMessageStates(true, 'error', result.data.data));
	};

	const onMemberDeleteClick = async memberId => {
		const result = await dispatch(deleteBoardMember({ boardId: board.board_id, member_id: memberId }));

		if (result.success) getMembers();
		else dispatch(setMessageStates(true, 'error', result.data.data));
	};

	useEffect(() => {
		getMembers();
	}, [visible, getMembers]);

	useEffect(() => {
		setEmail('');
	}, [setEmail]);

	return (
		<MembersModal visible={visible} onCloseModal={onCloseModal}>
			<AddMemberContainer>
				<TitleWrapper>Invite member</TitleWrapper>
				<EmailInput value={email} onChange={onChangeEmail} placeholder="input member email" /> &nbsp;
				<Button type="primary" onClick={onAddMember}>
					Add
				</Button>{' '}
				&nbsp;
			</AddMemberContainer>
			<MemberListContainer>
				<TitleWrapper>Members</TitleWrapper>
				{boardMembers &&
					boardMembers.map(member => (
						<MemberListItem member={member} onDeleteClick={onMemberDeleteClick} key={member.member_id} />
					))}
			</MemberListContainer>
		</MembersModal>
	);
};

export default React.memo(BoardMembersModal);
