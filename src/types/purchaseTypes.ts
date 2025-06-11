export type Purchase = {
  id: number;
  total: number;
  responsavel: string;
  createdAt: Date;
};

export type FetchPurchasesResponse = {
  data: Purchase[];
  total: number;
};
