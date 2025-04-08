import { useState } from 'react';
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Typography,
} from '@mui/material';
import {
  Home,
  ExpandLess,
  ExpandMore,
  Lock,
  People,
  ChevronLeft,
  ChevronRight,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const VERSION = import.meta.env.VITE_VERSION || '0.0.0';

type SidebarProps = {
  open: boolean;
  toggleSidebar: () => void;
};

const Sidebar: React.FC<SidebarProps> = ({ open, toggleSidebar }) => {
  const navigate = useNavigate();
  const [submenuOpen, setSubmenuOpen] = useState(true);

  const handleSubmenuToggle = () => setSubmenuOpen(!submenuOpen);

  return (
    <>
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          width: open ? 260 : 80,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: open ? 260 : 80,
            backgroundColor: '#0a1f3d',
            color: '#fff',
            borderRight: 0,
            transition: 'width 0.3s',
            overflowX: 'hidden',
            boxShadow: open ? 'none' : '4px 0 10px rgba(0, 0, 0, 0.2)',
          },
        }}
      >
        {/* LOGO */}
        <Box
          display="flex"
          justifyContent={'center'}
          alignItems="center"
          px={2}
          py={1}
          height={64}
        >
          {open ? (
            <img src="/logo.png" alt="WenLock" style={{ width: '150px' }} />
          ) : (
            <Box display="flex" flexDirection="column" alignItems="center">
                <img src="/logo-resumend.png" alt="WenLock" style={{ width: '50px' }} />
            </Box>
          )}
        </Box>

        <List sx={{ mt: 2 }}>
        {/* HOME */}
        <ListItemButton
          onClick={() => navigate('/home')}
          sx={{
            my: 0.5,
            mx: 1,
            borderRadius: 1,
            backgroundColor: '#066b75',
            minHeight: 36,
            px: 1.5,
            '& .MuiListItemIcon-root': {
              color: '#fff',
              minWidth: 32,
            },
            '& .MuiTypography-root': {
              fontSize: '14px',
              fontWeight: 500,
            },
          }}
        >
          <ListItemIcon>
            <Home fontSize="small" />
          </ListItemIcon>
          {open && <ListItemText primary="Home" />}
        </ListItemButton>

        {/* CONTROLE DE ACESSO */}
        <ListItemButton
          onClick={handleSubmenuToggle}
          sx={{
            mx: 1,
            borderRadius: 1,
            minHeight: 36,
            px: 1.5,
            '& .MuiListItemIcon-root': {
              color: '#B0BEC5',
              minWidth: 32,
            },
            '& .MuiTypography-root': {
              fontSize: '14px',
              fontWeight: 500,
              color: '#B0BEC5',
            },
          }}
        >
          <ListItemIcon>
            <Lock fontSize="small" />
          </ListItemIcon>
          {open && <ListItemText primary="Controle de Acesso" />}
          {open && (submenuOpen ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />)}
        </ListItemButton>

        {/* SUBMENU - USUÁRIOS */}
        <Collapse in={submenuOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              onClick={() => navigate('/users')}
              sx={{
                ml: open ? 4 : 0,
                mx: 1,
                my: 0.5,
                borderRadius: 1,
                backgroundColor: '#00b6bd',
                minHeight: 36,
                px: 1.5,
                '& .MuiListItemIcon-root': {
                  color: '#002A32',
                  minWidth: 32,
                },
                '& .MuiTypography-root': {
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#002A32',
                },
              }}
            >
              <ListItemIcon>
                <People fontSize="small" />
              </ListItemIcon>
              {open && <ListItemText primary="Usuários" />}
            </ListItemButton>
          </List>
        </Collapse>
      </List>


        {/* RODAPÉ */}
        <Box position="absolute" bottom={16} left={open ? 24 : 8}>
          {open ? (
            <Box>
              <Typography variant="body2" color="#fff">
                © WenLock
              </Typography>
              <Typography variant="caption" color="#ccc">
                Power by Conecthus 
              </Typography>
              <Typography variant="caption" color="#ccc">
                 V{VERSION}
              </Typography>
            </Box>
          ) : (
            <Typography variant="caption" color="#ccc">
              V{VERSION}
            </Typography>
          )}
        </Box>
      </Drawer>

      {/* BOTÃO FLUTUANTE EXTERNO */}
      <IconButton
        onClick={toggleSidebar}
        sx={{
          position: 'absolute',
          top: 36,
          left: open ? 248 : 68, // alinhamento
          backgroundColor: '#F5F5F5',
          width: 26,
          height: 26,
          zIndex: 1400,
          border: '1px solid #ccc',
          boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.15)',
          '&:hover': {
            backgroundColor: '#e0e0e0',
          },
        }}
      >
        {open ? (
          <ChevronLeft sx={{ fontSize: 20, color: '#4C5C6B' }} />
        ) : (
          <ChevronRight sx={{ fontSize: 20, color: '#4C5C6B' }} />
        )}
      </IconButton>
    </>
  );
};

export default Sidebar;
