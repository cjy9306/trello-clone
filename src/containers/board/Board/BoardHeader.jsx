import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '../../../components/Button';
import HeaderButton from '../../../components/HeaderButton';
import { ConfirmModal } from '../../../components/Modal';
import { deleteBoard } from '../../../modules/board';
import BoardMembersModal from '../Modal/BoardMembersModal';
import AddListModal from '../Modal/AddListModal';

const BoardHeaderContainer = styled.header`
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

/*
 *	BoardContainer의 board header
 *
 */
const BoardHeader = ({ board }) => {
	const history = useHistory();
	const dispatch = useDispatch();
	const [listModalVisible, setListModalVisible] = useState(false);
	const [membersModalVisible, setMembersModalVisible] = useState(false);
	const [deleteBoardModalVisible, setDeleteBoardModalVisible] = useState(false);

	const toggleListModal = useCallback(() => setListModalVisible((visible) => !visible), []);
	const toggleMembersModal = useCallback(() => setMembersModalVisible((visible) => !visible), []);
	const toggleDeleteModal = useCallback(() => setDeleteBoardModalVisible((visible) => !visible), []);

	const handleBoardDelete = useCallback(async () => {
		const result = await dispatch(deleteBoard({ boardId: board.board_id }));

		if (result.success) {
			const memberId = sessionStorage.getItem('memberId');
			history.push('/member/' + memberId + '/boards');
		}
	}, [dispatch, board, history]);

	return (
		<BoardHeaderContainer>
			<BoardMembersModal visible={membersModalVisible} onCloseModal={toggleMembersModal} />
			<AddListModal visible={listModalVisible} onCloseModal={toggleListModal} />
			<MenuContainer>
				<MenuWrapper>{board.board_name}</MenuWrapper>
				<MenuWrapper>
					<HeaderButton onClick={toggleListModal}>Add list</HeaderButton> &nbsp;
					<HeaderButton onClick={toggleMembersModal}>Members</HeaderButton>
				</MenuWrapper>
				<ConfirmModal
					visible={deleteBoardModalVisible}
					onCloseModal={toggleDeleteModal}
					message="Are you sure delete this board?"
					onClickOk={handleBoardDelete}
				/>
				<DeleteBoardButton type="danger" onClick={toggleDeleteModal}>
					Delete Board
				</DeleteBoardButton>
			</MenuContainer>
		</BoardHeaderContainer>
	);
};

BoardHeader.propTypes = {
	board: PropTypes.object.isRequired,
};

export default React.memo(BoardHeader);
