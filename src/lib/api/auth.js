import client from './client';

export const socialLogin = async ({data}) => client.post('/auth/socialLogin', data);
export const login = async ({username, password}) => client.post('/auth/login', {username, password});
export const register = async ({data}) => client.post('/auth/register', data);
export const check = async ({username}) => client.post('/auth/check', {username});
export const verify = async ({username, verify_code}) => client.post('/auth/verify', {username, verify_code});