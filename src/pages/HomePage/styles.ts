import { styled } from '@mui/material/styles';
import { Chip } from '@mui/material';
import { motion } from 'framer-motion';

export const StyledCard = styled(motion.div)(({ theme }) => ({
  cursor: 'pointer',
  transition: 'transform 0.2s, box-shadow 0.2s',
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius * 1.5,
  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
  },
}));

export const StyledChip = styled(Chip)<{ selected?: boolean }>(({ theme, selected }) => ({
  borderRadius: 8,
  backgroundColor: selected ? theme.palette.primary.main : theme.palette.background.paper,
  color: selected ? theme.palette.primary.contrastText : theme.palette.text.primary,
  '&:hover': {
    backgroundColor: selected ? theme.palette.primary.dark : theme.palette.action.hover,
  },
})); 