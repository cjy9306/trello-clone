import React, { useState, useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import useInput from '../../../hooks/useInput';
import { changeListActionVisible } from '../../../modules/board';

const ListTitleContainer = styled.div`
	display: flex;
	justify-content: space-between;
`;

const LabelWrapper = styled.div`
	display: ${(props) => (props.isEditting ? 'none' : 'block')};
	font-size: 16px;
	padding: 8px 16px 8px 16px;
	width: 90%;
`;

const EditWrapper = styled.div`
	display: ${(props) => (props.isEditting ? 'block' : 'none')};
	padding: 8px 8px 8px 8px;
	width: 90%;
`;

const InputField = styled.input`
	border: none;
	background: white;
	box-shadow: none;
	font-size: 16px;
	min-height: 26px;
	overflow: hidden;
	overflow-wrap: break-word;
	padding-left: 8px;
	resize: none;
	width: calc(100% - 8px);
`;

const CustomIcon = styled(FontAwesomeIcon)`
	borderradius: 3px;
	cursor: pointer;
	font-size: 16px;
	padding: 8px;
	&:hover {
		background-color: rgba(9, 30, 66, 0.07);
	}
`;

/*
 *	List의 Title 컴포넌트
 *
 */
const ListTitle = ({ list, onUpdate }) => {
	const inputRef = useRef(null);
	const dispatch = useDispatch();
	const [inputTitle, onChangeInputTitle] = useInput(list.list_name);
	const [isEditting, setIsEditting] = useState(false);
	const listIdInAction = useSelector((state) => state.board.listAction.listId);
	const listActionVisible = useSelector((state) => state.board.listAction.listActionVisible);

	const toggleTitleEditting = useCallback(() => setIsEditting((isEditting) => !isEditting), []);

	const handleListActionClick = useCallback(
		(e) => {
			if (list.list_id === listIdInAction && listActionVisible) {
				dispatch(changeListActionVisible(false, 0, 0, list.list_id));
				return;
			}

			const rect = e.target.getBoundingClientRect();
			const rightX = 200 + rect.x;
			const clientWidth = document.documentElement.clientWidth;
			const leftX = rightX > clientWidth ? clientWidth - 204 : rect.x;
			dispatch(changeListActionVisible(true, leftX, rect.y, list.list_id));
		},
		[dispatch, list, listIdInAction, listActionVisible]
	);

	useEffect(() => {
		if (isEditting) {
			inputRef.current.focus();
		} else {
			if (inputTitle === list.title) return;

			onUpdate(inputTitle);
		}
	}, [isEditting, inputTitle, list, onUpdate]);

	return (
		<ListTitleContainer>
			<LabelWrapper isEditting={isEditting} onClick={toggleTitleEditting}>
				{inputTitle}
			</LabelWrapper>
			<EditWrapper isEditting={isEditting}>
				<InputField ref={inputRef} onBlur={toggleTitleEditting} value={inputTitle} onChange={onChangeInputTitle} />
			</EditWrapper>
			<CustomIcon icon={faEllipsisH} size="xs" onClick={handleListActionClick} />
		</ListTitleContainer>
	);
};

ListTitle.propTypes = {
	list: PropTypes.object.isRequired,
	onUpdate: PropTypes.func.isRequired,
};

export default React.memo(ListTitle);
