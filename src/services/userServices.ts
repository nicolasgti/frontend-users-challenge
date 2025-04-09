import { FetchUsersResponse } from '../types/userTypes';
import api from './api';
import { User } from '../types/userTypes';

export const fetchUsers = async (
  _token: string, // já não é mais necessário, mas mantive por compatibilidade
  page = 1,
  limit = 10,
  search = ''
): Promise<FetchUsersResponse> => {
  const params: any = { page, limit };
  if (search) params.search = search;

  const res = await api.get<FetchUsersResponse>('/users', { params });
  return res.data;
};

export const deleteUser = async (id: number): Promise<void> => {
  await api.delete(`/users/${id}`);
};

export const getUserById = async (id: string): Promise<User> => {
  const res = await api.get<User>(`/users/${id}`);
  return res.data;
};

export const createUser = async (data: Partial<User>) => {
  const { id, resetPasswordToken, createdAt, updatedAt, isRoot, ...payload } = data; 
  const res = await api.post('/users', payload);
  return res.data;
};

export const updateUser = async (id: string, data: Partial<User>) => {
  const { senha, resetPasswordToken, createdAt, updatedAt, isRoot, ...payload } = data; 
  const res = await api.put(`/users/${id}`, payload);
  return res.data;
};