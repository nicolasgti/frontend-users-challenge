import { useState } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

const Topbar = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;

  const getInitials = (name: string) =>
    name
      ?.split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAnchorEl(null);
    navigate('/login');
  };

  return (
    <AppBar
      position="static"
      sx={{
        background: '#fff',
        color: '#000',
        boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.08)',
        zIndex: 1201, // para ficar sobre a sidebar se necessário
      }}
    >
      <Toolbar sx={{ justifyContent: 'flex-end', px: 3 }}>
        <Box
          onMouseEnter={(e) => setAnchorEl(e.currentTarget)}
          onMouseLeave={() => setAnchorEl(null)}
          sx={{ position: 'relative', display: 'inline-block', cursor: 'pointer' }}
        >
          <Avatar
            sx={{
              bgcolor: '#00464f',
              width: 40,
              height: 40,
              fontSize: 14,
              fontWeight: 'bold',
            }}
          >
            {user ? getInitials(user.nome) : 'US'}
          </Avatar>

          {/* Ícone sobreposto */}
          <Box
            sx={{
              position: 'absolute',
              bottom: -2,
              right: -2,
              bgcolor: '#fff',
              borderRadius: '50%',
              width: 16,
              height: 16,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 1,
            }}
          >
            {open ? (
              <ExpandMoreIcon sx={{ fontSize: 14, color: 'gray' }} />
            ) : (
              <ExpandLessIcon sx={{ fontSize: 14, color: 'gray' }} />
            )}
          </Box>

          {/* Menu suspenso */}
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={() => setAnchorEl(null)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            MenuListProps={{
              onMouseLeave: () => setAnchorEl(null),
            }}
            PaperProps={{
              sx: {
                p: 1.5,
                borderRadius: 2,
                width: 280,
                boxShadow: 3,
              },
            }}
          >
            {user && (
              <Box px={1.5} mb={1}>
                <Box display="flex" alignItems="center" gap={1}>
                  <Avatar
                    sx={{
                      bgcolor: '#00464f',
                      width: 36,
                      height: 36,
                      fontSize: 13,
                      fontWeight: 'bold',
                    }}
                  >
                    {getInitials(user.nome)}
                  </Avatar>
                  <Box>
                    <Typography fontWeight="bold" color="#00464f" fontSize={14}>
                      {user.nome}
                    </Typography>
                    <Typography fontSize={13} color="text.secondary">
                      {user.email}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            )}

            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              <Typography fontSize={14}>Sair</Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
