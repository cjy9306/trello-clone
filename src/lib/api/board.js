import client from './client';

export const createBoard = ({data}) => client.post('/board', data);
export const getBoard = ({boardId}) => client.get('/board/' + boardId);
export const deleteBoard = ({boardId}) => client.delete('/board/' + boardId);
export const updateCardSeq = ({boardId, list_id, data}) => client.put('/board/' + boardId  + '/list/' + list_id + '/card/seq', data); 
export const updateListSeq = ({boardId, data}) => client.put('/board/' + boardId + '/list/seq', data);

// list
export const createList = ({boardId, data}) => client.post('/board/' + boardId + '/list', data);

// card
export const createCard = ({boardId, list_id, data}) => client.post('/board/' + boardId + '/list/' + list_id + '/card', data);
export const getCard = ({boardId, card_id}) => client.get('/board/' + boardId + '/card/' + card_id);
export const updateCardDescription = ({boardId, card_id, data}) => client.put('/board/' + boardId + '/card/' + card_id + '/description', data);
export const updateCardDueDate = ({boardId, card_id, data}) => client.put('/board/' + boardId + '/card/' + card_id + '/due_date', data);

// checklist
export const createCheckList = ({boardId, card_id, data}) => client.post('/board/' + boardId + '/card/' + card_id + '/checklist', data);
export const deleteCheckList = ({boardId, card_id, checklist_id}) => client.delete('/board/' + boardId + '/card/' + card_id + '/checklist/' + checklist_id);
export const getCheckList = ({boardId, card_id}) => client.get('/board/' + boardId + '/card/' + card_id + '/checklist');

// checklist item
export const createCheckListItem = ({boardId, checklist_id, data}) => client.post('/board/' + boardId + '/checklist/' + checklist_id, data);
export const updateCheckListItem = ({boardId, item_id, data}) => client.put('/board/' + boardId + '/checklist_item/' + item_id, data);
export const deleteCheckListItem = ({boardId, item_id}) => client.delete('/board/' + boardId + '/checklist_item/' + item_id);

// comment    
export const createComment = ({boardId, card_id, data}) => client.post('/board/' + boardId + '/card/' + card_id + '/comment', data);
export const deleteComment = ({boardId, comment_id}) => client.delete('/board/' + boardId + '/comment/' + comment_id);
export const getAllLabels = ({boardId}) => client.get('/board/' + boardId + '/labels');
export const updateCardLabel = ({boardId, card_id, label_id, data}) => client.put('/board/' + boardId + '/card/' + card_id + '/labels/' + label_id, data);
export const getBoardMembers = ({boardId}) => client.get('/board/' + boardId + '/members');
export const addBoardMember = ({boardId, data}) => client.post('/board/' + boardId + '/members', data);
export const deleteBoardMember = ({boardId, member_id}) => client.delete('/board/' + boardId + '/members/' + member_id);