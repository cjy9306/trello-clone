import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { useDispatch, useSelector } from 'react-redux';
import useCheckWhetherIsLogined from '../../hooks/useCheckWhetherIsLogined';
import GlobalHeader from '../../components/GlobalHeader';
import {
	getBoard,
	changeLists,
	updateListSeq,
	updateCardSeq,
	changeModalVisible,
	changeListActionVisible
} from '../../modules/board';
import { setMessageStates } from '../../modules/common';
import BoardContent from './BoardContent';
import BoardHeader from './BoardHeader';
import CardModal from './CardModal/CardModal';
import ListAction from './List/ListAction';
import Message from '../../components/Message';

const Root = styled.div`
	background-color: #${props => props.backgroundColor};
	height: 100%;
	overflow: hidden;
`;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	background-color: #${props => props.backgroundColor};
`;

const parseDndItemId = itemId => {
	if (typeof itemId !== 'string') return null;

	const arr = itemId.split('-');
	return Number(arr[arr.length - 1]);
};

const getListItem = (lists, listId) => {
	for (let index in lists) {
		if (lists[index].list_id === listId) return [lists[index], index];
	}

	return null;
};

const BoardContainer = ({ match: { params } }) => {
	const { boardId } = params;
	const isLogined = useCheckWhetherIsLogined();

	const dispatch = useDispatch();
	const board = useSelector(state => state.board.board);
	const lists = useSelector(state => state.board.lists);
	const cardModalVisible = useSelector(state => state.board.cardModalVisible);
	const listActionVisible = useSelector(state => state.board.listAction.listActionVisible);
	const listActionPosX = useSelector(state => state.board.listAction.posX);
	const listActionPosY = useSelector(state => state.board.listAction.posY);
	const message = useSelector(state => state.common.message);

	useEffect(() => {
		dispatch(getBoard({ boardId }));
	}, [boardId, dispatch]);

	// drag & drop related functions
	const onDragEnd = async result => {
		const { destination, source, type } = result;

		if (!destination) {
			return;
		}

		if (destination.droppableId === source.droppableId && destination.index === source.index) {
			return;
		}

		// List 끼리 옮겼을때
		if (type === 'list') {
			const prevLists = [...lists];
			const newLists = [...lists];
			const deletedList = newLists.splice(source.index, 1);
			newLists.splice(destination.index, 0, deletedList[0]);

			onUpdateListSeq(deletedList[0].list_id, source.index, destination.index, newLists, prevLists);
			return;
		}

		const sourceListId = parseDndItemId(source.droppableId);
		const destListId = parseDndItemId(destination.droppableId);

		const [sourceList, sourceListIndex] = getListItem(lists, sourceListId);
		const [destList, destListIndex] = getListItem(lists, destListId);

		if (sourceList.list_id === destList.list_id) {
			const newCards = [...sourceList.cards];

			const deletedCard = newCards.splice(source.index, 1);
			newCards.splice(destination.index, 0, deletedCard[0]);

			// update sequence
			for (let index in newCards) {
				newCards[index].seq = index;
			}

			const newList = {
				...sourceList,
				cards: newCards
			};

			const prevLists = [...lists];
			const newLists = [...lists];
			newLists[sourceListIndex] = newList;

			onUpdateCardSeq(
				sourceListId,
				destListId,
				source.index,
				destination.index,
				deletedCard[0].card_id,
				newLists,
				prevLists
			);
		} else {
			const newSourceCards = [...sourceList.cards];
			const newDestCards = [...destList.cards];

			const deletedCard = newSourceCards.splice(source.index, 1);
			const newSourceList = {
				...sourceList,
				cards: newSourceCards
			};

			newDestCards.splice(destination.index, 0, deletedCard[0]);
			const newDestList = {
				...destList,
				cards: newDestCards
			};
			const prevLists = [...lists];
			const newLists = [...lists];
			newLists[sourceListIndex] = newSourceList;
			newLists[destListIndex] = newDestList;

			onUpdateCardSeq(
				sourceListId,
				destListId,
				source.index,
				destination.index,
				deletedCard[0].card_id,
				newLists,
				prevLists
			);
		}
	};

	const onUpdateListSeq = async (listId, sourceListSeq, destListSeq, newLists, prevLists) => {
		dispatch(changeLists(newLists));
		const data = {
			listId,
			sourceListSeq,
			destListSeq
		};

		const result = await dispatch(updateListSeq({ boardId, listId, data }));

		if (!result.success) {
			dispatch(changeLists(prevLists));
			dispatch(setMessageStates(true, 'error', result.data.data));
		}
	};

	const onUpdateCardSeq = async (sourceListId, destListId, sourceCardSeq, destCardSeq, cardId, newLists, prevLists) => {
		dispatch(changeLists(newLists));
		const data = {
			sourceListId,
			destListId,
			sourceCardSeq,
			destCardSeq,
			cardId
		};

		const result = await dispatch(updateCardSeq({ boardId, list_id: sourceListId, data }));

		if (!result.success) {
			dispatch(changeLists(prevLists));
			dispatch(setMessageStates(true, 'error', result.data.data));
		}
	};

	const onCloseModal = () => dispatch(changeModalVisible(false));
	const onCloseListAction = () => dispatch(changeListActionVisible(false));

	return (
		<Root backgroundColor={board.background_color}>
			<GlobalHeader isLogined={isLogined} />
			<Container>
				<BoardHeader board={board} />
				<BoardContent board={board} lists={lists} onDragEnd={onDragEnd} />
				<CardModal visible={cardModalVisible} onCloseModal={onCloseModal} />
				<ListAction
					visible={listActionVisible}
					posX={listActionPosX}
					posY={listActionPosY}
					onCloseModal={onCloseListAction}
				/>
			</Container>
			<Message visible={message.visible} type={message.type} text={message.text} />
		</Root>
	);
};

export default React.memo(BoardContainer);
