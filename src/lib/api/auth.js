import client from './client';

export const socialLogin = async ({data}) => client.post('/api/auth/socialLogin', data);
export const login = async ({username, password}) => client.post('/api/auth/login', {username, password});
export const register = async ({data}) => client.post('/api/auth/register', data);
export const check = async ({username}) => client.post('/api/auth/check', {username});
export const verify = async ({username, verify_code}) => client.post('/api/auth/verify', {username, verify_code});