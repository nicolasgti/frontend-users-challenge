import { FetchUsersResponse } from '../types/userTypes';
import api from './api';

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