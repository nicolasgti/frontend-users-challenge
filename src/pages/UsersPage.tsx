import React, { useState } from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import SearchBar from '../components/SearchBar';
import UserList from '../components/UserList';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

const UsersPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [query, setQuery] = useState('');

  const navigate = useNavigate();

  return (
    <Box sx={{ display: 'flex', width: '100vw', height: '100vh', backgroundColor: '#F3F3F3' }}>
      <Sidebar open={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <Box sx={{ width: '100%' }}>
        <Topbar />

        <Container maxWidth={false} disableGutters sx={{ mt: 2, px: 6 }}>
          <Box pt={2}>
            <Typography color="#0B2B25" fontWeight="bold" variant="h4">
              Usuários
            </Typography>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 2,
                mt: 2,
              }}
            >
              <SearchBar query={query} onChange={setQuery} />

              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#009fb7',
                  color: '#fff',
                  textTransform: 'none',
                  height: 48,
                  px: 3,
                  fontWeight: 'bold',
                  borderRadius: 1,
                  whiteSpace: 'nowrap',
                  '&:hover': { backgroundColor: '#018fa3' },
                }}
                startIcon={<AddIcon />}
                onClick={() => navigate('/usuarios/novo')}
              >
                Cadastrar Usuário
              </Button>
            </Box>

            <UserList search={query} />
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default UsersPage;
