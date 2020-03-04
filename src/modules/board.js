import { createAction, handleActions } from 'redux-actions';
import * as boardAPI from '../lib/api/board';
import createRequestThunk from '../lib/createRequestThunk';

const CREATE_BOARD = 'board/CREATE_BOARD';
const CREATE_BOARD_SUCCESS = 'board/CREATE_BOARD_SUCCESS';
const CREATE_BOARD_FAIL = 'board/CREATE_BOARD_FAIL';
export const createBoard = createRequestThunk(CREATE_BOARD, boardAPI.createBoard);

const GET_BOARD = 'board/GET_BOARD';
const GET_BOARD_SUCCESS = 'board/GET_BOARD_SUCCESS';
const GET_BOARD_FAIL = 'board/GET_BOARD_FAIL';
export const getBoard = createRequestThunk(GET_BOARD, boardAPI.getBoard);

const DELETE_BOARD = 'board/DELETE_BOARD';
const DELETE_BOARD_SUCCESS = 'board/DELETE_BOARD_SUCCESS';
const DELETE_BOARD_FAIL = 'board/DELETE_BOARD_FAIL';
export const deleteBoard = createRequestThunk(DELETE_BOARD, boardAPI.deleteBoard);

const CHANGE_LISTS = 'board/CHANGE_LISTS';
export const changeLists = createAction(CHANGE_LISTS, lists => ({ lists }));

const CREATE_LIST = 'board/CREATE_LIST';
const CREATE_LIST_SUCCESS = 'board/CREATE_LIST_SUCCESS';
const CREATE_LIST_FAIL = 'board/CREATE_LIST_FAIL';
export const createList = createRequestThunk(CREATE_LIST, boardAPI.createList);

const UPDATE_CARD_SEQ = 'board/UPDATE_CARD_SEQ';
const UPDATE_CARD_SEQ_SUCCESS = 'board/UPDATE_CARD_SEQ_SUCCESS';
const UPDATE_CARD_SEQ_FAIL = 'board/UPDATE_CARD_SEQ_FAIL';
export const updateCardSeq = createRequestThunk(UPDATE_CARD_SEQ, boardAPI.updateCardSeq);

const UPDATE_LIST_SEQ = 'board/UPDATE_LIST_SEQ';
const UPDATE_LIST_SEQ_SUCCESS = 'board/UPDATE_LIST_SEQ_SUCCESS';
const UPDATE_LIST_SEQ_FAIL = 'board/UPDATE_LIST_SEQ_FAIL';
export const updateListSeq = createRequestThunk(UPDATE_LIST_SEQ, boardAPI.updateListSeq);

const ADD_CARD = 'board/ADD_CARD';
const ADD_CARD_SUCCESS = 'board/ADD_CARD_SUCCESS';
const ADD_CARD_FAIL = 'board/ADD_CARD_FAIL';
export const createCard = createRequestThunk(ADD_CARD, boardAPI.createCard);

const CHANGE_MODAL_VISIBLE = 'board/CHANGE_MODAL_VISIBLE';
export const changeModalVisible = createAction(CHANGE_MODAL_VISIBLE, visible => ({ visible }));

const SET_CARD_MODAL = 'board/SET_CARD_MODAL';
export const setCardModal = createAction(SET_CARD_MODAL, card => ({ card }));

const GET_CARD_MEMBERS = 'boar/GET_CARD_MEMBERS';
const GET_CARD_MEMBERS_SUCCESS = 'boar/GET_CARD_MEMBERS_SUCCESS';
const GET_CARD_MEMBERS_FAIL = 'boar/GET_CARD_MEMBERS_FAIL';
export const getCardMembers = createRequestThunk(GET_CARD_MEMBERS, boardAPI.getCardMembers);

const ADD_CARD_MEMBER = 'board/ADD_CARD_MEMBER';
const ADD_CARD_MEMBER_SUCCESS = 'board/ADD_CARD_MEMBER_SUCCESS';
const ADD_CARD_MEMBER_FAIL = 'board/ADD_CARD_MEMBER_FAIL';
export const addCardMember = createRequestThunk(ADD_CARD_MEMBER, boardAPI.addCardMember);

