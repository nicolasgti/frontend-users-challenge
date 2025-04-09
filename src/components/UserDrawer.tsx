// src/components/UserDrawer.tsx
import React from 'react';
import {
  Box, Typography, Divider, Drawer, IconButton, Button, Grid
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { User } from '../types/userTypes';

type Props = {
  open: boolean;
  onClose: () => void;
  user: User | null;
};

const UserDrawer: React.FC<Props> = ({ open, onClose, user }) => {
  if (!user) return null;

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 400, p: 3 }} justifyContent="space-between" display="flex" flexDirection="column">
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" fontWeight="bold" color="#0B2B25">
            Visualizar Usuário
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Dados do Usuário */}
        <Box display="flex" alignItems="center" mb={2}>
          <Typography fontWeight="bold" fontSize={11} color="#0B2B25" mr={1}>
            Dados do Usuário
          </Typography>
          <Box flex={1}>
            <Divider />
          </Box>
        </Box>
        <Grid container spacing={2} mt={1} mb={2}>
          <Grid size={{ xs: 6 }}>
            <Typography fontSize={14}>Nome</Typography>
            <Typography fontWeight="bold">{user.nome}</Typography>
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Typography fontSize={14}>Matrícula</Typography>
            <Typography fontWeight="bold">{user.matricula}</Typography>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Typography fontSize={14}>E-mail</Typography>
            <Typography fontWeight="bold">{user.email}</Typography>
          </Grid>
        </Grid>

        {/* Detalhes */}
        <Box display="flex" alignItems="center" mb={2}>
          <Typography fontWeight="bold" fontSize={11} color="#0B2B25" mr={1}>
            Detalhes
          </Typography>
          <Box flex={1}>
            <Divider />
          </Box>
        </Box>
        <Grid container spacing={2} mt={1}>
          <Grid size={{ xs: 6 }}>
            <Typography fontSize={14}>Data de criação</Typography>
            <Typography fontWeight="bold">{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '-'}</Typography>
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Typography fontSize={14}>Última edição</Typography>
            <Typography fontWeight="bold">
              {user.updatedAt ? new Date(user.updatedAt).toLocaleDateString() : 'Nenhuma'}
            </Typography>
          </Grid>
        </Grid>

        <Box display="flex" justifyContent="center" mt={6}>
          <Button variant="outlined" onClick={onClose}>
            Fechar
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default UserDrawer;
