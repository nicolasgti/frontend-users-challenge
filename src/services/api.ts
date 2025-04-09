import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

// Interceptor para incluir o token automaticamente
api.interceptors.request.use((config) => {
const token = localStorage.getItem('token');

if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
}

return config;
});

api.interceptors.response.use(
(response) => response,
(error) => {
    
    if (error.response?.status === 401) {
        console.warn('Sessão expirada, redirecionando...');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
    }
    return Promise.reject(error);
}
);

export default api;