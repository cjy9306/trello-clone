import client from './client';

export const createTeam = async ({data}) => client.post('/team', data);
export const getTeam = ({teamId}) => client.get('/team/' + teamId);
export const deleteTeam = ({teamId}) => client.delete('/team/' + teamId);
export const addTeamMember = ({teamId, data}) => client.post('/team/' + teamId + '/member', data);
export const deleteTeamMember = ({teamId, memberId}) => client.delete('/team/' + teamId + '/member/' + memberId);