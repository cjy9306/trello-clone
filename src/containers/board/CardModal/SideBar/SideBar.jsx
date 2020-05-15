import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import LinkButton from '../../../../components/LinkButton';
import { ConfirmModal } from '../../../../components/Modal';
import { createCheckList, getCheckList, deleteCard, changeModalVisible, getBoard } from '../../../../modules/board';
import SidebarMembers from './SidebarMembers';
import SideBarCheckList from './SideBarCheckList';
import SideBarLabels from './SideBarLabels';

const SidebarContainer = styled.aside`
	margin-top: 26px;
	float: right;
	padding: 0 8px 8px 0;
	overflow: hidden;

	// desktop, tablet, phone
	@media only screen and (min-width: 668px) {
		width: 188px;
	}

	// phone
	@media only screen and (max-width: 668px) {
		width: 95%;
	}
`;
const SideBarAddOn = styled.div`
	margin-bottom: 32px;
	font-size: 16px;
`;
const SideBarHeader = styled.div`
	font-size: 16px;
	margin-bottom: 16px;
`;

const LinkButtonWrapper = styled(LinkButton)`
	@media only screen and (min-width: 669px) {
		margin: 0 16px 8px 0;
	}

	// phone
	@media only screen and (max-width: 668px) {
		margin: 0 0 8px 0;
	}
`;

/*
 *	CardModal의 Sidebar 컴포넌트
 *
 */
const SideBar = ({ card }) => {
	const dispatch = useDispatch();
	const board = useSelector((state) => state.board.board);
	const cardModalVisible = useSelector((state) => state.board.cardModalVisible);

	const [membersPopupVisible, setMembersPopupVisible] = useState(false);
	const [labelPopupVisible, setLabelPopupVisible] = useState(false);
	const [checkListPopupVisible, setCheckListPopupVisible] = useState(false);
	const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);

	const toggleMembersPopup = useCallback(() => setMembersPopupVisible((visible) => !visible), []);
	const toggleLabelPopup = useCallback(() => setLabelPopupVisible((visible) => !visible), []);
	const toggleCheckListPopup = useCallback(() => setCheckListPopupVisible((visible) => !visible), []);
	const toggleDeleteConfirm = useCallback(() => setDeleteConfirmVisible((visible) => !visible), []);

	const handleCheckListCreate = useCallback(
		async (itemName) => {
			const data = {
				checklistName: itemName,
				checked: false,
			};
			const result = await dispatch(createCheckList({ boardId: board.board_id, cardId: card.card_id, data }));

			if (result.success === true) {
				dispatch(getCheckList({ boardId: board.board_id, cardId: card.card_id }));
				toggleCheckListPopup();
			}
		},
		[dispatch, toggleCheckListPopup, board, card]
	);

	const handleCardDelete = useCallback(async () => {
		const result = await dispatch(deleteCard({ boardId: board.board_id, cardId: card.card_id }));

		if (result.success === true) {
			dispatch(getBoard({ boardId: board.board_id }));
			dispatch(changeModalVisible(false));
			toggleDeleteConfirm();
		}
	}, [dispatch, board, card, toggleDeleteConfirm]);

	useEffect(() => {
		setMembersPopupVisible(false);
		setLabelPopupVisible(false);
		setCheckListPopupVisible(false);
	}, [cardModalVisible]);

	return (
		<SidebarContainer>
			<ConfirmModal
				visible={deleteConfirmVisible}
				onCloseModal={toggleDeleteConfirm}
				message="Are you sure delete this card?"
				onClickOk={handleCardDelete}
			/>
			<SideBarAddOn>
				<SideBarHeader>ADD TO CARD</SideBarHeader>
				<LinkButtonWrapper size="large" onClick={toggleMembersPopup}>
					Members
				</LinkButtonWrapper>
				<SidebarMembers visible={membersPopupVisible} onPopupToggle={toggleMembersPopup} card={card} />
				<LinkButtonWrapper size="large" onClick={toggleLabelPopup}>
					Labels
				</LinkButtonWrapper>
				<SideBarLabels visible={labelPopupVisible} onPopupToggle={toggleLabelPopup} card={card} />
				<LinkButtonWrapper size="large" onClick={toggleCheckListPopup}>
					Check List
				</LinkButtonWrapper>
				<SideBarCheckList
					visible={checkListPopupVisible}
					onPopupToggle={toggleCheckListPopup}
					onCreateCheckList={handleCheckListCreate}
				/>
			</SideBarAddOn>
			<LinkButtonWrapper type="danger" size="large" onClick={toggleDeleteConfirm}>
				Delete
			</LinkButtonWrapper>
		</SidebarContainer>
	);
};

SideBar.propTypes = {
	card: PropTypes.object.isRequired,
};

export default React.memo(SideBar);
