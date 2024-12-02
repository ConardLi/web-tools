'use client'

import { Paper, Typography, styled } from '@mui/material'
import SvgIcon from './SvgIcon'

const Card = styled(Paper)(({ theme }) => ({
  width: '100%',
  aspectRatio: '1',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(1),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(1),
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  color: 'white',

  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    transform: 'translateY(-2px)',
  },
}))

interface ToolCardProps {
  name: string
  icon: string
  onClick?: () => void
}

export default function ToolCard({ name, icon, onClick }: ToolCardProps) {
  return (
    <Card onClick={onClick}>
      <SvgIcon icon={icon} size={32} />
      <Typography
        variant="body2"
        sx={{
          textAlign: 'center',
          fontSize: '0.8rem',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
        }}
      >
        {name}
      </Typography>
    </Card>
  )
}
