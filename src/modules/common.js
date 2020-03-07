import { handleActions, createAction } from 'redux-actions';

const SET_MESSAGE_STATES = 'board/SET_MESSAGE_STATES';
export const setMessageStates = createAction(SET_MESSAGE_STATES, (visible, text) => ({ visible, text }));

const initState = {
	message: {
		visible: false,
		text: ''
	}
};

const common = handleActions(
	{
		[SET_MESSAGE_STATES]: (state, action) => ({
			...state,
			message: {
				visible: action.payload.visible,
				text: action.payload.text
			}
		})
	},
	initState
);

export default common;
