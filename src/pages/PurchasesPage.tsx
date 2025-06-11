import React, { useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import PurchaseList from '../components/PurchaseList';

const PurchasesPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <Box sx={{ display: 'flex', width: '100vw', height: '100vh', backgroundColor: '#F3F3F3' }}>
      <Sidebar open={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <Box sx={{ width: '100%' }}>
        <Topbar />

        <Container maxWidth={false} disableGutters sx={{ mt: 2, px: 6 }}>
          <Box pt={2}>
            <Typography color="#0B2B25" fontWeight="bold" variant="h4">
              Compras
            </Typography>

            <PurchaseList />
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default PurchasesPage;
