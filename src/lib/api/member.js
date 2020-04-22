import client from './client';

export const getAllBoards = ({ memberId }) => client.get('/member/' + memberId + '/boards');
export const getTeams = async ({ memberId }) => client.get('/member/' + memberId + '/teams');
