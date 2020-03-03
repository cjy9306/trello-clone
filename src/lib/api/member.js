import client from './client';

export const getAllBoards = ({member_id}) => client.get('/api/member/' + member_id + '/boards');
export const getTeams = async ({memberId}) => client.get('/api/member/' + memberId + '/teams');

