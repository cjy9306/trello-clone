import client from './client';

export const createBoard = ({ data }) => client.post('/board', data);
export const getBoard = ({ boardId }) => client.get('/board/' + boardId);
export const deleteBoard = ({ boardId }) => client.delete('/board/' + boardId);
export const updateCardSeq = ({ boardId, listId, data }) =>
	client.put('/board/' + boardId + '/list/' + listId + '/card/seq', data);
export const updateListSeq = ({ boardId, listId, data }) => client.put('/board/' + boardId + '/list/' + listId + '/seq', data);

// list
export const createList = ({ boardId, data }) => client.post('/board/' + boardId + '/list', data);
export const updateList = ({ boardId, listId, data }) => client.put('/board/' + boardId + '/list/' + listId, data);
export const deleteList = ({ boardId, listId }) => client.delete('/board/' + boardId + '/list/' + listId);

// card
export const createCard = ({ boardId, listId, data }) => client.post('/board/' + boardId + '/list/' + listId + '/card', data);
export const getCard = ({ boardId, cardId }) => client.get('/board/' + boardId + '/card/' + cardId);
export const deleteCard = ({ boardId, cardId }) => client.delete('/board/' + boardId + '/card/' + cardId);
export const updateCard = ({ boardId, cardId, data }) => client.put('/board/' + boardId + '/card/' + cardId, data);
export const getCardMembers = ({ boardId, cardId }) => client.get('/board/' + boardId + '/card/' + cardId + '/members');
export const addCardMember = ({ boardId, cardId, data }) =>
	client.post('/board/' + boardId + '/card/' + cardId + '/member', data);
export const deleteCardMember = ({ boardId, cardId, memberId }) =>
	client.delete('/board/' + boardId + '/card/' + cardId + '/member/' + memberId);

// checklist
export const createCheckList = ({ boardId, cardId, data }) =>
	client.post('/board/' + boardId + '/card/' + cardId + '/checklist', data);
export const deleteCheckList = ({ boardId, cardId, checklistId }) =>
	client.delete('/board/' + boardId + '/card/' + cardId + '/checklist/' + checklistId);
export const getCheckList = ({ boardId, cardId }) => client.get('/board/' + boardId + '/card/' + cardId + '/checklist');

// checklist item
export const createCheckListItem = ({ boardId, checklistId, data }) =>
	client.post('/board/' + boardId + '/checklist/' + checklistId, data);
export const updateCheckListItem = ({ boardId, itemId, data }) =>
	client.put('/board/' + boardId + '/checklist_item/' + itemId, data);
export const deleteCheckListItem = ({ boardId, itemId }) => client.delete('/board/' + boardId + '/checklist_item/' + itemId);

// comment
export const createComment = ({ boardId, cardId, data }) =>
	client.post('/board/' + boardId + '/card/' + cardId + '/comment', data);
export const deleteComment = ({ boardId, commentId }) => client.delete('/board/' + boardId + '/comment/' + commentId);
export const getAllLabels = ({ boardId }) => client.get('/board/' + boardId + '/labels');
export const updateCardLabel = ({ boardId, cardId, labelId, data }) =>
	client.put('/board/' + boardId + '/card/' + cardId + '/labels/' + labelId, data);
export const getBoardMembers = ({ boardId }) => client.get('/board/' + boardId + '/members');
export const addBoardMember = ({ boardId, data }) => client.post('/board/' + boardId + '/members', data);
export const deleteBoardMember = ({ boardId, memberId }) => client.delete('/board/' + boardId + '/members/' + memberId);
