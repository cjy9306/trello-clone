import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import SideBarCheckList from './SideBarCheckList';
import SideBarLabels from './SideBarLabels';
import { useDispatch, useSelector } from 'react-redux';
import { createCheckList, getCheckList, deleteCard, changeModalVisible, getBoard } from '../../../modules/board';
import { LinkButton } from '../../../components/Button';
import SidebarMembers from './SidebarMembers';
import { ConfirmModal } from '../../../components/Modal';

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
	display: ${props => (props.visible ? 'block' : 'none')};
	position: absolute;
	right: auto;
	margin: 0px 0 0 0px;
	min-width: 300px;
	min-height: 100px;
	box-shadow: 0 8px 16px -4px rgba(9, 30, 66, 0.25), 0 0 0 1px rgba(9, 30, 66, 0.08);
	z-index: 10;
`;

const SideBarActions = styled.div``;

const LinkButtonWrapper = styled(LinkButton)`
	margin: 0 16px 8px 0;
`;

const SideBar = ({ card }) => {
	const dispatch = useDispatch();
	const board = useSelector(state => state.board.board);
	const cardModalVisible = useSelector(state => state.board.cardModalVisible);

	const [membersPopupVisible, setMembersPopupVisible] = useState(false);
	const [labelPopupVisible, setLabelPopupVisible] = useState(false);
	const [checkListPopupVisible, setCheckListPopupVisible] = useState(false);
	const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);

	const onMembersPopupToggle = () => setMembersPopupVisible(!membersPopupVisible);
	const onLabelPopupToggle = () => setLabelPopupVisible(!labelPopupVisible);
	const onCheckListPopupToggle = () => setCheckListPopupVisible(!checkListPopupVisible);

	const onCreateCheckList = async itemName => {
		const data = {
			checklist_name: itemName
		};
		const result = await dispatch(createCheckList({ boardId: board.board_id, card_id: card.card_id, data }));

		if (result.success) {
			await dispatch(getCheckList({ boardId: board.board_id, card_id: card.card_id }));
			onCheckListPopupToggle();
		}
	};

	const onShowDeleteConfirm = () => setDeleteConfirmVisible(true);
	const onCloseDeleteConfirm = () => setDeleteConfirmVisible(false);

	const onDeleteCard = async () => {
		const result = await dispatch(deleteCard({ boardId: board.board_id, cardId: card.card_id }));

		if (result.success) {
			dispatch(getBoard({ boardId: board.board_id }));
			dispatch(changeModalVisible(false));
			onCloseDeleteConfirm();
		} else {
			console.log('delete card fail');
		}
	};

	useEffect(() => {
		setMembersPopupVisible(false);
		setLabelPopupVisible(false);
		setCheckListPopupVisible(false);
	}, [cardModalVisible]);

	return (
		<div>
			<ConfirmModal
				visible={deleteConfirmVisible}
				onCloseModal={onCloseDeleteConfirm}
				message="Are you sure delete this card?"
				onClickOk={onDeleteCard}
			/>
			<SideBarAddOn>
				<SideBarHeader>ADD TO CARD</SideBarHeader>
				<SideBarContent>
					<LinkButtonWrapper size="large" onClick={onMembersPopupToggle}>
						Members
					</LinkButtonWrapper>
					<PopupOver visible={membersPopupVisible}>
						<SidebarMembers onPopupToggle={onMembersPopupToggle} card={card} />
					</PopupOver>
					<LinkButtonWrapper size="large" onClick={onLabelPopupToggle}>
						Labels
					</LinkButtonWrapper>
					<PopupOver visible={labelPopupVisible}>
						<SideBarLabels onPopupToggle={onLabelPopupToggle} card={card} />
					</PopupOver>
					<LinkButtonWrapper size="large" onClick={onCheckListPopupToggle}>
						Check List
					</LinkButtonWrapper>
					<PopupOver visible={checkListPopupVisible}>
						<SideBarCheckList onPopupToggle={onCheckListPopupToggle} onCreateCheckList={onCreateCheckList} />
					</PopupOver>
				</SideBarContent>
			</SideBarAddOn>
			<SideBarActions>
				<SideBarContent>
					<LinkButtonWrapper type="danger" size="large" onClick={onShowDeleteConfirm}>
						Delete
					</LinkButtonWrapper>
				</SideBarContent>
			</SideBarActions>
		</div>
	);
};

export default React.memo(SideBar);
