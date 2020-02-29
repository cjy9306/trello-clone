import client from './client';

export const createBoard = ({token, data}) => client.post('/api/board', data, {headers: {"x-access-token": token}});
export const getBoard = ({token, boardId}) => client.get('/api/board/' + boardId, {headers: {"x-access-token": token}});
export const deleteBoard = ({token, boardId}) => client.delete('/api/board/' + boardId, {headers: {"x-access-token": token}});

export const updateCardSeq = ({token, boardId, list_id, data}) => 
                client.put('/api/board/' + boardId  + '/list/' + list_id + '/card/seq', data, 
                {headers: {"x-access-token": token}}); 
export const updateListSeq = ({token, boardId, data}) => client.put('/api/board/' + boardId + '/list/seq', data, {headers: {"x-access-token": token}});

// list
export const createList = ({token, boardId, data}) =>
            client.post('/api/board/' + boardId + '/list', data, 
            {headers: {"x-access-token": token}});

// card
export const createCard = ({token, boardId, list_id, data}) =>
            client.post('/api/board/' + boardId + '/list/' + list_id + '/card', data, 
            {headers: {"x-access-token": token}});

export const getCard = ({token, boardId, card_id}) =>
            client.get('/api/board/' + boardId + '/card/' + card_id,
            {headers: {"x-access-token": token}});

export const updateCardDescription = ({token, boardId, card_id, data}) =>
            client.put('/api/board/' + boardId + '/card/' + card_id + '/description',
            data, {headers: {"x-access-token": token}});

export const updateCardDueDate = ({token, boardId, card_id, data}) =>
            client.put('/api/board/' + boardId + '/card/' + card_id + '/due_date',
            data, {headers: {"x-access-token": token}});
// checklist
export const createCheckList = ({token, boardId, card_id, data}) =>
            client.post('/api/board/' + boardId + '/card/' + card_id + '/checklist',
            data, {headers: {"x-access-token": token}});

export const deleteCheckList = ({token, boardId, card_id, checklist_id}) =>
            client.delete('/api/board/' + boardId + '/card/' + card_id + '/checklist/' + checklist_id,
            {headers: {"x-access-token": token}});

export const getCheckList = ({token, boardId, card_id}) =>
            client.get('/api/board/' + boardId + '/card/' + card_id + '/checklist',
            {headers: {"x-access-token": token}});

// checklist item
export const createCheckListItem = ({token, boardId, checklist_id, data}) =>
            client.post('/api/board/' + boardId + '/checklist/' + checklist_id,
            data, {headers: {"x-access-token": token}});

export const updateCheckListItem = ({token, boardId, item_id, data}) =>
            client.put('/api/board/' + boardId + '/checklist_item/' + item_id,
            data, {headers: {"x-access-token": token}});

export const deleteCheckListItem = ({token, boardId, item_id}) =>
            client.delete('/api/board/' + boardId + '/checklist_item/' + item_id,
            {headers: {"x-access-token": token}});

// comment    
export const createComment = ({token, boardId, card_id, data}) =>
            client.post('/api/board/' + boardId + '/card/' + card_id + '/comment',
            data, {headers: {"x-access-token": token}});

export const deleteComment = ({token, boardId, comment_id}) =>
            client.delete('/api/board/' + boardId + '/comment/' + comment_id,
            {headers: {"x-access-token": token}});

export const getAllLabels = ({token, boardId}) => 
            client.get('/api/board/' + boardId + '/labels', {headers: {"x-access-token": token}});

export const updateCardLabel = ({token, boardId, card_id, label_id, data}) =>
            client.put('/api/board/' + boardId + '/card/' + card_id + '/labels/' + label_id, 
            data, {headers: {"x-access-token": token}});

export const getBoardMembers = ({token, boardId}) =>
            client.get('/api/board/' + boardId + '/members', {headers: {"x-access-token": token}});

export const addBoardMember = ({token, boardId, data}) =>
            client.post('/api/board/' + boardId + '/members', data, {headers: {"x-access-token": token}});

export const deleteBoardMember = ({token, boardId, member_id}) =>
            client.delete('/api/board/' + boardId + '/members/' + member_id, {headers: {"x-access-token": token}});