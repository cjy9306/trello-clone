import { handleActions, createAction } from 'redux-actions';

const SET_MESSAGE_STATES = 'board/SET_MESSAGE_STATES';
export const setMessageStates = createAction(SET_MESSAGE_STATES, (visible, type, text) => ({ visible, type, text }));

const initState = {
	message: {
		visible: false,
		type: '',
		text: ''
	}
};

const common = handleActions(
	{
		[SET_MESSAGE_STATES]: (state, action) => ({
			...state,
			message: {
				visible: action.payload.visible,
				type: action.payload.type,
				text: action.payload.text
			}
		})
	},
	initState
);

export default common;
