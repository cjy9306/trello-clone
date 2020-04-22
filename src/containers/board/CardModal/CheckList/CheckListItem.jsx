import React, { useState, useCallback, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import useInput from '../../../../hooks/useInput';
import CheckBox from '../../../../components/CheckBox';
import Button from '../../../../components/Button';
import { updateCheckListItem, getCheckList, deleteCheckListItem } from '../../../../modules/board';

const DeleteWrapper = styled.div`
	display: none;
	line-height: 26px;
	margin: 4px 8px 0 0;
	position: absolute;
	right: 0;
	text-decoration: underline;
	top: 0;
	z-index: 11;
`;

const Container = styled.div`
	border-radius: 3px;
	cursor: pointer;
	font-size: 16px;
	justify-content: center;
	margin: 8px 0 0px 0;
	padding: 8px 0 8px 0;
	position: relative;
	vertical-align: middle;
	&:hover {
		background-color: rgba(228, 231, 235, 0.4);
		& ${DeleteWrapper} {
			display: ${(props) => (props.isEditting ? 'none' : 'block')};
		}
	}
	a:visited {
		color: inherit;
	}
`;

const LabelContainer = styled.div`
	cursor: pointer;
	display: ${(props) => (props.isEditting ? 'none' : 'block')};
	padding-right: 64px;
`;

const EditContainer = styled.div`
	display: ${(props) => (props.isEditting ? 'block' : 'none')};
	padding-right: 32px;
`;

const EditContent = styled.div``;

const EditControl = styled.div``;

const TextAreaField = styled.textarea`
	box-sizing: border-box;
	border-radius: 3px;
	background: rgba(9, 30, 66, 0.04);
	border-color: rgba(9, 30, 66, 0.13);
	box-shadow: inset 0 0 0 1px rgba(9, 30, 66, 0.13);
	font-size: 16px;
	height: 80px;
	min-height: 80px;
	overflow: hidden;
	overflow-wrap: break-word;
	outline: 0;
	padding: 8px 12px;
	resize: none;
	width: 100%;
`;

const CheckListItem = ({ item }) => {
	const dispatch = useDispatch();
	const board = useSelector((state) => state.board.board);
	const card = useSelector((state) => state.board.card);
	const [itemName, onChangeItemName, setItemName] = useInput(item.item_name);
	const [isEditting, setIsEditting] = useState(false);
	const editRef = useRef();

	const onLabelClick = useCallback(() => {
		setIsEditting(true);
		setItemName(item.item_name);
	}, [item, setItemName]);

	const onCancelClick = useCallback(() => setIsEditting(false), []);

	const onSaveClick = async () => {
		const data = {
			itemName,
			checked: item.checked,
		};

		const result = await dispatch(updateCheckListItem({ boardId: board.board_id, itemId: item.item_id, data }));
		if (result.success) {
			dispatch(getCheckList({ boardId: board.board_id, cardId: card.card_id }));
			onCancelClick();
		}
	};

	const onDeleteClick = useCallback(async () => {
		const result = await dispatch(deleteCheckListItem({ boardId: board.board_id, itemId: item.item_id }));

		if (result.success) await dispatch(getCheckList({ boardId: board.board_id, cardId: card.card_id }));
	}, [dispatch, board, card, item]);

	const onClickCheckBox = useCallback(
		async (checked) => {
			const data = {
				itemName: item.item_name,
				checked,
			};

			const result = await dispatch(updateCheckListItem({ boardId: board.board_id, itemId: item.item_id, data }));
			if (result.success) dispatch(getCheckList({ boardId: board.board_id, cardId: card.card_id }));
		},
		[dispatch, item, board, card]
	);

	useEffect(() => {
		if (isEditting) editRef.current.focus();
	}, [isEditting]);

	return (
		<Container isEditting={isEditting}>
			<CheckBox
				defaultChecked={item.checked}
				onClick={onClickCheckBox}
				style={{ marginLeft: '-25px', position: 'absolute' }}
			/>
			<LabelContainer isEditting={isEditting} onClick={onLabelClick}>
				{item.item_name}
			</LabelContainer>
			<DeleteWrapper onClick={onDeleteClick}>Delete</DeleteWrapper>
			<EditContainer isEditting={isEditting}>
				<EditContent>
					<TextAreaField ref={editRef} value={itemName} onChange={onChangeItemName} />
				</EditContent>
				<EditControl>
					<Button type="primary" onClick={onSaveClick}>
						Save
					</Button>{' '}
					&nbsp;
					<Button type="default" onClick={onCancelClick}>
						Cancel
					</Button>
				</EditControl>
			</EditContainer>
		</Container>
	);
};

CheckListItem.propTypes = {
	item: PropTypes.object.isRequired,
};

export default React.memo(CheckListItem);