const DELETE_CARD_MEMBER = 'board/DELETE_CARD_MEMBER';
const DELETE_CARD_MEMBER_SUCCESS = 'board/DELETE_CARD_MEMBER_SUCCESS';
const DELETE_CARD_MEMBER_FAIL = 'board/DELETE_CARD_MEMBER_FAIL';
export const deleteCardMember = createRequestThunk(DELETE_CARD_MEMBER, boardAPI.deleteCardMember);

const GET_CARD = 'board/GET_CARD';
const GET_CARD_SUCCESS = 'board/GET_CARD_SUCCESS';
const GET_CARD_FAIL = 'board/GET_CARD_FAIL';
export const getCard = createRequestThunk(GET_CARD, boardAPI.getCard);

const DELETE_CARD = 'board/DELETE_CARD';
const DELETE_CARD_SUCCESS = 'board/DELETE_CARD_SUCCESS';
const DELETE_CARD_FAIL = 'board/DELETE_CARD_FAIL';
export const deleteCard = createRequestThunk(DELETE_CARD, boardAPI.deleteCard);

const UPDATE_CARD_DESCRIPTION = 'board/UPDATE_CARD_DESCRIPTION';
const UPDATE_CARD_DESCRIPTION_SUCCESS = 'board/UPDATE_CARD_DESCRIPTION_SUCCESS';
const UPDATE_CARD_DESCRIPTION_FAIL = 'board/UPDATE_CARD_DESCRIPTION_FAIL';
export const updateCardDescription = createRequestThunk(UPDATE_CARD_DESCRIPTION, boardAPI.updateCardDescription);

const UPDATE_CARD_DUEDATE = 'board/UPDATE_CARD_DUEDATE';
const UPDATE_CARD_DUEDATE_SUCCESS = 'board/UPDATE_CARD_DUEDATE_SUCCESS';
const UPDATE_CARD_DUEDATE_FAIL = 'board/UPDATE_CARD_DUEDATE_FAIL';
export const updateCardDueDate = createRequestThunk(UPDATE_CARD_DUEDATE, boardAPI.updateCardDueDate);

const CREATE_CHECKLIST = 'board/CREATE_CHECKLIST';
const CREATE_CHECKLIST_SUCCESS = 'board/CREATE_CHECKLIST_SUCCESS';
const CREATE_CHECKLIST_FAIL = 'board/CREATE_CHECKLIST_FAIL';
export const createCheckList = createRequestThunk(CREATE_CHECKLIST, boardAPI.createCheckList);

const DELETE_CHECKLIST = 'board/DELETE_CHECKLIST';
const DELETE_CHECKLIST_SUCCESS = 'board/DELETE_CHECKLIST_SUCCESS';
const DELETE_CHECKLIST_FAIL = 'board/DELETE_CHECKLIST_FAIL';
export const deleteCheckList = createRequestThunk(DELETE_CHECKLIST, boardAPI.deleteCheckList);

const GET_CHECKLIST = 'board/GET_CHECKLIST';
const GET_CHECKLIST_SUCCESS = 'board/GET_CHECKLIST_SUCCESS';
const GET_CHECKLIST_FAIL = 'board/GET_CHECKLIST_FAIL';
export const getCheckList = createRequestThunk(GET_CHECKLIST, boardAPI.getCheckList);

const CREATE_CHECKLIST_ITEM = 'board/CREATE_CHECKLIST_ITEM';
const CREATE_CHECKLIST_ITEM_SUCCESS = 'board/CREATE_CHECKLIST_ITEM_SUCCESS';
const CREATE_CHECKLIST_ITEM_FAIL = 'board/CREATE_CHECKLIST_ITEM_FAIL';
export const createCheckListItem = createRequestThunk(CREATE_CHECKLIST_ITEM, boardAPI.createCheckListItem);

const UPDATE_CHECKLIST_ITEM = 'board/UPDATE_CHECKLIST_ITEM';
const UPDATE_CHECKLIST_ITEM_SUCCESS = 'board/UPDATE_CHECKLIST_ITEM_SUCCESS';
const UPDATE_CHECKLIST_ITEM_FAIL = 'board/UPDATE_CHECKLIST_ITEM_FAIL';
export const updateCheckListItem = createRequestThunk(UPDATE_CHECKLIST_ITEM, boardAPI.updateCheckListItem);

