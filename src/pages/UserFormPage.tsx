import React, { useEffect, useState } from 'react';
import { Alert, Box, Container, Snackbar } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import UserForm from '../components/UserForm';
import { getUserById, updateUser, createUser } from '../services/userServices'; // você pode adaptar isso
import ModalGeneric from '../components/ModalGeneric';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

const UserFormPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [form, setForm] = useState({
    nome: '',
    email: '',
    matricula: '',
    repetirSenha: '', 
    senha: '', 
  });
  const [showCancelAlert, setShowCancelAlert] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  const [modalOpen, setModalOpen] = useState(false);

  const [error, setError] = useState('');


  const isEdit = Boolean(id);

  useEffect(() => {
    if (isEdit && id) {
      getUserById(id).then((data) => {
        setForm({
          nome: data.nome,
          email: data.email,
          matricula: data.matricula,
          senha: '',
          repetirSenha: '', 
        });
      });
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setError('');
    try {  
        const { repetirSenha, senha, ...formSemSenha } = form;
      if (isEdit && id) {
        await updateUser(id, formSemSenha); 
      } else {
        await createUser(form); 
      }
      navigate('/users');
    } catch (err: any) {
        if (err.response && err.response.data && err.response.data.message) {
          setError(err.response.data.message);
        } else {
          setError('Erro ao salvar usuário');
        }
        setShowCancelAlert(true);
        setTimeout(() => {
          setShowCancelAlert(false);
        }, 4000);
        console.error('Erro ao salvar usuário:', err);
      }
    };

  const handleCancel = () => {
    setError('');
    setModalOpen(true)
  };

  return (
    <Box sx={{ display: 'flex', width: '100vw', height: '100vh', backgroundColor: '#F3F3F3' }}>
      <Sidebar open={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <Box sx={{ flexGrow: 1 }}>
        <Topbar />
        <Container sx={{ mt: 4, px: 4 }} maxWidth={false} disableGutters>
          <UserForm
            form={form}
            onChange={handleChange}
            onCancel={handleCancel}
            onSubmit={handleSubmit}
            isEdit={isEdit}
          />
        </Container>
      </Box>
        <ModalGeneric 
            open={modalOpen}
            title="Deseja cancelar?"
            description="Os dados inseridos não serão salvos"
            confirmText="Sim"
            cancelText="Não"
            onClose={() => setModalOpen(false)}
            onConfirm={() => {
                setModalOpen(false);
                if (!isEdit) {              
                    setShowCancelAlert(true);
                    setTimeout(() => {
                        navigate('/users');
                    }, 1200);
                }
                else {
                    navigate('/users');
                }
        }}
        />
        <Snackbar
            open={showCancelAlert}
            autoHideDuration={4000}
            onClose={() => setShowCancelAlert(false)}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
            <Alert
                onClose={() => setShowCancelAlert(false)}
                severity="warning"
                variant="filled"
                sx={{ backgroundColor: '#f57c00', color: 'white', fontWeight: 'bold' }}
                iconMapping={{
                warning: <WarningAmberIcon />,
                }}
            >
                {error ? error : 'Cadastro cancelado'}
            </Alert>
        </Snackbar>
    </Box>
  );
};

export default UserFormPage;
