import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import useInput from '../../hooks/useInput';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import { createList, getBoard } from '../../modules/board';
import { useDispatch, useSelector } from 'react-redux';
import { setMessageStates } from '../../modules/common';

const AddModal = styled(Modal)`
	width: 320px;
	height: 110px;
	border-radius: 3px;
`;

const AddListContainer = styled.div`
	border-radius: 3px;
	display: flex;
	justify-content: space-between;
	margin: 16px 0 0 16px;
`;

const AddListControl = styled.div`
	display: flex;
	margin: 0 0 0 16px;
`;

const AddListContent = styled.div`
	padding: 8px 16px 0 0;
	width: 260px;
`;

const TitleInput = styled.input`
	margin: 0 0 12px 0;
	height: 30px;
	width: 100%;
	background-color: #fafbfc;
	border: none;
	box-shadow: inset 0 0 0 2px #dfe1e6;
	box-sizing: border-box;
	border-radius: 3px;
	padding: 8px 12px;
	font-size: 14px;
`;

const AddListModal = ({ visible, onCloseModal }) => {
	const dispatch = useDispatch();
	const board = useSelector(state => state.board.board);
	const lists = useSelector(state => state.board.lists);
	const [title, onChangeTitle, setTitle] = useInput('');

	const onAddList = async () => {
		if (title === '') return;

		const seq = lists ? lists.length : 0;
		const data = {
			list_name: title,
			seq
		};

		const result = await dispatch(createList({ boardId: board.board_id, data }));

		if (result.success) {
			dispatch(getBoard({ boardId: board.board_id }));
			onCloseModal();
		} else {
			dispatch(setMessageStates(true, 'error', result.data.data));
		}
	};

	useEffect(() => {
		setTitle('');
	}, [setTitle]);

	return (
		<AddModal visible={visible} onCloseModal={onCloseModal}>
			<AddListContainer>
				<AddListContent>
					<TitleInput value={title} onChange={onChangeTitle} placeholder="Enter list title" />
				</AddListContent>
			</AddListContainer>
			<AddListControl>
				<Button type="primary" onClick={onAddList}>
					Add
				</Button>{' '}
				&nbsp;
				<Button type="default" onClick={onCloseModal}>
					Cancel
				</Button>
			</AddListControl>
		</AddModal>
	);
};

export default React.memo(AddListModal);
