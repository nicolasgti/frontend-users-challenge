import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography
} from '@mui/material';

interface ModalGenericProps {
  open: boolean;
  title?: string;
  description?: string;
  onClose: () => void;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
  showCancel?: boolean;
}

const ModalGeneric: React.FC<ModalGenericProps> = ({
  open,
  title = 'Tem certeza?',
  description,
  onClose,
  onConfirm,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  showCancel = true
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ fontWeight: 'bold', textAlign: 'center' }}>
        {title}
      </DialogTitle>

      {description && (
        <DialogContent>
          <Typography textAlign="center">{description}</Typography>
        </DialogContent>
      )}

      <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
        {showCancel && (
          <Button
            onClick={onClose}
            variant="outlined"
            sx={{
              px: 4,
              borderRadius: 2,
              textTransform: 'none',
              borderColor: '#000',
              color: '#000',
              fontWeight: 'bold'
            }}
          >
            {cancelText}
          </Button>
        )}
        <Button
          onClick={onConfirm}
          variant="contained"
          sx={{
            backgroundColor: '#008C9E',
            px: 4,
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 'bold',
            '&:hover': { backgroundColor: '#007A8A' }
          }}
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalGeneric;
