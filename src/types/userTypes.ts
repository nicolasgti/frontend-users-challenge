export type User = {
    id: number;
    nome: string;
    email: string;
    matricula: string;
    senha?: string; 
    resetPasswordToken?: string;
    createdAt: Date; 
    updatedAt: Date;
    isRoot: boolean;
  };
  
export type FetchUsersResponse = {
data: User[];
total: number;
};