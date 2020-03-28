import { handleActions, createAction } from 'redux-actions';

const SET_MESSAGE_STATES = 'board/SET_MESSAGE_STATES';
export const setMessageStates = createAction(SET_MESSAGE_STATES, (visible, type, text) => ({ visible, type, text }));

const initState = {
	message: {
		visible: false,
		type: 'error',
		text: '유효하지 않은 접근입니다!'
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
