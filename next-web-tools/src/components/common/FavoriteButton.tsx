'use client'

import { useState } from 'react'
import { IconButton, Tooltip } from '@mui/material'
import { Favorite, FavoriteBorder } from '@mui/icons-material'

interface FavoriteButtonProps {
  isFavorited: boolean;
  onToggle: () => Promise<void>;
  size?: 'small' | 'medium' | 'large';
}

export default function FavoriteButton({ 
  isFavorited, 
  onToggle, 
  size = 'medium' 
}: FavoriteButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = async () => {
    if (isLoading) return
    setIsLoading(true)
    try {
      await onToggle()
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Tooltip title={isFavorited ? "取消收藏" : "收藏"}>
      <IconButton
        onClick={handleClick}
        disabled={isLoading}
        size={size}
        color="primary"
      >
        {isFavorited ? <Favorite /> : <FavoriteBorder />}
      </IconButton>
    </Tooltip>
  )
}
