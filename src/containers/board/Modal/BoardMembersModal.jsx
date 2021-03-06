import React, { useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import useInput from '../../../hooks/useInput';
import Button from '../../../components/Button';
import Modal from '../../../components/Modal';
import MemberListItem from '../../../components/MemberListItem';
import { getBoardMembers, addBoardMember, deleteBoardMember } from '../../../modules/board';

const MembersModal = styled(Modal)`
	border-radius: 3px;
	min-height: 150px;
	width: 480px;

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
	display: flex;
	flex-direction: column;
	margin-bottom: 16px;
	padding: 12px 32px 0 16px;
`;

const TitleWrapper = styled.div`
	height: 32px;
	line-height: 32px;
	margin-bottom: 8px;
	padding-left: 4px;
`;

const EmailInput = styled.input`
	border: none;
	box-shadow: inset 0 0 0 2px #dfe1e6;
	box-sizing: border-box;
	border-radius: 3px;
	background-color: #fafbfc;
	font-size: 14px;
	height: 32px;
	padding: 8px 12px;
	width: 80%;
`;

/*
 *	Board에 member를 추가하는 컴포넌트
 *
 */
const BoardMembersModal = ({ visible, onCloseModal }) => {
	const dispatch = useDispatch();
	const board = useSelector((state) => state.board.board);
	const boardMembers = useSelector((state) => state.board.boardMembers);
	const [email, onChangeEmail, setEmail] = useInput('');

	const getMembers = useCallback(async () => {
		if (visible === false) return;

		if (board.board_id !== undefined) dispatch(getBoardMembers({ boardId: board.board_id }));
	}, [visible, board, dispatch]);

	const handleMemberAdd = useCallback(async () => {
		if (email === '') return;
		const data = { email };
		const result = await dispatch(addBoardMember({ boardId: board.board_id, data }));

		if (result.success === true) getMembers();
	}, [dispatch, board, getMembers]);

	const handleMemberDelete = useCallback(
		async (memberId) => {
			const result = await dispatch(deleteBoardMember({ boardId: board.board_id, memberId }));

			if (result.success === true) getMembers();
		},
		[dispatch, board, getMembers]
	);

	useEffect(() => {
		getMembers();
	}, [getMembers]);

	useEffect(() => {
		setEmail('');
	}, [setEmail]);

	return (
		<MembersModal visible={visible} onCloseModal={onCloseModal}>
			<AddMemberContainer>
				<TitleWrapper>Invite member</TitleWrapper>
				<EmailInput value={email} onChange={onChangeEmail} placeholder="input member email" /> &nbsp;
				<Button type="primary" onClick={handleMemberAdd}>
					Add
				</Button>
				&nbsp;&nbsp;
			</AddMemberContainer>
			<MemberListContainer>
				<TitleWrapper>Members</TitleWrapper>
				{boardMembers &&
					boardMembers.map((member) => (
						<MemberListItem member={member} onDeleteClick={handleMemberDelete} key={member.member_id} />
					))}
			</MemberListContainer>
		</MembersModal>
	);
};

BoardMembersModal.propTypes = {
	visible: PropTypes.bool.isRequired,
	onCloseModal: PropTypes.func.isRequired,
};

export default React.memo(BoardMembersModal);
