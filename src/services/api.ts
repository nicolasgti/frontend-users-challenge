import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
    const navigate = useNavigate();
    
    if (error.response.status === 401) {
        navigate('/login', { replace: true });
    }
    return Promise.reject(error);
}
);

export default api;