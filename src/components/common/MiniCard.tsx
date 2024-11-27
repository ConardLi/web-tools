import React from 'react';
import { styled } from '@mui/material/styles';
import { Card, CardContent, Typography, IconButton, Box } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import * as MuiIcons from '@mui/icons-material';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-4px)',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
}));

const CardHeader = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

interface MiniCardProps {
  id: string;
  name: string;
  icon: string;
  isFavorite: boolean;
  onFavoriteToggle: () => void;
  onClick: () => void;
}

const MiniCard: React.FC<MiniCardProps> = ({
  name,
  icon,
  isFavorite,
  onFavoriteToggle,
  onClick,
}) => {
  const Icon = (MuiIcons as any)[icon];

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFavoriteToggle();
  };

  return (
    <StyledCard onClick={onClick}>
      <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
        <CardHeader>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {Icon && <Icon fontSize="small" />}
            <Typography variant="body1" component="h2" noWrap>
              {name}
            </Typography>
          </Box>
          <IconButton
            onClick={handleFavoriteClick}
            color={isFavorite ? 'primary' : 'default'}
            size="small"
            sx={{ ml: 1 }}
          >
            {isFavorite ? (
              <FavoriteIcon fontSize="small" />
            ) : (
              <FavoriteBorderIcon fontSize="small" />
            )}
          </IconButton>
        </CardHeader>
      </CardContent>
    </StyledCard>
  );
};

export default MiniCard;
