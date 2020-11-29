import axios from 'axios';

const api = axios.create({
	baseURL: 'http://localhost:3333',
});

api.interceptors.request.use(config => {
	const token = localStorage.getItem('@peoplestration:token');
	config.headers.Authorization = token? `Bearer ${JSON.parse(token)}` : '';
	return config;
});

export default api;