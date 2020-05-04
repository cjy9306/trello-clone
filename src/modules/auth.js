/*
 *	auth redux store
 *
 */
import { handleActions } from 'redux-actions';
import * as authAPI from '../lib/api/auth';
import createRequestThunk from '../lib/createRequestThunk';

const REGISTER = 'auth/REGISTER';
const REGISTER_SUCCESS = 'auth/REGISTER_SUCCESS';
const REGISTER_FAIL = 'auth/REGISTER_FAIL';
export const register = createRequestThunk(REGISTER, authAPI.register);

const SOCIAL_LOGIN = 'auth/SOCIAL_LOGIN';
const SOCIAL_LOGIN_SUCCESS = 'auth/SOCIAL_LOGIN_SUCCESS';
const SOCIAL_LOGIN_FAIL = 'auth/SOCIAL_LOGIN_FAIL';
export const socialLogin = createRequestThunk(SOCIAL_LOGIN, authAPI.socialLogin);

const LOGIN = 'auth/LOGIN';
const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
const LOGIN_FAIL = 'auth/LOGIN_FAIL';
export const login = createRequestThunk(LOGIN, authAPI.login);

const initState = {
	loading: {
		LOGIN: false,
	},
};

const auth = handleActions(
	{
		[REGISTER]: (state, action) => ({
			...state,
		}),
		[REGISTER_SUCCESS]: (state, action) => ({
			...state,
		}),
		[REGISTER_FAIL]: (state, action) => ({
			...state,
		}),
		[SOCIAL_LOGIN]: (state, action) => ({
			...state,
		}),
		[SOCIAL_LOGIN_SUCCESS]: (state, action) => ({
			...state,
		}),
		[SOCIAL_LOGIN_FAIL]: (state, action) => ({
			...state,
		}),
		[LOGIN]: (state, action) => ({
			...state,
			loading: {
				...state.loading,
				LOGIN: true,
			},
		}),
		[LOGIN_SUCCESS]: (state, action) => ({
			...state,
			loading: {
				...state.loading,
				LOGIN: false,
			},
		}),
		[LOGIN_FAIL]: (state, action) => ({
			...state,
			loading: {
				...state.loading,
				LOGIN: false,
			},
		}),
	},
	initState
);

export default auth;
