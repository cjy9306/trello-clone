import { handleActions } from 'redux-actions';
import * as authAPI from '../lib/api/auth';
import createRequestThunk from '../lib/createRequestThunk';


const LOGIN = 'auth/LOGIN';
const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
const LOGIN_FAIL = 'auth/LOGIN_FAIL';
export const login = createRequestThunk(LOGIN, authAPI.login);

const initState = {
    loading: {
        LOGIN: false,
    }
};

const auth = handleActions(
    {
        [LOGIN]: (state, action) => ({
            ...state,
            loading: {
                ...state.loading,
                LOGIN: true,
            }
        }),
        [LOGIN_SUCCESS]: (state, action) => ({
            ...state,
            loading: {
                ...state.loading,
                LOGIN: false,
            }
        }),
        [LOGIN_FAIL]: (state, action) => ({
            ...state,
            loading: {
                ...state.loading,
                LOGIN: false,
            }
        }),
    },
    initState
);

export default auth;