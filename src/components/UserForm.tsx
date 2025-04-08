import {
    Box,
    Grid,
    TextField,
    Typography,
    Divider,
    Button,
    IconButton,
    InputAdornment,
  } from '@mui/material';
  import Visibility from '@mui/icons-material/Visibility';
  import VisibilityOff from '@mui/icons-material/VisibilityOff';
  
  const UserForm = ({
    form,
    handleChange,
    handleSubmit,
    handleCancel,
    showPassword,
    togglePassword,
  }: any) => {
    return (
      <Box bgcolor="#fff" p={4} borderRadius={2}>
        <Typography variant="h5" fontWeight="bold" color="#0B2B25" mb={2}>
          Cadastro de Usuário
        </Typography>
  
        {/* Seção: Dados do Usuário */}
        <Typography fontWeight="bold" mb={1}>
          Dados do Usuário 
        </Typography>
        <Divider sx={{ mb: 3 }} />
  
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Insira o nome completo*"
              name="nome"
              value={form.nome}
              onChange={handleChange}
              inputProps={{ maxLength: 30 }}
            />
            <Typography fontSize={10} textAlign="right" mt={0.5}>
              • Máx. 30 Caracteres
            </Typography>
          </Grid>
  
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Insira o Nº da matrícula"
              name="matricula"
              value={form.matricula}
              onChange={handleChange}
              inputProps={{ minLength: 4, maxLength: 10 }}
            />
            <Typography fontSize={10} textAlign="right" mt={0.5}>
              • Min. 4 Letras | • Máx. 10 Caracteres
            </Typography>
          </Grid>
  
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Insira o E-mail*"
              name="email"
              value={form.email}
              onChange={handleChange}
              inputProps={{ maxLength: 40 }}
            />
            <Typography fontSize={10} textAlign="right" mt={0.5}>
              • Máx. 40 Caracteres
            </Typography>
          </Grid>
        </Grid>
  
        {/* Seção: Dados de Acesso */}
        <Typography fontWeight="bold" mt={4} mb={1}>
          Dados de acesso
        </Typography>
        <Divider sx={{ mb: 3 }} />
  
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              type={showPassword === 'senha' ? 'text' : 'password'}
              label="Senha"
              name="senha"
              value={form.senha}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => togglePassword('senha')} edge="end">
                      {showPassword === 'senha' ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
  
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              type={showPassword === 'repetirSenha' ? 'text' : 'password'}
              label="Repetir Senha"
              name="repetirSenha"
              value={form.repetirSenha}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => togglePassword('repetirSenha')} edge="end">
                      {showPassword === 'repetirSenha' ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
  
        {/* Botões */}
        <Box display="flex" justifyContent="flex-end" mt={4} gap={2}>
          <Button variant="outlined" onClick={handleCancel}>
            Cancelar
          </Button>
          <Button variant="contained" onClick={handleSubmit} disabled>
            Cadastrar
          </Button>
        </Box>
      </Box>
    );
  };
  
  export default UserForm;
  