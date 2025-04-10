import { 
  Box, 
  Divider, 
  Drawer, 
  IconButton, 
  Stack,
  Typography,
} from '@mui/material';
import BasicButton from './BasicButton';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';

export interface IBasicDrawer {
  open: boolean;
  onClose: () => void;
  title: string;
  width?: number;
  children: React.ReactNode;
  onFilter: () => void;
}

const BasicDrawer: React.FC<IBasicDrawer> = ({
  open,
  onClose,
  title,
  width = 400,
  children,
  onFilter,
}) => {
  return (
    <Drawer
      PaperProps={{
        sx: {
          width: width,
          p: 0,
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        },
      }}
      anchor="right"
      onClose={onClose}
      open={open}
    >
      <Box sx={{ 
        p: 2, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
      }}>
        <Typography variant="h6">{title}</Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      <Box sx={{ p: 2, flexGrow: 1, overflowY: 'auto' }}>
        {children}
      </Box>
      <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider' }}>
        <Stack direction="row" justifyContent="flex-end" spacing={2}>
          <BasicButton 
            color="secondary" 
            onClick={onClose} 
            text="Cancelar"
            variant="text"
          />
          <BasicButton 
            color="primary" 
            onClick={onFilter} 
            text="Filtrar"
            variant="text"
          />
        </Stack>
      </Box>
    </Drawer>
  );
};

export default BasicDrawer;
