import React from 'react';
import { styled } from '@mui/material/styles';
import { 
  Card,
  CardActionArea,
  Typography,
  Box,
  Tooltip,
} from '@mui/material';
import { AIWebsite } from '../../types/ai';

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  transition: 'all 0.2s ease',
  cursor: 'pointer',
  borderRadius: theme.shape.borderRadius * 1.5,

  '&:hover': {
    transform: 'translateY(-4px)',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
}));

const StyledCardActionArea = styled(CardActionArea)(({ theme }) => ({
  padding: theme.spacing(1.2),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(0.5),
}));

const IconContainer = styled(Box)({
  width: '1.8rem',
  height: '1.8rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '6px'
  }
});

const WebsiteName = styled(Typography)({
  color: 'white',
  fontSize: '0.75rem',
  fontWeight: 400,
  textAlign: 'center',
  lineHeight: 1.2,
  opacity: 0.9,
  width: '100%',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

interface SimpleAICardProps {
  website: AIWebsite;
  onClick: () => void;
}

const SimpleAICard: React.FC<SimpleAICardProps> = React.memo(({
  website,
  onClick,
}) => {
  const iconPath = `/ai/${website.icon}`;
  
  return (
    <Tooltip title={website.description} arrow placement="top">
      <StyledCard onClick={onClick}>
        <StyledCardActionArea>
          <IconContainer>
            <img src={iconPath} alt={website.title} />
          </IconContainer>
          <WebsiteName>
            {website.title}
          </WebsiteName>
        </StyledCardActionArea>
      </StyledCard>
    </Tooltip>
  );
});

SimpleAICard.displayName = 'SimpleAICard';

export default SimpleAICard;