const DELETE_CHECKLIST_ITEM = 'board/DELETE_CHECKLIST_ITEM';
const DELETE_CHECKLIST_ITEM_SUCCESS = 'board/DELETE_CHECKLIST_ITEM_SUCCESS';
const DELETE_CHECKLIST_ITEM_FAIL = 'board/DELETE_CHECKLIST_ITEM_FAIL';
export const deleteCheckListItem = createRequestThunk(DELETE_CHECKLIST_ITEM, boardAPI.deleteCheckListItem);

const CREATE_COMMENT = 'board/CREATE_COMMENT';
const CREATE_COMMENT_SUCCESS = 'board/CREATE_COMMENT_SUCCESS';
const CREATE_COMMENT_FAIL = 'board/CREATE_COMMENT_FAIL';
export const createComment = createRequestThunk(CREATE_COMMENT, boardAPI.createComment);

const DELETE_COMMENT = 'board/DELETE_COMMENT';
const DELETE_COMMENT_SUCCESS = 'board/DELETE_COMMENT_SUCCESS';
const DELETE_COMMENT_FAIL = 'board/DELETE_COMMENT_FAIL';
export const deleteComment = createRequestThunk(DELETE_COMMENT, boardAPI.deleteComment);

// labels
const GET_ALL_LABELS = 'board/GET_ALL_LABELS';
const GET_ALL_LABELS_SUCCESS = 'board/GET_ALL_LABELS_SUCCESS';
const GET_ALL_LABELS_FAIL = 'board/GET_ALL_LABELS_FAIL';
export const getAllLabels = createRequestThunk(GET_ALL_LABELS, boardAPI.getAllLabels);

const UPDATE_CARD_LABEL = 'board/UPDATE_CARD_LABEL';
const UPDATE_CARD_LABEL_SUCCESS = 'board/UPDATE_CARD_LABEL_SUCCESS';
const UPDATE_CARD_LABEL_FAIL = 'board/UPDATE_CARD_LABEL_FAIL';
export const updateCardLabel = createRequestThunk(UPDATE_CARD_LABEL, boardAPI.updateCardLabel);

const ADD_CARD_LABEL_IN_STATE = 'board/ADD_CARD_LABEL_IN_STATE';
export const addCardLabelInState = createAction(ADD_CARD_LABEL_IN_STATE, label => ({ label }));

const REMOVE_CARD_LABEL_IN_STATE = 'board/REMOVE_CARD_LABEL_IN_STATE';
export const removeCardLabelInState = createAction(REMOVE_CARD_LABEL_IN_STATE, label_id => ({
	label_id
}));

// member
const GET_BOARD_MEMBERS = 'board/GET_BOARD_MEMBERS';
const GET_BOARD_MEMBERS_SUCCESS = 'board/GET_BOARD_MEMBERS_SUCCESS';
const GET_BOARD_MEMBERS_FAIL = 'board/GET_BOARD_MEMBERS_FAIL';
export const getBoardMembers = createRequestThunk(GET_BOARD_MEMBERS, boardAPI.getBoardMembers);

const ADD_BOARD_MEMBER = 'board/ADD_BOARD_MEMBER';
const ADD_BOARD_MEMBER_SUCCESS = 'board/ADD_BOARD_MEMBER_SUCCESS';
const ADD_BOARD_MEMBER_FAIL = 'board/ADD_BOARD_MEMBER_FAIL';
export const addBoardMember = createRequestThunk(ADD_BOARD_MEMBER, boardAPI.addBoardMember);

const DELETE_BOARD_MEMBER = 'board/DELETE_BOARD_MEMBER';
const DELETE_BOARD_MEMBER_SUCCESS = 'board/DELETE_BOARD_MEMBER_SUCCESS';
const DELETE_BOARD_MEMBER_FAIL = 'board/DELETE_BOARD_MEMBER_FAIL';
export const deleteBoardMember = createRequestThunk(DELETE_BOARD_MEMBER, boardAPI.deleteBoardMember);

const initState = {
	board: {},
	lists: [],
	card: {}, // for card modal
	cardChecklist: [], // for card modal
	cardComments: [], // for card modal
	cardMembers: [], // for card modal
	allLabels: [], // for card modal, all labels in system
	cardModalVisible: false, // for card modal
	boardMembers: []
};

