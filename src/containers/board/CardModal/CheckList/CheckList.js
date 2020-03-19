import React from 'react';
import styled from 'styled-components/macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import CheckListItem from './CheckListItem';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCheckList, getCheckList, createCheckListItem } from '../../../../modules/board';
import Button from '../../../../components/Button';

const Container = styled.div`
	margin-bottom: 16px;
`;

const CheckListHeader = styled.div`
	margin-bottom: 12px;
	position: relative;
	line-height: 32px;
	min-height: 32px;
`;

const DeleteButtonWrapper = styled.div`
	right: 0;
	top: 0;
	position: absolute;
`;

const CheckListContent = styled.div`
	margin-bottom: 8px;
`;

const CheckListControl = styled.div``;

const CustomIcon = styled(FontAwesomeIcon)`
	left: -40px;
	position: absolute;
	padding: 6px 0 0 10px;
	font-size: 20px;
`;

const CheckList = ({ checklist }) => {
	const dispatch = useDispatch();
	const board = useSelector(state => state.board.board);
	const card = useSelector(state => state.board.card);

	const onDeleteClick = async () => {
		const result = await dispatch(
			deleteCheckList({ boardId: board.board_id, card_id: card.card_id, checklist_id: checklist.checklist_id })
		);

		if (result.success) await dispatch(getCheckList({ boardId: board.board_id, card_id: card.card_id }));
	};

	const onCreateCheckListItem = async () => {
		const data = { item_name: 'new item' };
		const result = await dispatch(
			createCheckListItem({ boardId: board.board_id, checklist_id: checklist.checklist_id, data })
		);

		if (result.success) await dispatch(getCheckList({ boardId: board.board_id, card_id: card.card_id }));
	};

	return (
		<Container>
			<CheckListHeader>
				<CustomIcon icon={faCheck} size="xs" />
				{checklist.checklist_name}
				<DeleteButtonWrapper>
					<Button onClick={onDeleteClick}>Delete</Button>
				</DeleteButtonWrapper>
			</CheckListHeader>
			<CheckListContent>
				{checklist.checklist_items &&
					checklist.checklist_items.map(item => <CheckListItem item={item} key={item.item_id} />)}
			</CheckListContent>
			<CheckListControl>
				<Button onClick={onCreateCheckListItem}>Add an item</Button>
			</CheckListControl>
		</Container>
	);
};

export default CheckList;
