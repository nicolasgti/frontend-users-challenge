import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import LoginPage from '../pages/LoginPage';

export const SplashScreen: React.FC = () => {
  const [showLogo, setShowLogo] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogo(false);
    }, 3000); // tempo total antes de ir pro login

    return () => clearTimeout(timer);
  }, []);

  return (
    <Box sx={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <AnimatePresence>
        {showLogo ? (
          <motion.div
            key="splash"
            initial={{ x: 0 }}
            animate={{ x: 0 }}
            exit={{ x: '-100%', transition: { duration: 1 } }}
            style={{
              backgroundColor: '#0A1F3D',
              width: '100vw',
              height: '100vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <motion.img
              src="/logo.png" // troque para sua logo
              alt="WenLock"
              initial={{ opacity: 0, scale: 2.3, x: 0 }}
              animate={{ opacity: 1, scale: 2.3, x: -550 }}
              exit={{ opacity: 0, scale: 2.5, transition: { duration: 2 } }}
              transition={{ duration: 2 }}
              style={{ width: 180 }}
            />
          </motion.div>
        ) : (
          <motion.div
            key="login"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            transition={{ duration: 1 }}
            style={{
              width: '100vw',
              height: '100vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              transition={{ duration: 1 }}
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <LoginPage />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default SplashScreen;