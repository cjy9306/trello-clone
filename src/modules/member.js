import { createAction, handleActions } from 'redux-actions';
import * as memberAPI from '../lib/api/member';
import createRequestThunk from '../lib/createRequestThunk';

const GET_TEAMS = 'member/GET_TEAMS';
const GET_TEAMS_SUCCESS = 'member/GET_TEAMS_SUCCESS';
const GET_TEAMS_FAIL = 'member/GET_TEAMS_FAIL';
export const getTeams = createRequestThunk(GET_TEAMS, memberAPI.getTeams);

const initState = {
    teams: [],
};

const member = handleActions(
    {
        [GET_TEAMS]: (state, action) => ({
            ...state,
        }),
        [GET_TEAMS_SUCCESS]: (state, action) => ({
            ...state,
            teams: action.payload,
        }),
        [GET_TEAMS_FAIL]: (state, action) => ({
            ...state,
        }),
    },
    initState
);

export default member;