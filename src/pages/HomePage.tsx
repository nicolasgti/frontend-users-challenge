// src/pages/Home.tsx
import React, { useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

const Home: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Recupera nome do usuário do localStorage
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;
  const nome = user?.nome?.split(' ')[0] || 'Usuário';

  // Data formatada em português
  const dataAtual = new Date();
  const dataFormatada = dataAtual.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return (
    <Box sx={{ display: 'flex', width: '100vw', height: '100vh', backgroundColor: '#F3F3F3' }}>
      <Sidebar open={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <Box sx={{ width: '100%' }}>
        <Topbar />

        <Container 
          maxWidth={false}
          disableGutters
          sx={{ mt: 4, px: 3 }}>
          <Typography variant="h5" color="#0B2B25" fontWeight="bold" mb={2}>
            Home
          </Typography>

          <Box
            sx={{
              backgroundColor: '#fff',
              borderRadius: 2,
              p: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '70vh',
            }}
          >
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Olá {nome}!
            </Typography>
            <Typography variant="body2" gutterBottom>
              {dataFormatada}
            </Typography>

            <img
              src="/welcome.png"
              alt="Boas-vindas"
              style={{ width: 300, margin: '40px 0' }}
            />

            <Box
              sx={{
                backgroundColor: '#28284700',
                border: '1px solid #ccc',
                borderRadius: 2,
                px: 4,
                py: 2,
              }}
            >
              <Typography variant="h6" fontWeight="bold" color="#0B2B25">
                Bem-vindo ao WenLock!
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
