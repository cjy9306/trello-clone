import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import useInput from '../../../hooks/useInput';
import Button from '../../../components/Button';
import Modal from '../../../components/Modal';
import { createList, getBoard } from '../../../modules/board';

const AddModal = styled(Modal)`
	border-radius: 3px;
	height: 110px;
	width: 320px;
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
	background-color: #fafbfc;
	border: none;
	box-shadow: inset 0 0 0 2px #dfe1e6;
	box-sizing: border-box;
	border-radius: 3px;
	font-size: 14px;
	height: 30px;
	margin: 0 0 12px 0;
	padding: 8px 12px;
	width: 100%;
`;

/*
 *	Board에 List를 추가하는 Modal 컴포넌트
 *
 */
const AddListModal = ({ visible, onCloseModal }) => {
	const dispatch = useDispatch();
	const board = useSelector((state) => state.board.board);
	const lists = useSelector((state) => state.board.lists);
	const [title, onChangeTitle, setTitle] = useInput('');

	const onAddList = async () => {
		if (title === '') return;

		const seq = lists ? lists.length : 0;
		const data = {
			listName: title,
			seq,
		};

		const result = await dispatch(createList({ boardId: board.board_id, data }));

		if (result.success) {
			dispatch(getBoard({ boardId: board.board_id }));
			onCloseModal();
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

AddListModal.propTypes = {
	visible: PropTypes.bool.isRequired,
	onCloseModal: PropTypes.func.isRequired,
};

export default React.memo(AddListModal);
