import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { fetchPurchases } from '../services/purchaseService';
import { Purchase } from '../types/purchaseTypes';

const PurchaseList: React.FC = () => {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const { data } = await fetchPurchases();
        setPurchases(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <Box mt={2}>
      <Box sx={{ display: 'flex', borderRadius: 2, backgroundColor: '#0c1423', color: '#fff', px: 2, py: 1 }}>
        <Typography sx={{ flex: 1 }}>Responsável</Typography>
        <Typography>Total</Typography>
      </Box>

      {loading ? (
        <Box py={4} textAlign="center">
          <CircularProgress />
        </Box>
      ) : (
        purchases.map((purchase) => (
          <Box
            key={purchase.id}
            sx={{
              backgroundColor: '#fff',
              borderRadius: 2,
              my: 1,
              px: 2,
              py: 1,
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Typography sx={{ color: '#00231d' }}>{purchase.responsavel}</Typography>
            <Typography sx={{ color: '#00231d' }}>
              {purchase.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </Typography>
          </Box>
        ))
      )}
    </Box>
  );
};

export default PurchaseList;
