import client from './client';

export const createBoard = ({token, data}) => client.post('/api/board', data, {headers: {"x-access-token": token}});
export const getBoard = ({token, board_id}) => client.get('/api/board/' + board_id, {headers: {"x-access-token": token}});
export const getAllBoards = ({token, member_id}) => client.get('/api/member/' + member_id + '/boards', {headers: {"x-access-token": token}});
export const updateCardSeq = ({token, board_id, list_id, data}) => 
                client.put('/api/board/' + board_id  + '/list/' + list_id + '/card/seq', data, 
                {headers: {"x-access-token": token}}); 
export const updateListSeq = ({token, board_id, data}) => client.put('/api/board/' + board_id + '/list/seq', data, {headers: {"x-access-token": token}});

// list
export const createList = ({token, board_id, data}) =>
            client.post('/api/board/' + board_id + '/list', data, 
            {headers: {"x-access-token": token}});

// card
export const createCard = ({token, board_id, list_id, data}) =>
            client.post('/api/board/' + board_id + '/list/' + list_id + '/card', data, 
            {headers: {"x-access-token": token}});

export const getCard = ({token, board_id, card_id}) =>
            client.get('/api/board/' + board_id + '/card/' + card_id,
            {headers: {"x-access-token": token}});

export const updateCardDescription = ({token, board_id, card_id, data}) =>
            client.put('/api/board/' + board_id + '/card/' + card_id + '/description',
            data, {headers: {"x-access-token": token}});

export const updateCardDueDate = ({token, board_id, card_id, data}) =>
            client.put('/api/board/' + board_id + '/card/' + card_id + '/due_date',
            data, {headers: {"x-access-token": token}});
// checklist
export const createCheckList = ({token, board_id, card_id, data}) =>
            client.post('/api/board/' + board_id + '/card/' + card_id + '/checklist',
            data, {headers: {"x-access-token": token}});

export const deleteCheckList = ({token, board_id, card_id, checklist_id}) =>
            client.delete('/api/board/' + board_id + '/card/' + card_id + '/checklist/' + checklist_id,
            {headers: {"x-access-token": token}});

export const getCheckList = ({token, board_id, card_id}) =>
            client.get('/api/board/' + board_id + '/card/' + card_id + '/checklist',
            {headers: {"x-access-token": token}});

// checklist item
export const createCheckListItem = ({token, board_id, checklist_id, data}) =>
            client.post('/api/board/' + board_id + '/checklist/' + checklist_id,
            data, {headers: {"x-access-token": token}});

export const updateCheckListItem = ({token, board_id, item_id, data}) =>
            client.put('/api/board/' + board_id + '/checklist_item/' + item_id,
            data, {headers: {"x-access-token": token}});

export const deleteCheckListItem = ({token, board_id, item_id}) =>
            client.delete('/api/board/' + board_id + '/checklist_item/' + item_id,
            {headers: {"x-access-token": token}});

// comment    
export const createComment = ({token, board_id, card_id, data}) =>
            client.post('/api/board/' + board_id + '/card/' + card_id + '/comment',
            data, {headers: {"x-access-token": token}});

export const deleteComment = ({token, board_id, comment_id}) =>
            client.delete('/api/board/' + board_id + '/comment/' + comment_id,
            {headers: {"x-access-token": token}});

export const getAllLabels = ({token, board_id}) => 
            client.get('/api/board/' + board_id + '/labels', {headers: {"x-access-token": token}});

export const updateCardLabel = ({token, board_id, card_id, label_id, data}) =>
            client.put('/api/board/' + board_id + '/card/' + card_id + '/labels/' + label_id, 
            data, {headers: {"x-access-token": token}});