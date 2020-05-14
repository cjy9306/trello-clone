import React, { useCallback } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '../../../../components/Button';
import { deleteCheckList, getCheckList, createCheckListItem } from '../../../../modules/board';
import CheckListSubItem from './CheckListSubItem';

const CheckListItemContainer = styled.div`
	margin-bottom: 16px;
`;

const CheckListHeader = styled.div`
	line-height: 32px;
	margin-bottom: 12px;
	min-height: 32px;
	position: relative;
`;

const DeleteButtonWrapper = styled.div`
	right: 0;
	top: 0;
	position: absolute;
`;

const CheckListContainer = styled.div`
	margin-bottom: 8px;
`;

const CheckListControl = styled.div``;

const CheckListIcon = styled(FontAwesomeIcon)`
	font-size: 20px;
	left: -40px;
	position: absolute;
	padding: 6px 0 0 10px;
`;

/*
 *	CheckList의 각 item 컴포넌트
 *
 */
const CheckListItem = ({ checklist }) => {
	const dispatch = useDispatch();
	const board = useSelector((state) => state.board.board);
	const card = useSelector((state) => state.board.card);

	const handleDeleteClick = useCallback(async () => {
		const result = await dispatch(
			deleteCheckList({ boardId: board.board_id, cardId: card.card_id, checklistId: checklist.checklist_id })
		);

		if (result.success === true) dispatch(getCheckList({ boardId: board.board_id, cardId: card.card_id }));
	}, [board, card, dispatch, checklist]);

	const handleCheckListItemCreate = useCallback(async () => {
		const data = { itemName: 'new item', checked: false };
		const result = await dispatch(
			createCheckListItem({ boardId: board.board_id, checklistId: checklist.checklist_id, data })
		);

		if (result.success === true) dispatch(getCheckList({ boardId: board.board_id, cardId: card.card_id }));
	}, [board, checklist, card, dispatch]);

	return (
		<CheckListItemContainer>
			<CheckListHeader>
				<CheckListIcon icon={faCheck} size="xs" />
				{checklist.checklist_name}
				<DeleteButtonWrapper>
					<Button onClick={handleDeleteClick}>Delete</Button>
				</DeleteButtonWrapper>
			</CheckListHeader>
			<CheckListContainer>
				{checklist.checklist_items &&
					checklist.checklist_items.map((item) => <CheckListSubItem item={item} key={item.item_id} />)}
			</CheckListContainer>
			<CheckListControl>
				<Button onClick={handleCheckListItemCreate}>Add an item</Button>
			</CheckListControl>
		</CheckListItemContainer>
	);
};

CheckListItem.propTypes = {
	checklist: PropTypes.object.isRequired,
};

export default React.memo(CheckListItem);
