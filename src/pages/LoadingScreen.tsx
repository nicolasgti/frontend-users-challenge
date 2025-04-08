import React, { useEffect, useState } from 'react';
import { Box, Typography, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CustomLinearProgress } from '../components/CustomLinearProgress';

const LoadingScreen: React.FC = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(true);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Simula barra de progresso até 100%
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 1;
        return next >= 100 ? 100 : next;
      });
    }, 30);

    // Redireciona após 3 segundos
    const timeout = setTimeout(() => {
      setSnackbarOpen(false);
      navigate('/home'); // ⬅ Troque pela sua rota segura
    }, 3000);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(timeout);
    };
  }, [navigate]);

  return (
    <Box
      sx={{
        backgroundColor: '#0a1f3d',
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 4,
      }}
    >
      {/* Logo */}
      <Typography variant="h3" fontWeight="bold">
        <span style={{ color: '#00b6bd' }}>Wen</span>
        <span style={{ color: 'white' }}>Lock</span>
        <span style={{ color: '#00b6bd' }}>.</span>
      </Typography>

      {/* Barra de progresso */}
      <Box mt={4}>
        <CustomLinearProgress variant="determinate" value={progress} />
      </Box>

      {/* Snackbar de sucesso */}
      <Snackbar open={snackbarOpen} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert severity="success" variant="filled" sx={{ bgcolor: '#00b600', color: '#fff' }}>
          Usuário logado com sucesso!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default LoadingScreen;
