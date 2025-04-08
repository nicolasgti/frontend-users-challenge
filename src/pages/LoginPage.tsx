import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
    IconButton,
    InputAdornment,
    Link,
    Alert,
    Snackbar
  } from '@mui/material';
  import { Visibility, VisibilityOff } from '@mui/icons-material';
  import React, { useState } from 'react';
  import { Link as RouterLink, useNavigate } from 'react-router-dom';
  import { loginAPI } from '../services/authService';
  
  const LoginPage: React.FC = () => {
    const navigate = useNavigate();


    const [showPassword, setShowPassword] = useState(false);
  
    // Estados dos campos
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
  
    // Erros locais (campo obrigatório, etc.)
    const [errorUsuario, setErrorUsuario] = useState('');
    const [errorSenha, setErrorSenha] = useState('');
  
    // Erro global (ex: credenciais inválidas)
    const [globalError, setGlobalError] = useState('');
    const [openError, setOpenError] = useState(false); // controla exibição do Alert
  
    const handleTogglePassword = () => setShowPassword(!showPassword);
  
    const handleCloseError = () => {
      setOpenError(false);
      setGlobalError('');
    };
  
    const handleLogin = async () => {
      setErrorUsuario('');
      setErrorSenha('');
      setGlobalError('');

      if (!usuario) setErrorUsuario('Campo obrigatório');
      if (!senha) setErrorSenha('Campo obrigatório');
      if (!usuario || !senha) return;

      try {
        const data = await loginAPI(usuario, senha);
        localStorage.setItem('token', data.access_token);
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/loading');
        console.log('Login bem-sucedido!');
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
        {/* Lado esquerdo com a logo */}
        <Box
          sx={{
            width: '50%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#0a1f3d',
          }}
        >
          <img src="/logo.png" alt="WenLock" style={{ width: '412px' }} />
        </Box>
  
        {/* Lado direito com o form */}
        <Box
          sx={{
            width: '50%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#0a1f3d',
          }}
        >
          <Paper elevation={3} sx={{ p: 4, width: '100%', height: 400, maxWidth: 400, borderRadius: 2 }}>
            <Typography variant="h5" color="#00b6bd" gutterBottom fontWeight="bold">
              Bem-vindo!
            </Typography>
            <Typography variant="body2" mb={2}>
              Entre com sua conta
            </Typography>
  
            {/* Campo Usuário */}
            <TextField
              label="E-mail ou N° matrícula"
              fullWidth
              margin="normal"
              variant="outlined"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              error={Boolean(errorUsuario)}
              helperText={errorUsuario}
            />
  
            {/* Campo Senha */}
            <TextField
              label="Senha"
              fullWidth
              margin="normal"
              variant="outlined"
              type={showPassword ? 'text' : 'password'}
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              error={Boolean(errorSenha)}
              helperText={errorSenha}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
  
            {/* Botão Entrar */}
            <Button
              variant="contained"
              fullWidth
              sx={{ mt: 2, backgroundColor: '#0290A4', ':hover': { backgroundColor: '#00a1a8' } }}
              onClick={handleLogin}
            >
              Entrar
            </Button>
  
            {/* Link Esqueci minha senha */}
            <Box mt={2} textAlign="center">
              <Link component={RouterLink} to="/forgot-password" underline="hover" color="#00b6bd">
                Esqueci minha senha
              </Link>
            </Box>
          </Paper>
        </Box>
  
        {/* Alerta de erro global */}
        <Snackbar open={openError} autoHideDuration={5000} onClose={handleCloseError} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
          <Alert onClose={handleCloseError} severity="error" variant="filled">
            {globalError}
          </Alert>
        </Snackbar>
      </Box>
    );
  };
  
  export default LoginPage;
  