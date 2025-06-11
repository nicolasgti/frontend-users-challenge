import api from './api';
import { FetchPurchasesResponse } from '../types/purchaseTypes';

export const fetchPurchases = async (
  page = 1,
  limit = 10,
): Promise<FetchPurchasesResponse> => {
  const res = await api.get<FetchPurchasesResponse>('/purchases', {
    params: { page, limit },
  });
  return res.data;
};