const board = handleActions(
	{
		[CREATE_BOARD]: (state, action) => ({
			...state
		}),
		[CREATE_BOARD_SUCCESS]: (state, action) => ({
			...state
		}),
		[CREATE_BOARD_FAIL]: (state, action) => ({
			...state
		}),
		[GET_BOARD]: (state, action) => ({
			...state
		}),
		[GET_BOARD_SUCCESS]: (state, action) => ({
			...state,
			board: action.payload.board,
			lists: action.payload.lists
		}),
		[GET_BOARD_FAIL]: (state, action) => ({
			...state
		}),
		[DELETE_BOARD]: (state, action) => ({
			...state
		}),
		[DELETE_BOARD_SUCCESS]: (state, action) => ({
			...state
		}),
		[DELETE_BOARD_FAIL]: (state, action) => ({
			...state
		}),
		[CHANGE_LISTS]: (state, { payload: { lists } }) => ({
			...state,
			lists: lists
		}),
		[CREATE_LIST]: (state, action) => ({
			...state
		}),
		[CREATE_LIST_SUCCESS]: (state, action) => ({
			...state
		}),
		[CREATE_LIST_FAIL]: (state, action) => ({
			...state
		}),
		[CHANGE_MODAL_VISIBLE]: (state, { payload: { visible } }) => ({
			...state,
			cardModalVisible: visible
		}),
		[UPDATE_CARD_SEQ]: (state, action) => ({
			...state
		}),
		[UPDATE_CARD_SEQ_SUCCESS]: (state, action) => ({
			...state
		}),
		[UPDATE_CARD_SEQ_FAIL]: (state, action) => ({
			...state
		}),
		[UPDATE_LIST_SEQ]: (state, action) => ({
			...state
		}),
		[UPDATE_LIST_SEQ_SUCCESS]: (state, action) => ({
			...state
		}),
		[UPDATE_LIST_SEQ_FAIL]: (state, action) => ({
			...state
		}),
		[ADD_CARD]: (state, action) => ({
			...state
		}),
		[ADD_CARD_SUCCESS]: (state, action) => ({
			...state
		}),
		[ADD_CARD_FAIL]: (state, action) => ({
			...state
		}),
		[SET_CARD_MODAL]: (state, { payload: { card } }) => ({
			...state,
			card: card
		}),
		[GET_CARD]: (state, action) => ({
			...state
		}),
		[GET_CARD_SUCCESS]: (state, action) => ({
			...state,
			card: action.payload.card,
			cardChecklist: action.payload.checklist,
			cardComments: action.payload.comments,
			cardMembers: action.payload.members
		}),
		[GET_CARD_FAIL]: (state, action) => ({
			...state
		}),
		[DELETE_CARD]: (state, action) => ({
			...state
		}),
		[DELETE_CARD_SUCCESS]: (state, action) => ({
			...state
		}),
		[DELETE_CARD_FAIL]: (state, action) => ({
			...state
		}),
		[GET_CARD_MEMBERS]: (state, action) => ({
			...state
		}),
		[GET_CARD_MEMBERS_SUCCESS]: (state, action) => ({
			...state,
			cardMembers: action.payload.members
		}),
		[GET_CARD_MEMBERS_FAIL]: (state, action) => ({
			...state
		}),
		[ADD_CARD_MEMBER]: (state, action) => ({
			...state
		}),
		[ADD_CARD_MEMBER_SUCCESS]: (state, action) => ({
			...state
		}),
		[ADD_CARD_MEMBER_FAIL]: (state, action) => ({
			...state
		}),
		[DELETE_CARD_MEMBER]: (state, action) => ({
			...state
		}),
		[DELETE_CARD_MEMBER_SUCCESS]: (state, action) => ({
			...state
		}),
		[DELETE_CARD_MEMBER_FAIL]: (state, action) => ({
			...state
		}),
		[UPDATE_CARD_DESCRIPTION]: (state, action) => ({
			...state
		}),
		[UPDATE_CARD_DESCRIPTION_SUCCESS]: (state, action) => ({
			...state
		}),
		[UPDATE_CARD_DESCRIPTION_FAIL]: (state, action) => ({
			...state
		}),
		[UPDATE_CARD_DUEDATE]: (state, action) => ({
			...state
		}),
		[UPDATE_CARD_DUEDATE_SUCCESS]: (state, action) => ({
			...state
		}),
		[UPDATE_CARD_DUEDATE_FAIL]: (state, action) => ({
			...state
		}),
		[CREATE_CHECKLIST]: (state, action) => ({
			...state
		}),
		[CREATE_CHECKLIST_SUCCESS]: (state, action) => ({
			...state
		}),
		[CREATE_CHECKLIST_FAIL]: (state, action) => ({
			...state
		}),
		[DELETE_CHECKLIST]: (state, action) => ({
			...state
		}),
		[DELETE_CHECKLIST_SUCCESS]: (state, action) => ({
			...state
		}),
		[DELETE_CHECKLIST_FAIL]: (state, action) => ({
			...state
		}),
		[GET_CHECKLIST]: (state, action) => ({
			...state
		}),
		[GET_CHECKLIST_SUCCESS]: (state, action) => ({
			...state,
			cardChecklist: action.payload.checklist
		}),
		[GET_CHECKLIST_FAIL]: (state, action) => ({
			...state
		}),
		[CREATE_CHECKLIST_ITEM]: (state, action) => ({
			...state
		}),
		[CREATE_CHECKLIST_ITEM_SUCCESS]: (state, action) => ({
			...state
		}),
		[CREATE_CHECKLIST_ITEM_FAIL]: (state, action) => ({
			...state
		}),
		[UPDATE_CHECKLIST_ITEM]: (state, action) => ({
			...state
		}),
		[UPDATE_CHECKLIST_ITEM_SUCCESS]: (state, action) => ({
			...state
		}),
		[UPDATE_CHECKLIST_ITEM_FAIL]: (state, action) => ({
			...state
		}),
		[DELETE_CHECKLIST_ITEM]: (state, action) => ({
			...state
		}),
		[DELETE_CHECKLIST_ITEM_SUCCESS]: (state, action) => ({
			...state
		}),
		[DELETE_CHECKLIST_ITEM_FAIL]: (state, action) => ({
			...state
		}),
		[CREATE_COMMENT]: (state, action) => ({
			...state
		}),
		[CREATE_COMMENT_SUCCESS]: (state, action) => ({
			...state
		}),
		[CREATE_COMMENT_FAIL]: (state, action) => ({
			...state
		}),
		[DELETE_COMMENT]: (state, action) => ({
			...state
		}),
		[DELETE_COMMENT_SUCCESS]: (state, action) => ({
			...state
		}),
		[DELETE_COMMENT_FAIL]: (state, action) => ({
			...state
		}),
		[GET_ALL_LABELS]: (state, action) => ({
			...state
		}),
		[GET_ALL_LABELS_SUCCESS]: (state, action) => ({
			...state,
			allLabels: action.payload.labels
		}),
		[GET_ALL_LABELS_FAIL]: (state, action) => ({
			...state
		}),
		[UPDATE_CARD_LABEL]: (state, action) => ({
			...state
		}),
		[UPDATE_CARD_LABEL_SUCCESS]: (state, action) => ({
			...state
		}),
		[UPDATE_CARD_LABEL_FAIL]: (state, action) => ({
			...state
		}),
		[ADD_CARD_LABEL_IN_STATE]: (state, { payload: { label } }) => ({
			...state,
			card: {
				...state.card
			}
		}),
		[GET_BOARD_MEMBERS]: (state, action) => ({
			...state
		}),
		[GET_BOARD_MEMBERS_SUCCESS]: (state, action) => ({
			...state,
			boardMembers: action.payload.members
		}),
		[GET_BOARD_MEMBERS_FAIL]: (state, action) => ({
			...state
		}),
		[ADD_BOARD_MEMBER]: (state, action) => ({
			...state
		}),
		[ADD_BOARD_MEMBER_SUCCESS]: (state, action) => ({
			...state
		}),
		[ADD_BOARD_MEMBER_FAIL]: (state, action) => ({
			...state
		}),
		[DELETE_BOARD_MEMBER]: (state, action) => ({
			...state
		}),
		[DELETE_BOARD_MEMBER_SUCCESS]: (state, action) => ({
			...state
		}),
		[DELETE_BOARD_MEMBER_FAIL]: (state, action) => ({
			...state
		})
	},
	initState
);

export default board;
