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
`;
const SideBarHeader = styled.div`
	font-size: 16px;
	margin-bottom: 16px;
`;

const SideBarContent = styled.div`
	font-size: 16px;
`;

const PopupOver = styled.div`
	box-shadow: 0 8px 16px -4px rgba(9, 30, 66, 0.25), 0 0 0 1px rgba(9, 30, 66, 0.08);
	display: ${(props) => (props.visible ? 'block' : 'none')};
	margin: 0px 0 0 0px;
	min-width: 300px;
	min-height: 100px;
	position: absolute;
	right: auto;
	z-index: 10;
`;

const SideBarActions = styled.div``;

const LinkButtonWrapper = styled(LinkButton)`
	@media only screen and (min-width: 669px) {
		margin: 0 16px 8px 0;
	}

	// phone
	@media only screen and (max-width: 668px) {
		margin: 0 0px 8px 0;
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

	const onToggleMembersPopup = useCallback(() => setMembersPopupVisible((visible) => !visible), []);
	const onToggleLabelPopup = useCallback(() => setLabelPopupVisible((visible) => !visible), []);
	const onToggleCheckListPopup = useCallback(() => setCheckListPopupVisible((visible) => !visible), []);

	const onCreateCheckList = useCallback(
		async (itemName) => {
			const data = {
				checklistName: itemName,
				checked: false,
			};
			const result = await dispatch(createCheckList({ boardId: board.board_id, cardId: card.card_id, data }));

			if (result.success) {
				await dispatch(getCheckList({ boardId: board.board_id, cardId: card.card_id }));
				onToggleCheckListPopup();
			}
		},
		[dispatch, onToggleCheckListPopup, board, card]
	);

	const onToggleDeleteConfirm = useCallback(() => setDeleteConfirmVisible((visible) => !visible), []);

	const onDeleteCard = useCallback(async () => {
		const result = await dispatch(deleteCard({ boardId: board.board_id, cardId: card.card_id }));

		if (result.success) {
			dispatch(getBoard({ boardId: board.board_id }));
			dispatch(changeModalVisible(false));
			onToggleDeleteConfirm();
		}
	}, [dispatch, board, card, onToggleDeleteConfirm]);

	useEffect(() => {
		setMembersPopupVisible(false);
		setLabelPopupVisible(false);
		setCheckListPopupVisible(false);
	}, [cardModalVisible]);

	return (
		<SidebarContainer>
			<ConfirmModal
				visible={deleteConfirmVisible}
				onCloseModal={onToggleDeleteConfirm}
				message="Are you sure delete this card?"
				onClickOk={onDeleteCard}
			/>
			<SideBarAddOn>
				<SideBarHeader>ADD TO CARD</SideBarHeader>
				<SideBarContent>
					<LinkButtonWrapper size="large" onClick={onToggleMembersPopup}>
						Members
					</LinkButtonWrapper>
					<PopupOver visible={membersPopupVisible}>
						<SidebarMembers onPopupToggle={onToggleMembersPopup} card={card} />
					</PopupOver>
					<LinkButtonWrapper size="large" onClick={onToggleLabelPopup}>
						Labels
					</LinkButtonWrapper>
					<PopupOver visible={labelPopupVisible}>
						<SideBarLabels onPopupToggle={onToggleLabelPopup} card={card} />
					</PopupOver>
					<LinkButtonWrapper size="large" onClick={onToggleCheckListPopup}>
						Check List
					</LinkButtonWrapper>
					<PopupOver visible={checkListPopupVisible}>
						<SideBarCheckList onPopupToggle={onToggleCheckListPopup} onCreateCheckList={onCreateCheckList} />
					</PopupOver>
				</SideBarContent>
			</SideBarAddOn>
			<SideBarActions>
				<SideBarContent>
					<LinkButtonWrapper type="danger" size="large" onClick={onToggleDeleteConfirm}>
						Delete
					</LinkButtonWrapper>
				</SideBarContent>
			</SideBarActions>
		</SidebarContainer>
	);
};

SideBar.propTypes = {
	card: PropTypes.object.isRequired,
};

export default React.memo(SideBar);
