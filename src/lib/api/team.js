import client from './client';

export const createTeam = async ({data}) => client.post('/api/team', data);
export const getTeam = ({teamId}) => client.get('/api/team/' + teamId);
export const deleteTeam = ({teamId}) => client.delete('/api/team/' + teamId);
export const addTeamMember = ({teamId, data}) => client.post('/api/team/' + teamId + '/member', data);
export const deleteTeamMember = ({teamId, memberId}) => client.delete('/api/team/' + teamId + '/member/' + memberId);