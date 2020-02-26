import { handleActions } from 'redux-actions';
import * as memberAPI from '../lib/api/member';
import createRequestThunk from '../lib/createRequestThunk';

const GET_TEAMS = 'member/GET_TEAMS';
const GET_TEAMS_SUCCESS = 'member/GET_TEAMS_SUCCESS';
const GET_TEAMS_FAIL = 'member/GET_TEAMS_FAIL';
export const getTeams = createRequestThunk(GET_TEAMS, memberAPI.getTeams);

const CREATE_TEAM = 'member/CREATE_TEAM';
const CREATE_TEAM_SUCCESS = 'member/CREATE_TEAM_SUCCESS';
const CREATE_TEAM_FAIL = 'member/CREATE_TEAM_FAIL';
export const createTeam = createRequestThunk(CREATE_TEAM, memberAPI.createTeam);

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
            teams: action.payload.teams,
        }),
        [GET_TEAMS_FAIL]: (state, action) => ({
            ...state,
        }),
        [CREATE_TEAM]: (state, action) => ({
            ...state,
        }),
        [CREATE_TEAM_SUCCESS]: (state, action) => ({
            ...state,
        }),
        [CREATE_TEAM_FAIL]: (state, action) => ({
            ...state,
        }),
    },
    initState
);

export default member;