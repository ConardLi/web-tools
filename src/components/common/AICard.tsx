import React from 'react';
import { styled } from '@mui/material/styles';
import { Card, CardContent, Typography, IconButton, Tooltip } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { AIWebsite } from '../../types/ai';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  '&:hover': {
    transform: 'translateY(-4px)',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  padding: '10px 12px 4px !important',
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  position: 'relative',
  '&:last-child': {
    paddingBottom: '4px !important',
  },
}));

const IconContainer = styled('div')({
  width: 48,
  height: 48,
  flexShrink: 0,
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '24px',
  },
});

const ContentContainer = styled('div')({
  flex: 1,
  minWidth: 0, // 确保文本可以正确截断
});

const StyledTitle = styled(Typography)({
  color: 'rgba(255, 255, 255, 0.9)',
  fontWeight: 500,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

const StyledDescription = styled(Typography)({
  color: 'rgba(255, 255, 255, 0.7)',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  fontSize: '0.875rem',
  lineHeight: 1.3,
});

const FavoriteButton = styled(IconButton)({
  position: 'absolute',
  top: 8,
  right: 8,
  padding: 4,
});

const TooltipContent = styled('div')({
  maxWidth: 300,
  '& .title': {
    fontWeight: 500,
    marginBottom: 8,
    color: 'rgba(255, 255, 255, 0.95)',
  },
  '& .description': {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: '0.875rem',
    lineHeight: 1.5,
  },
});

interface AICardProps {
  website: AIWebsite;
  isFavorite: boolean;
  onFavoriteToggle: () => void;
  onClick: () => void;
  style?: React.CSSProperties;
}

const AICard: React.FC<AICardProps> = ({
  website,
  isFavorite,
  onFavoriteToggle,
  onClick,
  style,
}) => {
  const [isImageLoaded, setIsImageLoaded] = React.useState(false);
  const imageRef = React.useRef<HTMLImageElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && imageRef.current) {
            imageRef.current.src = `/ai/${website.icon}`;
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '50px',
      }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, [website.icon]);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFavoriteToggle();
  };

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  const tooltipContent = (
    <TooltipContent>
      <div className="title">{website.title}</div>
      <div className="description">{website.description}</div>
    </TooltipContent>
  );

  const cardContent = (
    <StyledCardContent>
      <IconContainer>
        <img
          ref={imageRef}
          alt={website.title}
          style={{ opacity: isImageLoaded ? 1 : 0, transition: 'opacity 0.3s' }}
          onLoad={handleImageLoad}
        />
      </IconContainer>
      <ContentContainer>
        <StyledTitle variant="subtitle1">
          {website.title}
        </StyledTitle>
        <StyledDescription>
          {website.description}
        </StyledDescription>
      </ContentContainer>
      <FavoriteButton
        onClick={handleFavoriteClick}
        sx={{
          color: isFavorite ? '#ffa39e' : 'rgba(255, 255, 255, 0.5)',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            color: isFavorite ? '#ffccc7' : 'rgba(255, 255, 255, 0.7)',
          },
        }}
      >
        {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </FavoriteButton>
    </StyledCardContent>
  );

  return (
    <Tooltip
      title={tooltipContent}
      placement="top"
      arrow
      PopperProps={{
        modifiers: [{
          name: 'offset',
          options: {
            offset: [0, -8],
          },
        }],
      }}
    >
      <div style={style}>
        <StyledCard onClick={onClick}>
          {cardContent}
        </StyledCard>
      </div>
    </Tooltip>
  );
};

export default AICard;
