import axios from 'axios';

const client = axios.create();

client.defaults.baseURL = process.env.REACT_APP_API_SERVER_ADDRESS;
client.interceptors.request.use(config => {
	config.headers.AccessToken = sessionStorage.getItem('token');
	return config;
});
axios.interceptors.response.use(
	response => {
		return response;
	},
	error => {
		return Promise.reject(error);
	}
);

export default client;
