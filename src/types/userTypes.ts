export type User = {
    id: number;
    nome: string;
    email: string;
    matricula: string;
  };
  
export type FetchUsersResponse = {
data: User[];
total: number;
};