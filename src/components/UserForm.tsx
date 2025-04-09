import React, { useState } from 'react';
import {
  Box,
  Button,
  Divider,
  TextField,
  Typography,
  Snackbar,
  Alert,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { VisibilityOutlined, VisibilityOffOutlined } from '@mui/icons-material';
import Grid from '@mui/material/Grid';

type FormData = {
  nome: string;
  email: string;
  matricula: string;
  senha?: string;
  repetirSenha?: string;
};

type Props = {
  form: FormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCancel: () => void;
  onSubmit: () => void;
  isEdit?: boolean;
};

const UserForm: React.FC<Props> = ({
  form,
  onChange,
  onCancel,
  onSubmit,
  isEdit = false,
}) => {
  const [errors, setErrors] = useState({
    nome: '',
    email: '',
    matricula: '',
    senha: '',
    repetirSenha: '',
  });
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);


  const validate = () => {
    const newErrors = { nome: '', email: '', matricula: '', senha: '', repetirSenha: '' };

    if (!form.nome) {
      newErrors.nome = 'O nome é obrigatório.';
    }

    if (!form.email) {
      newErrors.email = 'O e-mail é obrigatório.';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Insira um e-mail válido.';
    }

    if (!form.matricula) {
      newErrors.matricula = 'A matrícula é obrigatória.';
    } else if (form.matricula.length < 4) {
      newErrors.matricula = 'A matrícula deve ter pelo menos 4 caracteres.';
    }

    if (!isEdit) {
      if (!form.senha) {
        newErrors.senha = 'A senha é obrigatória.';
      } else if (form.senha.length < 6) {
        newErrors.senha = 'A senha deve ter pelo menos 6 caracteres.';
      }

      if (!form.repetirSenha) {
        newErrors.repetirSenha = 'É necessário repetir a senha.';
      } else if (form.repetirSenha !== form.senha) {
        newErrors.repetirSenha = 'As senhas não coincidem.';
      }
    }

    setErrors(newErrors);

    // Retorna true se não houver erros
    return !Object.values(newErrors).some((error) => error !== '');
  };

  const handleSubmit = () => {
    if (validate()) {
      onSubmit();
    }
  };

  const handleRecoverPassword = async (email: string) => {
    if (email) {
      try {
        const response = await fetch('http://localhost:3001/auth/forgot-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email }),
        });

        if (!response.ok) {
          throw new Error('Erro ao recuperar a senha');
        }
        setSnackbarOpen(true);
        const data = await response.json();
        console.log(data.message);
      } catch (error) {
        console.error('Erro:', error);
      }
      console.log(`Recuperando senha para o email: ${email}`);
    }
  };

  return (
    <>
      <Box bgcolor="#fff" p={4} borderRadius={2}>
        <Typography variant="h5" fontWeight="bold" color="#0B2B25" mb={2}>
          {isEdit ? 'Editar Usuário' : 'Cadastro de Usuário'}
        </Typography>

        <Box display="flex" alignItems="center" mb={1} gap={1}>
          <Typography fontSize={11} fontWeight="bold" color='#0B2B25'>Dados do Usuário</Typography>
          <Divider sx={{ flexGrow: 1 }} />
        </Box>

        <Grid container spacing={2} mt={1} mb={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              variant="filled"
              label="Insira o nome completo*"
              name="nome"
              fullWidth
              value={form.nome}
              onChange={onChange}
              error={Boolean(errors.nome)}
              helperText={errors.nome}
              inputProps={{ maxLength: 30 }}
            />
            <Typography fontSize={10} textAlign="right" mt={0.5} color='gray'>
              • Máx. 30 Caracteres
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              variant="filled"
              label="Insira o Nº da matrícula"
              name="matricula"
              fullWidth
              value={form.matricula}
              onChange={onChange}
              error={Boolean(errors.matricula)}
              helperText={errors.matricula}
              inputProps={{ minLength: 4, maxLength: 10 }}
            />
            <Typography fontSize={10} textAlign="right" mt={0.5} color='gray'>
              • Mín. 4 Letras | • Máx. 10 Caracteres
            </Typography>
          </Grid>

          <Grid size={{ xs: 6 }}>
            <TextField
              variant="filled"
              label="Insira o E-mail*"
              name="email"
              fullWidth
              value={form.email}
              onChange={onChange}
              error={Boolean(errors.email)}
              helperText={errors.email}
              inputProps={{ maxLength: 40 }}
            />
            <Typography fontSize={10} textAlign="right" mt={0.5} color='gray'>
              • Máx. 40 Caracteres
            </Typography>
          </Grid>
        </Grid>

        <Box display="flex" alignItems="center" mb={1} gap={1}>
          <Typography fontSize={11} fontWeight="bold" color='#0B2B25'>Dados de Acesso</Typography>
          <Divider sx={{ flexGrow: 1 }} />
        </Box>

        <Grid container spacing={2} mt={1} mb={4}>
          {isEdit ? (
            <Grid size={{ xs: 12 }}>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => handleRecoverPassword(form.email)}
              >
                Redefinir senha por e-mail
              </Button>
            </Grid>
          ) : (
            <>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  variant="filled"
                  label="Senha*"
                  name="senha"
                  fullWidth
                  type={showPassword ? 'text' : 'password'}
                  value={form.senha}
                  onChange={onChange}
                  error={Boolean(errors.senha)}
                  helperText={errors.senha}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  variant="filled"
                  label="Repetir Senha*"
                  name="repetirSenha"
                  fullWidth
                  type={showRepeatPassword ? 'text' : 'password'}
                  value={form.repetirSenha}
                  onChange={onChange}
                  error={Boolean(errors.repetirSenha)}
                  helperText={errors.repetirSenha}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                          edge="end"
                        >
                          {showRepeatPassword ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </>
          )}
        </Grid>

        <Box mt={4} display="flex" justifyContent="flex-end" gap={2}>
         <Button
            variant="outlined"
            onClick={onCancel}
            sx={{
              fontWeight: 'bold',
              borderColor: '#0B2B25',
              color: '#0B2B25',
              '&:hover': {
                borderColor: '#0B2B25',
                backgroundColor: 'rgba(11, 43, 37, 0.04)',
              },
            }}
          >
            Cancelar
          </Button>
          <Button 
            variant="contained" 
            onClick={handleSubmit} 
            >
            {isEdit ? 'Salvar' : 'Cadastrar'}
          </Button>
        </Box>
        
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          severity="success"
          variant="filled"
          onClose={() => setSnackbarOpen(false)}
          sx={{ backgroundColor: '#00b894', color: 'white', fontWeight: 'bold' }}
        >
          Link de redefinição de senha enviado!
        </Alert>
      </Snackbar>
    </>
  );
};

export default UserForm;