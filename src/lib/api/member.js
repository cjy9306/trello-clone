import client from './client';

export const getAllBoards = ({token, member_id}) => client.get('/api/member/' + member_id + '/boards', {headers: {"x-access-token": token}});
export const getTeams = async ({token, memberId}) => 
    client.get('/api/member/' + memberId + '/teams', {headers: {"x-access-token": token}});

