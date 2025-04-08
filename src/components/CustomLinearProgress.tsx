import { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import LinearProgress from '@mui/material/LinearProgress';

export const CustomLinearProgress = styled(LinearProgress)(() => ({
    height: 4, // altura fina
    width: '500px', // pode ajustar se quiser
    backgroundColor: 'transparent',
    border: '2px solid rgba(255, 255, 255, 0.5)',
    borderRadius: 6,
    padding: '1px', // para criar espaço interno e destacar a barra azul
  
    [`& .${linearProgressClasses.bar}`]: {
      backgroundColor: '#00d6ff',
      boxShadow: '0 0 4px #00d6ff',
      borderRadius: 0,
    },
  }));
