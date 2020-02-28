import client from './client';

export const getTeam = ({token, teamId}) => client.get('/api/team/' + teamId, {headers: {"x-access-token": token}});
export const addTeamMember = ({token, teamId, data}) =>
            client.post('/api/team/' + teamId + '/member', data, {headers: {"x-access-token": token}});
export const deleteTeamMember = ({token, teamId, memberId}) =>
            client.delete('/api/team/' + teamId + '/member/' + memberId, {headers: {"x-access-token": token}});