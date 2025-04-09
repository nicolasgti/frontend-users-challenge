import React from 'react';
import {
  Box,
  Button,
  Divider,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from '@mui/material';
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
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);

  const handleRecoverPassword = async (email: string) => {
    if(email) {
  
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
        }
        catch (error) {
          console.error('Erro:', error);
        }
      console.log(`Recuperando senha para o email: ${email}`);
    }}
  return (
    <>
      <Box bgcolor="#fff" p={4} borderRadius={2}>
        <Typography variant="h5" fontWeight="bold" color="#0B2B25" mb={2}>
          {isEdit ? 'Editar Usuário' : 'Cadastro de Usuário'}
        </Typography>

        <Typography fontWeight="bold" mb={1}>
          Dados do Usuário
        </Typography>
        <Divider />

        <Grid container spacing={2} mt={1} mb={3}>
          <Grid size={{ xs: 12, md: 6 }}>

            <TextField
              label="Insira o nome completo*"
              name="nome"
              fullWidth
              value={form.nome}
              onChange={onChange}
              inputProps={{ maxLength: 30 }} />
            <Typography fontSize={10} textAlign="right" mt={0.5}>
              • Máx. 30 Caracteres
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label="Insira o Nº da matrícula"
              name="matricula"
              fullWidth
              value={form.matricula}
              onChange={onChange}
              inputProps={{ minLength: 4, maxLength: 10 }} />
            <Typography fontSize={10} textAlign="right" mt={0.5}>
              • Mín. 4 Letras | • Máx. 10 Caracteres
            </Typography>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              label="Insira o E-mail*"
              name="email"
              fullWidth
              value={form.email}
              onChange={onChange}
              inputProps={{ maxLength: 40 }} />
            <Typography fontSize={10} textAlign="right" mt={0.5}>
              • Máx. 40 Caracteres
            </Typography>
          </Grid>
        </Grid>

        <Typography fontWeight="bold" mb={1}>
          Dados de acesso
        </Typography>
        <Divider />

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
                  label="Senha"
                  name="senha"
                  fullWidth
                  type="password"
                  value={form.senha}
                  onChange={onChange} />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Repetir Senha"
                  name="repetirSenha"
                  fullWidth
                  type="password"
                  value={form.repetirSenha}
                  onChange={onChange} />
              </Grid>
            </>
          )}
        </Grid>

        <Box mt={4} display="flex" justifyContent="flex-end" gap={2}>
          <Button variant="outlined" onClick={onCancel}>
            Cancelar
          </Button>
          <Button variant="contained" onClick={onSubmit}>
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
