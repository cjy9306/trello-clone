import React, { useState, useCallback, useRef, useEffect } from 'react';
import styled from 'styled-components/macro';
import CheckBox from '../../../components/CheckBox';
import useInput from '../../../hooks/useInput';
import { useDispatch, useSelector } from 'react-redux';
import { updateCheckListItem, getCheckList, deleteCheckListItem } from '../../../modules/board';
import Button from '../../../components/Button';
import { setMessageStates } from '../../../modules/common';

const DeleteWrapper = styled.div`
	display: none;
	line-height: 26px;
	position: absolute;
	right: 0;
	top: 0;
	margin: 4px 8px 0 0;
	text-decoration: underline;
	z-index: 11;
`;

const Container = styled.div`
	justify-content: center;
	margin: 8px 0 0px 0;
	padding: 8px 0 8px 0;
	font-size: 16px;
	cursor: pointer;
	border-radius: 3px;
	vertical-align: middle;
	position: relative;
	&:hover {
		background-color: rgba(228, 231, 235, 0.4);
		& ${DeleteWrapper} {
			display: ${props => (props.isEditting ? 'none' : 'block')};
		}
	}
	a:visited {
		color: inherit;
	}
`;

const LabelContainer = styled.div`
	display: ${props => (props.isEditting ? 'none' : 'block')};
	cursor: pointer;
	padding-right: 64px;
`;

const EditContainer = styled.div`
	display: ${props => (props.isEditting ? 'block' : 'none')};
	padding-right: 32px;
`;

const EditContent = styled.div``;

const EditControl = styled.div``;

const TextAreaField = styled.textarea`
	font-size: 16px;
	width: 100%;
	overflow: hidden;
	overflow-wrap: break-word;
	resize: none;
	height: 80px;
	min-height: 80px;
	padding: 8px 12px;
	box-sizing: border-box;
	border-radius: 3px;
	outline: 0;
	background: rgba(9, 30, 66, 0.04);
	border-color: rgba(9, 30, 66, 0.13);
	box-shadow: inset 0 0 0 1px rgba(9, 30, 66, 0.13);
`;

const CheckListItem = ({ item }) => {
	const dispatch = useDispatch();
	const board = useSelector(state => state.board.board);
	const card = useSelector(state => state.board.card);
	const [itemName, onChangeItemName, setItemName] = useInput(item.item_name);
	const [isEditting, setIsEditting] = useState(false);
	const onLabelClick = useCallback(() => {
		setIsEditting(true);
		setItemName(item.item_name);
	}, [item, setItemName]);

	const onCancelClick = useCallback(() => {
		setIsEditting(false);
	}, []);

	const editRef = useRef();

	const onSaveClick = async () => {
		const data = {
			item_name: itemName,
			checked: item.checked
		};

		const result = await dispatch(updateCheckListItem({ boardId: board.board_id, item_id: item.item_id, data }));
		if (result.success) {
			dispatch(getCheckList({ boardId: board.board_id, card_id: card.card_id }));
			onCancelClick();
		} else {
			dispatch(setMessageStates(true, 'error', result.data.data));
		}
	};

	const onDeleteClick = async () => {
		const result = await dispatch(deleteCheckListItem({ boardId: board.board_id, item_id: item.item_id }));

		if (result.success) await dispatch(getCheckList({ boardId: board.board_id, card_id: card.card_id }));
		else dispatch(setMessageStates(true, 'error', result.data.data));
	};

	const onClickCheckBox = async checked => {
		const data = {
			item_name: item.item_name,
			checked
		};

		const result = await dispatch(updateCheckListItem({ boardId: board.board_id, item_id: item.item_id, data }));
		if (result.success) dispatch(getCheckList({ boardId: board.board_id, card_id: card.card_id }));
		else dispatch(setMessageStates(true, 'error', result.data.data));
	};

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

export default React.memo(CheckListItem);
