import React from 'react';
import { styled } from '@mui/material/styles';
import { Card, CardContent, Typography, IconButton, Chip, Box } from '@mui/material';
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
  alignItems: 'flex-start',
});

const TagContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(0.5),
  marginTop: theme.spacing(1),
}));

interface ItemCardProps {
  id: string;
  name: string;
  description: string;
  icon: string;
  tags: string[];
  isFavorite: boolean;
  onFavoriteToggle: () => void;
  onClick: () => void;
}

const ItemCard: React.FC<ItemCardProps> = ({
  name,
  description,
  icon,
  tags,
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
      <CardContent>
        <CardHeader>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {Icon && <Icon />}
            <Typography variant="h6" component="h2">
              {name}
            </Typography>
          </Box>
          <IconButton
            onClick={handleFavoriteClick}
            color={isFavorite ? 'primary' : 'default'}
            size="small"
          >
            {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
        </CardHeader>

        <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
          {description}
        </Typography>
        <TagContainer>
          {tags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              variant="outlined"
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                },
              }}
            />
          ))}
        </TagContainer>
      </CardContent>
    </StyledCard>
  );
};

export default ItemCard;
