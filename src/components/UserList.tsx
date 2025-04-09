import {
    Box,
    Typography,
    IconButton,
    Stack,
    Pagination,
    Select,
    MenuItem,
    CircularProgress,
    SelectChangeEvent,
  } from '@mui/material';
  import { Edit, Delete, Visibility } from '@mui/icons-material';
  import React, { useEffect, useState } from 'react';
  import { deleteUser, fetchUsers } from '../services/userServices';
  import ModalGeneric from './ModalGeneric';
  import { User } from '../types/userTypes';
  import UserDrawer from './UserDrawer';
  import { useNavigate } from 'react-router-dom';

  
  const UserList: React.FC<{ search: string }> = ({ search }) => {
    const token = localStorage.getItem('token') || '';
    const navigate = useNavigate();
    const loggedUser = JSON.parse(localStorage.getItem('user') || 'null');
  
    const [users, setUsers] = useState<User[]>([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [loading, setLoading] = useState(false);
  
    const [modalOpen, setModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState<User | null>(null);

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [userToView, setUserToView] = useState<User | null>(null);

  
    const handleOpenModal = (user: User) => {
      setUserToDelete(user);
      setModalOpen(true);
    };
  
    const handleConfirmDelete = async () => {
        if (userToDelete) {
          try {
            await deleteUser(userToDelete.id);
            setUsers((prev) => prev.filter((u) => u.id !== userToDelete.id));
          } catch (err) {
            console.error('Erro ao excluir usuário:', err);
          } finally {
            setModalOpen(false);
            setUserToDelete(null);
          }
        }
      };
  
    const loadUsers = async () => {
        setLoading(true);
        try {
            const { data, total } = await fetchUsers(token, page, rowsPerPage, search);
            setUsers(data);
            setTotal(total);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
      
  
    useEffect(() => {
      loadUsers();
    }, [page, rowsPerPage, search]);
  
    const handlePageChange = (_: any, value: number) => setPage(value);
  
    const handleRowsPerPageChange = (event: SelectChangeEvent<number>) => {
      setRowsPerPage(Number(event.target.value));
      setPage(1);
    };

    const handleViewUser = (user: User) => {
      setUserToView(user);
      setDrawerOpen(true);
    };
  
    return (
      <Box> 
        <Box sx={{ display: 'flex', borderRadius: 2, backgroundColor: '#0c1423', color: '#fff', px: 2, py: 1 }}>
          <Typography sx={{ flex: 1 }}>Nome</Typography>
          <Typography sx={{ marginRight: 10 }}>Ações</Typography>
        </Box>
  
        {loading ? (
          <Box py={4} textAlign="center">
            <CircularProgress />
          </Box>
        ) : (
          users.map((user) => (
            <Box
              key={user.id}
              sx={{
                backgroundColor: '#fff',
                borderRadius: 2,
                my: 1,
                px: 2,
                py: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Typography sx={{ color: '#00231d' }}>{user.nome}</Typography>
              <Stack direction="row" spacing={1}>
                <IconButton onClick={() => handleViewUser(user)}>
                  <Visibility sx={{ color: '#00231d' }} />
                </IconButton>
                <IconButton onClick={() => navigate(`/usuarios/editar/${user.id}`)}>
                  <Edit sx={{ color: '#00231d' }} />
                </IconButton>
                {user.id !== loggedUser?.id && (
                  <IconButton onClick={() => handleOpenModal(user)}>
                    <Delete sx={{ color: '#00231d' }} />
                  </IconButton>
                )}
              </Stack>
            </Box>
          ))
        )}
  
        <Box mt={3} display="flex" justifyContent="space-between" alignItems="center">
          <Typography sx={{ color: '#00231d' }} fontSize={14}>
            Total de itens: <strong>{total}</strong>
          </Typography>
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography sx={{ color: '#00231d' }} fontSize={14}>Itens por página</Typography>
            <Select
              value={rowsPerPage}
              onChange={handleRowsPerPageChange}
              size="small"
              sx={{ height: 30 }}
            >
              {[5, 10, 15].map((num) => (
                <MenuItem key={num} value={num}>{num}</MenuItem>
              ))}
            </Select>
            <Pagination
              count={Math.ceil(total / rowsPerPage)}
              page={page}
              onChange={handlePageChange}
              color="primary"
            />
          </Stack>
        </Box>
  
        <ModalGeneric
          open={modalOpen}
          title="Deseja excluir?"
          description="O usuário será excluído."
          onClose={() => setModalOpen(false)}
          onConfirm={handleConfirmDelete}
          confirmText="Sim"
          cancelText="Não"
        />
        <UserDrawer
          open={drawerOpen}
          user={userToView}
          onClose={() => setDrawerOpen(false)}
        />
      </Box>
    );
  };
  
  export default UserList;
  