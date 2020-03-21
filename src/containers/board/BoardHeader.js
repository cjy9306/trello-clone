import React, { useState, useCallback } from 'react';
import styled from 'styled-components/macro';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from '../../components/Button';
import HeaderButton from '../../components/HeaderButton';
import { ConfirmModal } from '../../components/Modal';
import { deleteBoard } from '../../modules/board';
import { setMessageStates } from '../../modules/common';
import BoardMembersModal from './BoardMembersModal';
import AddListModal from './AddListModal';

const BoardHeaderContainer = styled.div`
	display: flex;
	height: auto;
	justify-content: space-between;
	padding: 8px 16px 0 16px;
`;

const MenuContainer = styled.div`
	color: black;
	width: 100%;
`;

const MenuWrapper = styled.div`
	display: inline-block;
	margin-right: 16px;
`;

const DeleteBoardButton = styled(Button)`
	float: right;
`;

const BoardHeader = ({ board }) => {
	const history = useHistory();
	const dispatch = useDispatch();
	const [listModalVisible, setListModalVisible] = useState(false);
	const [membersModalVisible, setMembersModalVisible] = useState(false);
	const [deleteBoardModalVisible, setDeleteBoardModalVisible] = useState(false);

	const onToggleListModal = useCallback(() => setListModalVisible(visible => !visible), []);
	const onToggleMembersModal = useCallback(() => setMembersModalVisible(visible => !visible), []);
	const onToggleDeleteModal = useCallback(() => setDeleteBoardModalVisible(visible => !visible), []);

	const onDeleteBoard = useCallback(async () => {
		const result = await dispatch(deleteBoard({ boardId: board.board_id }));

		if (result.success) {
			const memberId = sessionStorage.getItem('memberId');
			history.push('/member/' + memberId + '/boards');
		} else {
			dispatch(setMessageStates(true, 'error', result.data.data));
		}
	}, [dispatch, board, history]);

	return (
		<BoardHeaderContainer>
			<BoardMembersModal visible={membersModalVisible} onCloseModal={onToggleMembersModal} />
			<AddListModal visible={listModalVisible} onCloseModal={onToggleListModal} />
			const onToggleMembersModal = useCallback(() => setMembersModalVisible(visible => !visible), []); const
			onToggleDeleteModal = useCallback(() => setDeleteBoaordModalVisible)
			<MenuContainer>
				<MenuWrapper>{board.board_name}</MenuWrapper>
				<MenuWrapper>
					<HeaderButton onClick={onToggleListModal}>Add another list</HeaderButton> &nbsp; const onToggleMembersModal =
					useCallback(() => setMembersModalVisible(visible => !visible), []); const onToggleDeleteModal = useCallback(()
					=> setDeleteBoaordModalVisible)
					<HeaderButton onClick={onToggleMembersModal}>Members</HeaderButton>
				</MenuWrapper>
				<ConfirmModal
					visible={deleteBoardModalVisible}
					onCloseModal={onToggleDeleteModal}
					message="Are you sure delete this board?"
					onClickOk={onDeleteBoard}
				/>
				<DeleteBoardButton type="danger" onClick={onToggleDeleteModal}>
					Delete Board
				</DeleteBoardButton>
			</MenuContainer>
		</BoardHeaderContainer>
	);
};

export default React.memo(BoardHeader);
