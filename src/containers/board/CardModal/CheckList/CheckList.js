import React, { useCallback } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '../../../../components/Button';
import { deleteCheckList, getCheckList, createCheckListItem } from '../../../../modules/board';
import CheckListItem from './CheckListItem';

const Container = styled.div`
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

const CustomIcon = styled(FontAwesomeIcon)`
	font-size: 20px;
	left: -40px;
	position: absolute;
	padding: 6px 0 0 10px;
`;

const CheckList = ({ checklist }) => {
	const dispatch = useDispatch();
	const board = useSelector(state => state.board.board);
	const card = useSelector(state => state.board.card);

	const onDeleteClick = useCallback(async () => {
		const result = await dispatch(
			deleteCheckList({ boardId: board.board_id, card_id: card.card_id, checklist_id: checklist.checklist_id })
		);

		if (result.success) dispatch(getCheckList({ boardId: board.board_id, card_id: card.card_id }));
	}, [board, card, dispatch, checklist]);

	const onCreateCheckListItem = useCallback(async () => {
		const data = { item_name: 'new item' };
		const result = await dispatch(
			createCheckListItem({ boardId: board.board_id, checklist_id: checklist.checklist_id, data })
		);

		if (result.success) dispatch(getCheckList({ boardId: board.board_id, card_id: card.card_id }));
	}, [board, checklist, card, dispatch]);

	return (
		<Container>
			<CheckListHeader>
				<CustomIcon icon={faCheck} size="xs" />
				{checklist.checklist_name}
				<DeleteButtonWrapper>
					<Button onClick={onDeleteClick}>Delete</Button>
				</DeleteButtonWrapper>
			</CheckListHeader>
			<CheckListContainer>
				{checklist.checklist_items &&
					checklist.checklist_items.map(item => <CheckListItem item={item} key={item.item_id} />)}
			</CheckListContainer>
			<CheckListControl>
				<Button onClick={onCreateCheckListItem}>Add an item</Button>
			</CheckListControl>
		</Container>
	);
};

CheckList.propTypes = {
	checklist: PropTypes.object.isRequired
};

export default React.memo(CheckList);
