import React, { useCallback } from 'react';
import styled from 'styled-components/macro';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { LinkButton } from '../../../components/Button';
import { deleteList, changeListActionVisible, getBoard } from '../../../modules/board';
import { setMessageStates } from '../../../modules/common';

const PopupOver = styled.div`
	box-shadow: 0 8px 16px -4px rgba(9, 30, 66, 0.25), 0 0 0 1px rgba(9, 30, 66, 0.08);
	display: ${props => (props.visible ? 'block' : 'none')};
	left: ${props => props.posX}px;
	margin: 0px 0 0 0px;
	min-height: 50px;
	position: absolute;
	right: 8px;
	top: calc(${props => props.posY}px + 32px);
	width: 200px;
	z-index: 10;
`;

const ListActionConatiner = styled.div`
	background-color: #fff;
`;

const ActionHeader = styled.div`
	height: 32px;
	line-height: 32px;
	padding: 8px 16px 0 16px;
	text-align: center;
`;

const ActionContent = styled.div`
	padding: 20px 16px 16px 16px;
`;

const CloseSpan = styled.span`
	color: #aaaaaa;
	font-size: 20px;
	font-weight: bold;
	margin-right: 8px;
	position: absolute;
	right: 0;
	&:hover,
	&:focus {
		color: #000;
		text-decoration: none;
		cursor: pointer;
	}
`;

const ListAction = ({ posX, posY, visible, onPopupToggle }) => {
	const dispatch = useDispatch();
	const board = useSelector(state => state.board.board);
	const listId = useSelector(state => state.board.listAction.listId);

	const onDeleteList = useCallback(async () => {
		const result = await dispatch(deleteList({ boardId: board.board_id, listId }));

		if (result.success) {
			await dispatch(getBoard({ boardId: board.board_id }));
			dispatch(changeListActionVisible(false, 0, 0, 0));
		} else {
			dispatch(setMessageStates(true, 'error', result.data.data));
		}
	}, [dispatch, board, listId]);

	return (
		<PopupOver visible={visible} posX={posX} posY={posY}>
			<ListActionConatiner>
				<ActionHeader>
					List Actions
					<CloseSpan onClick={onPopupToggle}>&times;</CloseSpan>
					<hr />
				</ActionHeader>
				<ActionContent>
					<LinkButton type="danger" onClick={onDeleteList}>
						Delete List
					</LinkButton>
				</ActionContent>
			</ListActionConatiner>
		</PopupOver>
	);
};

ListAction.propTypes = {
	posX: PropTypes.number.isRequired,
	posY: PropTypes.number.isRequired,
	visible: PropTypes.bool.isRequired,
	onPopupToggle: PropTypes.func.isRequired
};

export default React.memo(ListAction);
