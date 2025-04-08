// src/pages/ForgotPasswordPage.tsx
import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
    Link,
    Snackbar,
    Alert,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
  } from '@mui/material';
  import React, { useState } from 'react';
  import { Link as RouterLink } from 'react-router-dom';
  import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
  import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
  
  const ForgotPasswordPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [openModal, setOpenModal] = useState(false);

    const [globalError, setGlobalError] = useState('');
    const [openError, setOpenError] = useState(false);
    const [errorEmail, setErrorEmail] = useState('');

    const handleCloseError = () => {
        setOpenError(false);
        setGlobalError('');
    };

    const handleCloseModal = () => {
      setOpenModal(false);
      setEmail('');
    };
  
    const handleRecover = async () => {
      setErrorEmail('');
      setGlobalError('');
    
      if (!email) {
        setErrorEmail('Campo obrigatório');
        return;
      }
    
      try {
        const response = await fetch('http://localhost:3001/auth/forgot-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });
    
        const result = await response.json(); // tenta pegar a resposta
    
        if (!response.ok) {
          throw new Error(result.message || 'Erro inesperado');
        }
    
        setTimeout(() => setOpenModal(true), 500);
      } catch (err: any) {
        setGlobalError(err.message || 'Erro inesperado');
        setOpenError(true);
      }
    };
  
    return (
      <Box
        sx={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          flexDirection: 'row',
          backgroundColor: '#0a1f3d',
        }}
      >
        {/* Lado esquerdo: ilustração ou logo */}
        <Box
          sx={{
            width: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img src="/resetPassword.png" alt="Lock" style={{ width: '300px' }} />
        </Box>
  
        {/* Lado direito: formulário */}
        <Box
          sx={{
            width: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Paper elevation={3} sx={{ p: 4, width: '100%', height: 400, maxWidth: 400, borderRadius: 2 }}>

            <Box display="flex" justifyContent="start" mb={3}>
                <img src="/logo-dark.png" alt="WenLock" style={{ width: 160 }} />
            </Box>

            <Typography variant="h5" color="#00b6bd" fontWeight="bold" gutterBottom>
              Recuperação de senha
            </Typography>
            <Typography variant="body2" mb={3}>
              Insira seu e-mail para recuperar sua senha.
            </Typography>
  
            <TextField
              label="E-mail"
              fullWidth
              margin="normal"
              variant="outlined"
              value={email}
              error={Boolean(errorEmail)}
              helperText={errorEmail}
              onChange={(e) => setEmail(e.target.value)}
            />
  
            <Button
              variant="contained"
              fullWidth
              sx={{ mt: 2, backgroundColor: '#00b6bd' }}
              onClick={handleRecover}
            >
              Recuperar
            </Button>
  
            <Box mt={3} textAlign="center">
                <Link
                    component={RouterLink}
                    to="/"
                    underline="hover"
                    color="#555"
                    sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5 }}
                    >
                        <ArrowCircleLeftOutlinedIcon fontSize="small" />
                            Voltar para o login
                </Link>
            </Box>
          </Paper>
        </Box>
        <Snackbar open={openError} autoHideDuration={5000} onClose={handleCloseError} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
            <Alert onClose={handleCloseError} severity="error" variant="filled">
            {globalError}
            </Alert>
        </Snackbar>
        <Dialog open={openModal} onClose={handleCloseModal}>
          <DialogTitle textAlign="center" fontWeight="bold">
            E-mail enviado!
          </DialogTitle>
          <DialogContent sx={{ textAlign: 'center', p: 4 }}>
            <CheckCircleOutlineIcon sx={{ fontSize: 60, color: '#0290A4', mb: 2 }} />
            <Typography>
              Lhe enviamos um e-mail com um link para recuperação da sua senha.
            </Typography>
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
            <Button
              onClick={handleCloseModal}
              variant="contained"
              sx={{ backgroundColor: '#0290A4', width: '174px', height: '56px' }}
            >
              Continuar
            </Button>
          </DialogActions>
      </Dialog>
      </Box>
      
    );
  };
  
  export default ForgotPasswordPage;
  