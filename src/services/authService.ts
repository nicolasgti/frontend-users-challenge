import api from './api';


export const loginAPI = async (login: string, password: string) => {
    const res = await fetch('http://localhost:3001/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ login, password }),
    });
  
    const data = await res.json(); // 👈 lê o JSON antes de tratar
  
    if (!res.ok) {
      throw new Error(data.message || 'Erro ao fazer login');
    }
  
    return data;
  };

export const resetPassword = async (token: string, newPassword: string): Promise<void> => {
    await api.post('/auth/reset-password', {
      token,
      newPassword,
    });
};

export const requestPasswordReset = async (email: string): Promise<void> => {
    await api.post('/auth/request-password-reset', { email });
};
  