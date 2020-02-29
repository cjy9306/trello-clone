import client from './client';

export const createTeam = async ({token, data}) => 
    client.post('/api/team', data, {headers: {"x-access-token": token}});
export const getTeam = ({token, teamId}) => client.get('/api/team/' + teamId, {headers: {"x-access-token": token}});
export const deleteTeam = ({token, teamId}) => client.delete('/api/team/' + teamId, {headers: {"x-access-token": token}});
export const addTeamMember = ({token, teamId, data}) =>
            client.post('/api/team/' + teamId + '/member', data, {headers: {"x-access-token": token}});
export const deleteTeamMember = ({token, teamId, memberId}) =>
            client.delete('/api/team/' + teamId + '/member/' + memberId, {headers: {"x-access-token": token}});