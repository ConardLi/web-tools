'use client'

import { Grid } from '@mui/material'
import ToolCard from './ToolCard'
import type { Tool } from '@/types/tool'

interface ToolGridProps {
  tools: Tool[];
  favoriteIds?: Set<string>;
  onToggleFavorite?: (toolId: string) => Promise<void>;
}

export default function ToolGrid({ 
  tools, 
  favoriteIds = new Set(),
  onToggleFavorite 
}: ToolGridProps) {
  return (
    <Grid container spacing={3}>
      {tools.map((tool) => (
        <Grid item xs={12} sm={6} md={4} key={tool.id}>
          <ToolCard
            tool={tool}
            isFavorited={favoriteIds.has(tool.id)}
            onToggleFavorite={
              onToggleFavorite 
                ? () => onToggleFavorite(tool.id)
                : undefined
            }
          />
        </Grid>
      ))}
    </Grid>
  )
}
