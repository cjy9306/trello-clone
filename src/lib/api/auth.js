import client from './client';

export const login = async ({username, password}) => client.post('/api/auth/login', {username, password});
export const register = async ({register_field}) => client.post('/api/auth/register', {register_field});
export const check = async ({username}) => client.post('/api/auth/check', {username});
export const verify = async ({username, verify_code}) => client.post('/api/auth/verify', {username, verify_code});