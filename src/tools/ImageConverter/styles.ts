import { styled } from '@mui/material/styles';
import { Box, Paper } from '@mui/material';

export const ConverterContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
}));

export const DropZoneContainer = styled(Box)(({ theme }) => ({
  border: `2px dashed ${theme.palette.primary.main}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(4),
  textAlign: 'center',
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
})); 