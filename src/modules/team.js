import { handleActions } from 'redux-actions';
import * as teamAPI from '../lib/api/team';
import createRequestThunk from '../lib/createRequestThunk';


const CREATE_TEAM = 'member/CREATE_TEAM';
const CREATE_TEAM_SUCCESS = 'member/CREATE_TEAM_SUCCESS';
const CREATE_TEAM_FAIL = 'member/CREATE_TEAM_FAIL';
export const createTeam = createRequestThunk(CREATE_TEAM, teamAPI.createTeam);

const GET_TEAM = 'team/GET_TEAM';
const GET_TEAM_SUCCESS = 'team/GET_TEAM_SUCCESS';
const GET_TEAM_FAIL = 'team/GET_TEAM_FAIL';
export const getTeam = createRequestThunk(GET_TEAM, teamAPI.getTeam);

const DELETE_TEAM = 'team/DELETE_TEAM';
const DELETE_TEAM_SUCCESS = 'team/DELETE_TEAM_SUCCESS';
const DELETE_TEAM_FAIL = 'team/DELETE_TEAM_FAIL';
export const deleteTeam = createRequestThunk(DELETE_TEAM, teamAPI.deleteTeam);

const ADD_TEAM_MEMBER = 'team/ADD_TEAM_MEMBER';
const ADD_TEAM_MEMBER_SUCCESS = 'team/ADD_TEAM_MEMBER_SUCCESS';
const ADD_TEAM_MEMBER_FAIL = 'team/ADD_TEAM_MEMBER_FAIL';
export const addTeamMember = createRequestThunk(ADD_TEAM_MEMBER, teamAPI.addTeamMember);

const DELETE_TEAM_MEMBER = 'team/DELETE_TEAM_MEMBER';
const DELETE_TEAM_MEMBER_SUCCESS = 'team/DELETE_TEAM_MEMBER_SUCCESS';
const DELETE_TEAM_MEMBER_FAIL = 'team/DELETE_TEAM_MEMBER_FAIL';
export const deleteTeamMember = createRequestThunk(DELETE_TEAM_MEMBER, teamAPI.deleteTeamMember);

const initState = {
    team: {},
    teamMembers: [],
};

const team = handleActions(
    {
        [CREATE_TEAM]: (state, action) => ({
            ...state,
        }),
        [CREATE_TEAM_SUCCESS]: (state, action) => ({
            ...state,
        }),
        [CREATE_TEAM_FAIL]: (state, action) => ({
            ...state,
        }),
        [GET_TEAM]: (state, action) => ({
            ...state,
        }),
        [GET_TEAM_SUCCESS]: (state, action) => ({
            ...state,
            team: action.payload.team,
            teamMembers: action.payload.teamMembers,
        }),
        [GET_TEAM_FAIL]: (state, action) => ({
            ...state,
        }),
        [DELETE_TEAM]: (state, action) => ({
            ...state,
        }),
        [DELETE_TEAM_SUCCESS]: (state, action) => ({
            ...state,
        }),
        [DELETE_TEAM_FAIL]: (state, action) => ({
            ...state,
        }),
        [ADD_TEAM_MEMBER]: (state, action) => ({
            ...state,
        }),
        [ADD_TEAM_MEMBER_SUCCESS]: (state, action) => ({
            ...state,
        }),
        [ADD_TEAM_MEMBER_FAIL]: (state, action) => ({
            ...state,
        }),
        [DELETE_TEAM_MEMBER]: (state, action) => ({
            ...state,
        }),
        [DELETE_TEAM_MEMBER_SUCCESS]: (state, action) => ({
            ...state,
        }),
        [DELETE_TEAM_MEMBER_FAIL]: (state, action) => ({
            ...state,
        }),
    },
    initState
);

export default team;