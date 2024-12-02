'use client'

import { Card, CardContent, CardActions, Typography, Chip } from '@mui/material'
import Link from 'next/link'
import FavoriteButton from '../common/FavoriteButton'
import type { Tool } from '@/types/tool'

interface ToolCardProps {
  tool: Tool;
  isFavorited?: boolean;
  onToggleFavorite?: () => Promise<void>;
}

export default function ToolCard({ 
  tool, 
  isFavorited = false,
  onToggleFavorite 
}: ToolCardProps) {
  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
      <CardContent className="flex-1">
        <div className="flex items-center mb-3">
          <img 
            src={tool.icon} 
            alt={tool.name}
            className="w-8 h-8 mr-3"
          />
          <Typography variant="h6" component="h3">
            {tool.name}
          </Typography>
        </div>
        
        <Typography variant="body2" color="text.secondary" className="mb-3">
          {tool.description}
        </Typography>

        <div className="flex flex-wrap gap-1">
          {tool.tags?.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              variant="outlined"
            />
          ))}
        </div>
      </CardContent>

      <CardActions className="justify-between">
        <Link 
          href={`/workspace/tools/${tool.id}`}
          className="text-primary hover:underline"
        >
          使用工具
        </Link>
        {onToggleFavorite && (
          <FavoriteButton
            isFavorited={isFavorited}
            onToggle={onToggleFavorite}
            size="small"
          />
        )}
      </CardActions>
    </Card>
  )
}
