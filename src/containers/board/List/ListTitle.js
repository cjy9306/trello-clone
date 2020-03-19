import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components/macro';
import useInput from '../../../hooks/useInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { changeListActionVisible } from '../../../modules/board';

const Container = styled.div`
	background: none;
`;

const LabelContainer = styled.div`
	display: flex;
	justify-content: space-between;
`;

const LabelWrapper = styled.div`
	padding: 8px 16px 8px 16px;
	display: ${props => (props.isEditting ? 'none' : 'block')};
	font-size: 16px;
	width: 90%;
`;

const EditWrapper = styled.div`
	padding: 8px 8px 8px 8px;
	display: ${props => (props.isEditting ? 'block' : 'none')};
	width: 90%;
`;

const InputField = styled.input`
	border: none;
	font-size: 16px;
	background: white;
	box-shadow: none;
	overflow: hidden;
	min-height: 26px;
	overflow-wrap: break-word;
	width: calc(100% - 8px);
	resize: none;
	padding-left: 8px;
`;

const CustomIcon = styled(FontAwesomeIcon)`
	padding: 8px;
	borderradius: 3px;
	font-size: 16px;
	cursor: pointer;
	&:hover {
		background-color: rgba(9, 30, 66, 0.07);
	}
`;

const ListTitle = ({ list, onUpdate }) => {
	const inputRef = useRef(null);
	const dispatch = useDispatch();
	const [inputTitle, onChangeInputTitle] = useInput(list.list_name);
	const [isEditting, setIsEditting] = useState(false);
	const listIdInAction = useSelector(state => state.board.listAction.listId);
	const listActionVisible = useSelector(state => state.board.listAction.listActionVisible);

	const onToggle = () => setIsEditting(!isEditting);
	const onShowListAction = e => {
		if (list.list_id === listIdInAction && listActionVisible) {
			dispatch(changeListActionVisible(false, 0, 0, list.list_id));
			return;
		}

		const rect = e.target.getBoundingClientRect();
		const rightX = 200 + rect.x;
		const clientWidth = document.documentElement.clientWidth;
		const leftX = rightX > clientWidth ? clientWidth - 204 : rect.x;
		dispatch(changeListActionVisible(true, leftX, rect.y, list.list_id));
	};

	useEffect(() => {
		if (isEditting) inputRef.current.focus();
		else {
			console.log(inputTitle + ', ' + list.title);
			if (inputTitle === list.title) return;

			onUpdate(inputTitle);
		}
	}, [isEditting, inputTitle, list, onUpdate]);

	return (
		<Container>
			<LabelContainer>
				<LabelWrapper isEditting={isEditting} onClick={onToggle}>
					{inputTitle}
				</LabelWrapper>
				<EditWrapper isEditting={isEditting}>
					<InputField ref={inputRef} onBlur={onToggle} value={inputTitle} onChange={onChangeInputTitle} />
				</EditWrapper>
				<div>
					<CustomIcon icon={faEllipsisH} size="xs" onClick={onShowListAction} />
				</div>
			</LabelContainer>
		</Container>
	);
};

export default React.memo(ListTitle);
