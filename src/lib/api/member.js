import client from './client';

export const getTeams = async ({token, memberId}) => 
    client.get('/api/member/' + memberId + '/teams', {headers: {"x-access-token": token}});