import client from './client';

export const getAllBoards = ({member_id}) => client.get('/member/' + member_id + '/boards');
export const getTeams = async ({memberId}) => client.get('/member/' + memberId + '/teams');

