import axios from 'axios';
import jwt from 'jsonwebtoken';

const client = axios.create();

client.defaults.baseURL = 'http://15.164.213.61:5000/api';
// client.defaults.baseURL = 'https://localhost:5000/api';
client.interceptors.request.use(async (config) => {
	const token = sessionStorage.getItem('token');
	if (token === null) return config;

	const decoded = jwt.decode(token);
	if (decoded === null) return config;

	if (decoded.exp < Date.now() / 1000) {
		const response = await axios.post(process.env.REACT_APP_API_SERVER_ADDRESS + '/auth/refresh', token, {
			headers: { AccessToken: token },
		});

		const refreshedToken = response.data.data.token;
		const decodedRefresh = jwt.decode(refreshedToken);
		sessionStorage.setItem('token', refreshedToken);
		sessionStorage.setItem('memberId', decodedRefresh.memberId);
		sessionStorage.setItem('username', decodedRefresh.username);

		config.headers.AccessToken = refreshedToken;
		return config;
	} else {
		config.headers.AccessToken = token;
		return config;
	}
});

export default client;
