import React, { useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { GLOBAL_HEADER_DEFAULT_BACKGROUND } from '../../common/Constants';
import useCheckWhetherIsLogined from '../../hooks/useCheckWhetherIsLogined';
import GlobalHeader from '../../components/GlobalHeader';
import Message from '../../components/Message';
import {
	getBoard,
	changeLists,
	updateListSeq,
	updateCardSeq,
	changeModalVisible,
	changeListActionVisible,
} from '../../modules/board';
import BoardContent from './Board/BoardContent';
import BoardHeader from './Board/BoardHeader';
import CardModal from './CardModal/CardModal';
import ListAction from './List/ListAction';

const Container = styled.div`
	background-color: #${(props) => props.backgroundColor};
	height: 100%;
	overflow: hidden;
`;

const BoardMainContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	background-color: #${(props) => props.backgroundColor};
`;

const parseDndItemId = (itemId) => {
	if (typeof itemId !== 'string') return null;

	const arr = itemId.split('-');
	return Number(arr[arr.length - 1]);
};

const getListItem = (lists, listId) => {
	for (const index in lists) {
		if (lists[index].list_id === listId) return [lists[index], index];
	}

	return null;
};

/*
 *	Board 페이지의 루트 컴포넌트
 *
 */
const BoardContainer = ({ match: { params } }) => {
	const { boardId } = params;
	const isLogined = useCheckWhetherIsLogined();

	const dispatch = useDispatch();
	const board = useSelector((state) => state.board.board);
	const lists = useSelector((state) => state.board.lists);
	const cardModalVisible = useSelector((state) => state.board.cardModalVisible);
	const listActionVisible = useSelector((state) => state.board.listAction.listActionVisible);
	const listActionPosX = useSelector((state) => state.board.listAction.posX);
	const listActionPosY = useSelector((state) => state.board.listAction.posY);
	const message = useSelector((state) => state.common.message);

	useEffect(() => {
		dispatch(getBoard({ boardId }));
	}, [boardId, dispatch]);

	// drag & drop related functions
	const changeListSeq = async (listId, sourceListSeq, destListSeq, newLists, prevLists) => {
		dispatch(changeLists(newLists));
		const data = {
			listId,
			sourceListSeq,
			destListSeq,
		};

		const result = await dispatch(updateListSeq({ boardId, listId, data }));

		if (result.success === false) {
			dispatch(changeLists(prevLists));
		}
	};

	const changeCardSeq = async (sourceListId, destListId, sourceCardSeq, destCardSeq, cardId, newLists, prevLists) => {
		dispatch(changeLists(newLists));
		const data = {
			sourceListId,
			destListId,
			sourceCardSeq,
			destCardSeq,
			cardId,
		};

		const result = await dispatch(updateCardSeq({ boardId, listId: sourceListId, data }));

		if (result.success === false) {
			dispatch(changeLists(prevLists));
		}
	};

	const onDragEnd = async (result) => {
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

			changeListSeq(deletedList[0].list_id, source.index, destination.index, newLists, prevLists);
			return;
		}

		const sourceListId = parseDndItemId(source.droppableId);
		const destListId = parseDndItemId(destination.droppableId);

		if (sourceListId === null || destListId === null) return;

		const [sourceList, sourceListIndex] = getListItem(lists, sourceListId);
		const [destList, destListIndex] = getListItem(lists, destListId);

		// 같은 list 내에서 card 만 이동할 경우
		if (sourceList.list_id === destList.list_id) {
			const newCards = [...sourceList.cards];

			const deletedCard = newCards.splice(source.index, 1)[0];
			newCards.splice(destination.index, 0, deletedCard);

			// update sequence
			for (const index in newCards) {
				newCards[index].seq = index;
			}

			const newList = {
				...sourceList,
				cards: newCards,
			};

			const prevLists = [...lists];
			const newLists = [...lists];
			newLists[sourceListIndex] = newList;

			changeCardSeq(sourceListId, destListId, source.index, destination.index, deletedCard.card_id, newLists, prevLists);
		} else {
			// card가 다른 list로 옮겨가는 경우
			const newSourceCards = [...sourceList.cards];
			const newDestCards = [...destList.cards];

			const deletedCard = newSourceCards.splice(source.index, 1)[0];
			const newSourceList = {
				...sourceList,
				cards: newSourceCards,
			};

			newDestCards.splice(destination.index, 0, deletedCard);
			const newDestList = {
				...destList,
				cards: newDestCards,
			};
			const prevLists = [...lists];
			const newLists = [...lists];
			newLists[sourceListIndex] = newSourceList;
			newLists[destListIndex] = newDestList;

			changeCardSeq(sourceListId, destListId, source.index, destination.index, deletedCard.card_id, newLists, prevLists);
		}
	};

	const closeCardModal = useCallback(() => dispatch(changeModalVisible(false)), [dispatch]);
	const closeListAction = useCallback(() => dispatch(changeListActionVisible(false)), [dispatch]);

	return (
		<Container backgroundColor={board.background_color || GLOBAL_HEADER_DEFAULT_BACKGROUND}>
			<GlobalHeader isLogined={isLogined} />
			<BoardMainContainer>
				<BoardHeader board={board} />
				<BoardContent board={board} lists={lists} onDragEnd={onDragEnd} />
				<CardModal visible={cardModalVisible} onCloseModal={closeCardModal} />
				<ListAction
					visible={listActionVisible}
					posX={listActionPosX}
					posY={listActionPosY}
					onCloseListAction={closeListAction}
				/>
			</BoardMainContainer>
			<Message visible={message.visible} type={message.type} text={message.text} />
		</Container>
	);
};

BoardContainer.propTypes = {
	match: PropTypes.shape({
		params: PropTypes.shape({
			boardId: PropTypes.string.isRequired,
		}).isRequired,
	}).isRequired,
};

export default BoardContainer;
