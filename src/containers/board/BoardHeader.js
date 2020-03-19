import React, { useState } from 'react';
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
	const [deleteBoardModalVisible, setDeleteBoaordModalVisible] = useState(false);

	// list modal
	const onCloseListModal = () => setListModalVisible(false);
	const onShowListModal = () => setListModalVisible(true);

	// members modal
	const onCloseMembersModal = () => setMembersModalVisible(false);
	const onShowMembersModal = () => setMembersModalVisible(true);

	const onShowDeleteModal = () => setDeleteBoaordModalVisible(true);
	const onCloseDeleteModal = () => setDeleteBoaordModalVisible(false);

	const onDeleteBoard = async () => {
		const result = await dispatch(deleteBoard({ boardId: board.board_id }));

		if (result.success) {
			const memberId = sessionStorage.getItem('memberId');
			history.push('/member/' + memberId + '/boards');
		} else {
			dispatch(setMessageStates(true, 'error', result.data.data));
		}
	};

	return (
		<BoardHeaderContainer>
			<BoardMembersModal visible={membersModalVisible} onCloseModal={onCloseMembersModal} />
			<AddListModal visible={listModalVisible} onCloseModal={onCloseListModal} />
			<MenuContainer>
				<MenuWrapper>{board.board_name}</MenuWrapper>
				<MenuWrapper>
					<HeaderButton onClick={onShowListModal}>Add another list</HeaderButton> &nbsp;
					<HeaderButton onClick={onShowMembersModal}>Members</HeaderButton>
				</MenuWrapper>
				<ConfirmModal
					visible={deleteBoardModalVisible}
					onCloseModal={onCloseDeleteModal}
					message="Are you sure delete this board?"
					onClickOk={onDeleteBoard}
				/>
				<DeleteBoardButton type="danger" onClick={onShowDeleteModal}>
					Delete Board
				</DeleteBoardButton>
			</MenuContainer>
		</BoardHeaderContainer>
	);
};

export default React.memo(BoardHeader);
